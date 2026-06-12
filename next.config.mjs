/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export', // <--- ESTO ES LO QUE FALTA
  
  // Opcional: Si tu sitio tiene problemas con rutas o imágenes, 
  // a veces es necesario deshabilitar la optimización de imágenes:
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;