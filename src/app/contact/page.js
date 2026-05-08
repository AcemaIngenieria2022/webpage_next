export const metadata = {
  title: 'Contacto - ACEMA Ingeniería',
  description: 'Contáctanos para cotizaciones, asesorías y consultas técnicas.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Contacto</h1>
        <p className="text-lg leading-8 mb-8">
          Estamos listos para apoyarte en tu próximo proyecto de energía renovable. Envíanos tu consulta y responderemos a la brevedad.
        </p>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="mb-4"><strong>Teléfono:</strong> +57 300 123 4567</p>
          <p className="mb-4"><strong>Email:</strong> contacto@acemaingenieria.com</p>
          <p><strong>Dirección:</strong> Calle 123, Bogotá, Colombia</p>
        </div>
      </section>
    </main>
  );
}
