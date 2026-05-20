// app/services/page.js
import { redirect } from 'next/navigation';

export default function ServicesPage() {
  // Redirecciona automáticamente a la ruta dinámica oficial
  redirect('/services/construccion-granjas');
}