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