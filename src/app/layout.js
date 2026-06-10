// src/app/layout.js
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton/WhatsAppButton';
import "./globals.css";
 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["200"],
});
 
export const metadata = {
  title: "ACEMA INGENIERIA S.A.S.",
  description: "Expertos en ingeniería y soluciones solares",
};
 
export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Preload probable LCP hero images (desktop/mobile) */}
        <link rel="preload" as="image" href="/images/hero/img1-hero.webp" media="(min-width: 1025px)" />
        <link rel="preload" as="image" href="/images/hero/movile-img1.webp" media="(max-width: 1024px)" />
        {/* Critical inline CSS for hero to reduce render-blocking */}
        <style>{`
          .hero{position:relative;width:100%;height:calc(100vh - 80px);min-height:70vh;overflow:hidden;background-color:#000}
          .heroSlider,.imageWrapper{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;z-index:1}
          .heroOverlay{position:absolute;inset:0;background:rgba(0,0,0,0.3);z-index:2;pointer-events:none}
          .heroImage{object-fit:cover;object-position:center}
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} appBody`}>
        <Navbar />
        <div className="universal-layout-container">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}