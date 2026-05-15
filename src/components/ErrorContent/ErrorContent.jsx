"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ErrorContent({ azulAcema = "#1a365d", verdeAcema = "#76bc43" }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[85vh] px-2">
      
      {/* CONTENEDOR DE LA ILUSTRACIÓN: Ahora mucho más agresivo en tamaño */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative w-full max-w-[1400px]" 
      >
        <svg 
          viewBox="50 0 500 300"  /* Ajustado para eliminar aire a los lados */
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto drop-shadow-2xl"
        >
          {/* SOL */}
          <circle cx="300" cy="70" r="65" fill="#FFD25A" />
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="293" y="0" width="14" height="40" fill="#FFD25A" rx="7" transform={`rotate(${i * 30} 300 70)`} />
          ))}

          {/* NUBE */}
          <motion.g animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <path d="M200 130 Q200 90 240 90 Q260 50 310 50 Q360 50 380 90 Q430 90 430 130 Z" fill="white" />
          </motion.g>

          {/* PANEL SOLAR - TAMAÑO MAXIMIZADO */}
          <g>
            <rect x="285" y="240" width="30" height="40" fill="#2D5A8C" rx="2" />
            <ellipse cx="300" cy="290" rx="100" ry="12" fill={azulAcema} opacity="0.8" />
            <rect x="200" y="295" width="200" height="8" fill={verdeAcema} rx="4" />
            
            <path d="M60 120 L540 120 L590 270 L10 270 Z" fill="#1e3a8a" />
            <g stroke="#60A5FA" strokeWidth="2" opacity="0.5">
              <line x1="50" y1="170" x2="550" y2="170" />
              <line x1="35" y1="220" x2="565" y2="220" />
              <line x1="180" y1="120" x2="140" y2="270" />
              <line x1="300" y1="120" x2="300" y2="270" />
              <line x1="420" y1="120" x2="460" y2="270" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* 404 TITÁNICO: Ajustado para pantallas de laptop */}
      <div className="relative text-center -mt-20 md:-mt-32">
        <h1
          className="text-[25vw] md:text-[22rem] lg:text-[28rem] font-black leading-none tracking-tighter"
          style={{ color: azulAcema }}
        >
          404
        </h1>
        
        <div className="absolute inset-0 pointer-events-none -z-10 select-none">
          <div className="absolute inset-0 text-[25vw] md:text-[22rem] lg:text-[28rem] font-black leading-none tracking-tighter opacity-25"
               style={{ color: "#ff00ff", transform: "translate(12px, 8px)" }}>404</div>
          <div className="absolute inset-0 text-[25vw] md:text-[22rem] lg:text-[28rem] font-black leading-none tracking-tighter opacity-25"
               style={{ color: "#00ffff", transform: "translate(-12px, -8px)" }}>404</div>
        </div>
      </div>
    </div>
  );
}