/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    unoptimized: true,
    // soportar calidades usadas en el proyecto: 70, 75, 80, 90
    qualities: [70, 75, 80, 90],
  },
};

export default nextConfig;