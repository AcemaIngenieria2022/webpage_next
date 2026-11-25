-- Migración: radicado único compartido entre la página web y el chatbot.
-- Formato: ACEMA-AAAA-NNNNN (año en hora de Colombia, consecutivo que reinicia cada 1 de enero).
--
-- Crea:
--   * radicado_contador ............ una fila por año con el último número entregado.
--   * solicitudes .................. registro común (web y bot) para consultar número, tipo y estado.
--   * radicar_solicitud(...) ....... toma el siguiente número y crea la fila en solicitudes en un solo paso.
--   * rol bot_radicados ............ rol sin login con permisos mínimos para el chatbot.
--
-- Ejecutar una sola vez ANTES de desplegar la web:
--   node --env-file=.env scripts/run-migration.js scripts/migrate-radicado-unico.sql
-- Es idempotente: se puede volver a correr sin dañar datos.
--
-- La contraseña del bot NO va en este archivo. Después de correr la migración, en el SQL Editor de Neon:
--   ALTER ROLE bot_radicados WITH LOGIN PASSWORD '<clave larga generada>';

-- 1. Contador por año -------------------------------------------------------
CREATE TABLE IF NOT EXISTS radicado_contador (
  anio   INT PRIMARY KEY,
  ultimo INT NOT NULL DEFAULT 0 CHECK (ultimo >= 0)
);

-- 2. Registro común de solicitudes -------------------------------------------
-- Neon es la fuente de verdad del número, tipo, canal y estado.
-- El detalle de cada formulario web sigue en pqrs_leads; la conversación del bot sigue en su base local.
CREATE TABLE IF NOT EXISTS solicitudes (
  id             SERIAL PRIMARY KEY,
  radicado       VARCHAR(20)  NOT NULL UNIQUE,
  canal          VARCHAR(10)  NOT NULL CHECK (canal IN ('web', 'bot')),
  tipo           VARCHAR(50)  NOT NULL,            -- PQRS, Acoso laboral, Acoso sexual, Requerimiento legal, ...
  subtipo        VARCHAR(50),                      -- Petición, Queja, Reclamo, Sugerencia, ...
  estado         VARCHAR(30)  NOT NULL DEFAULT 'nuevo',   -- nuevo, en_gestion, respondido, cerrado
  prioridad      VARCHAR(20)  NOT NULL DEFAULT 'normal',  -- normal, alta
  nombre         VARCHAR(150),
  documento      VARCHAR(50),
  email          VARCHAR(150),
  telefono       VARCHAR(30),
  ref_externa    VARCHAR(100),                     -- id local del bot (para reintentos sin duplicar)
  creado_en      TIMESTAMPTZ  NOT NULL DEFAULT now(),
  actualizado_en TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_solicitudes_canal_ref ON solicitudes (canal, ref_externa) WHERE ref_externa IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_solicitudes_documento ON solicitudes (documento);
CREATE INDEX IF NOT EXISTS idx_solicitudes_email     ON solicitudes (lower(email));
CREATE INDEX IF NOT EXISTS idx_solicitudes_creado_en ON solicitudes (creado_en);

CREATE OR REPLACE FUNCTION solicitudes_touch() RETURNS trigger AS $$
BEGIN
  NEW.actualizado_en := now();
  RETURN NEW;
END $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_solicitudes_touch ON solicitudes;
CREATE TRIGGER trg_solicitudes_touch BEFORE UPDATE ON solicitudes
  FOR EACH ROW EXECUTE FUNCTION solicitudes_touch();

-- 3. Función única para radicar ----------------------------------------------
-- Toma el siguiente número del año y crea la fila en solicitudes en la misma transacción:
--   * Dos llamadas simultáneas (web y bot) nunca reciben el mismo número: la fila del año queda bloqueada.
--   * Si algo falla, el contador también se revierte, así que no quedan huecos.
--   * Si se llama otra vez con el mismo (canal, ref_externa), devuelve el radicado ya asignado
--     en lugar de crear otro. Esto permite que el bot reintente sin duplicar.
CREATE OR REPLACE FUNCTION radicar_solicitud(
  p_canal       TEXT,
  p_tipo        TEXT,
  p_subtipo     TEXT DEFAULT NULL,
  p_nombre      TEXT DEFAULT NULL,
  p_documento   TEXT DEFAULT NULL,
  p_email       TEXT DEFAULT NULL,
  p_telefono    TEXT DEFAULT NULL,
  p_ref_externa TEXT DEFAULT NULL,
  p_prioridad   TEXT DEFAULT 'normal'
) RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_anio     INT := EXTRACT(YEAR FROM (now() AT TIME ZONE 'America/Bogota'))::INT;
  v_num      INT;
  v_radicado TEXT;
BEGIN
  IF p_tipo IS NULL OR btrim(p_tipo) = '' THEN
    RAISE EXCEPTION 'radicar_solicitud: el tipo es obligatorio';
  END IF;

  IF p_ref_externa IS NOT NULL THEN
    SELECT radicado INTO v_radicado FROM solicitudes WHERE canal = p_canal AND ref_externa = p_ref_externa;
    IF FOUND THEN
      RETURN v_radicado;
    END IF;
  END IF;

  BEGIN
    INSERT INTO radicado_contador AS c (anio, ultimo) VALUES (v_anio, 1)
    ON CONFLICT (anio) DO UPDATE SET ultimo = c.ultimo + 1
    RETURNING ultimo INTO v_num;

    v_radicado := 'ACEMA-' || v_anio || '-' || lpad(v_num::TEXT, 5, '0');

    INSERT INTO solicitudes (radicado, canal, tipo, subtipo, prioridad, nombre, documento, email, telefono, ref_externa)
    VALUES (v_radicado, p_canal, btrim(p_tipo), NULLIF(btrim(p_subtipo), ''), COALESCE(NULLIF(btrim(p_prioridad), ''), 'normal'),
            NULLIF(btrim(p_nombre), ''), NULLIF(btrim(p_documento), ''), NULLIF(lower(btrim(p_email)), ''),
            NULLIF(btrim(p_telefono), ''), p_ref_externa);
  EXCEPTION WHEN unique_violation THEN
    -- Otro reintento con el mismo ref_externa ganó la carrera: devolver su número.
    IF p_ref_externa IS NULL THEN
      RAISE;
    END IF;
    SELECT radicado INTO v_radicado FROM solicitudes WHERE canal = p_canal AND ref_externa = p_ref_externa;
    IF NOT FOUND THEN
      RAISE;
    END IF;
  END;

  RETURN v_radicado;
END $$;

REVOKE ALL ON FUNCTION radicar_solicitud(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;

-- 4. Rol del chatbot con permisos mínimos --------------------------------------
-- Puede: radicar (solo con la función), leer solicitudes y cambiar estado/prioridad.
-- No puede: tocar el contador, insertar o borrar filas a mano, ni leer pqrs_leads, etica_leads o contact_leads.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'bot_radicados') THEN
    CREATE ROLE bot_radicados NOLOGIN;
  END IF;
END $$;

GRANT USAGE ON SCHEMA public TO bot_radicados;
GRANT EXECUTE ON FUNCTION radicar_solicitud(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO bot_radicados;
GRANT SELECT ON solicitudes TO bot_radicados;
GRANT UPDATE (estado, prioridad) ON solicitudes TO bot_radicados;
REVOKE ALL ON radicado_contador FROM bot_radicados;
