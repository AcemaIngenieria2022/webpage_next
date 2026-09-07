// src/app/layout.js
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import Script from "next/script";
import '@/lib/reportScheduler';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton/WhatsAppButton';
import PqrsRibbon from '@/components/shared/PqrsRibbon/PqrsRibbon';
import LineaEticaRibbon from '@/components/shared/LineaEticaRibbon/LineaEticaRibbon';
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
  weight: ["400", "500", "600", "700"],
});
 
export const metadata = {
  title: "ACEMA INGENIERIA S.A.S.",
  description: "Expertos en ingeniería y soluciones solares",
};

const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-P858NRJ9";
 
export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId}');`,
        }}
      />
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} appBody`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Navbar />
        <div className="universal-layout-container">
          {children}
        </div>
        <Footer />
        <PqrsRibbon />
        <LineaEticaRibbon />
        <WhatsAppButton />
      </body>
    </html>
  );
}