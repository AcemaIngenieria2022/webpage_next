-- Script para crear las tablas en Neon (PostgreSQL)
-- Base de datos: neondb
-- Ejecutar en: Consola SQL de Neon (Neon SQL Editor)

-- Tabla para formularios de contacto
CREATE TABLE IF NOT EXISTS contact_leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(150) NOT NULL,
  company VARCHAR(150),
  request_type VARCHAR(100) NOT NULL,
  message TEXT,
  attachment_filename VARCHAR(255),
  attachment_data BYTEA,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_leads (email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_leads (created_at);

-- Tabla para PQRS (Peticiones, Quejas, Reclamos, Sugerencias)
CREATE TABLE IF NOT EXISTS pqrs_leads (
  id SERIAL PRIMARY KEY,
  radicado VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  id_number VARCHAR(50) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  request_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'RADICAR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pqrs_radicado ON pqrs_leads (radicado);
CREATE INDEX IF NOT EXISTS idx_pqrs_email ON pqrs_leads (email);
CREATE INDEX IF NOT EXISTS idx_pqrs_created_at ON pqrs_leads (created_at);
CREATE INDEX IF NOT EXISTS idx_pqrs_status ON pqrs_leads (status);
