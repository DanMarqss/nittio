'use client';

import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FlechadaHandle {
  shoot: (start: DOMRect, end: DOMRect) => void;
}

interface FlechadaInstance {
  id: number;
  target: { x: number; y: number };
}

const Spaceship = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,255,100,0.8)]">
    {/* Glow/Beam effect under */}
    <ellipse cx="100" cy="100" rx="60" ry="10" fill="rgba(0,255,255,0.2)" className="animate-pulse" />
    
    {/* Legs */}
    <path d="M40 80 L30 100" stroke="#444" strokeWidth="4" />
    <path d="M160 80 L170 100" stroke="#444" strokeWidth="4" />
    <path d="M100 85 L100 105" stroke="#444" strokeWidth="4" />

    {/* Dome/Cockpit */}
    <path d="M60 50 C60 20 140 20 140 50" fill="rgba(200, 240, 255, 0.4)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
    
    {/* Alien inside */}
    <g transform="translate(85, 25) scale(0.3)">
       <path d="M50 20 C30 20 15 35 15 55 C15 85 50 95 50 95 C50 95 85 85 85 55 C85 35 70 20 50 20 Z" fill="#00FF88" />
       <ellipse cx="35" cy="50" rx="8" ry="12" fill="black" transform="rotate(15 35 50)" />
       <ellipse cx="65" cy="50" rx="8" ry="12" fill="black" transform="rotate(-15 65 50)" />
       <circle cx="37" cy="46" r="3" fill="white" />
       <circle cx="63" cy="46" r="3" fill="white" />
       <path d="M50 20 L50 5" stroke="#00FF88" strokeWidth="3" />
       <circle cx="50" cy="5" r="4" fill="#00FF88" />
       <path d="M40 70 Q50 75 60 70" stroke="black" strokeWidth="2" fill="none" />
    </g>

    {/* Body */}
    <ellipse cx="100" cy="60" rx="80" ry="25" fill="#333" stroke="#00FF88" strokeWidth="2" />
    <path d="M20 60 Q100 90 180 60" fill="none" stroke="#00FF88" strokeWidth="1" opacity="0.5" />
    
    {/* Lights */}
    <circle cx="40" cy="60" r="4" fill="#ff00ff" className="animate-ping" style={{ animationDuration: '2s' }} />
    <circle cx="80" cy="75" r="4" fill="#00ffff" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
    <circle cx="120" cy="75" r="4" fill="#ff00ff" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
    <circle cx="160" cy="60" r="4" fill="#00ffff" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '1.5s' }} />
  </svg>
);

const FlechadaSequence = ({ data, onComplete }: { data: FlechadaInstance; onComplete: () => void }) => {
  const [step, setStep] = useState<'enter' | 'shoot' | 'exit'>('enter');
  
  // Viewport center
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  // Calculate angle to target for rotation
  const deltaX = data.target.x - centerX;
  const deltaY = data.target.y - centerY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  useEffect(() => {
    // Sequence timing
    const shootTimer = setTimeout(() => setStep('shoot'), 1000); // Wait for enter
    const exitTimer = setTimeout(() => setStep('exit'), 2000);   // After shot
    const cleanupTimer = setTimeout(onComplete, 3000);           // Cleanup

    return () => {
      clearTimeout(shootTimer);
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
    };
  }, [onComplete]);

  return (
    <>
      {/* Overlay to dim background and focus attention */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
      />

      {/* Spaceship Container */}
      <motion.div
        className="fixed z-50 w-64 h-40"
        style={{ 
          left: centerX - 128, // Center the 256px width
          top: centerY - 80,   // Center the 160px height
        }}
        initial={{ scale: 0, y: -500, rotate: -45 }}
        animate={{ 
          scale: step === 'exit' ? 0 : 1, 
          y: step === 'exit' ? -500 : 0,
          rotate: step === 'enter' ? [0, -10, 10, 0] : 0 // Wobble on enter
        }}
        transition={{ 
          type: "spring", 
          damping: 12, 
          stiffness: 100,
          rotate: { duration: 0.5 } 
        }}
      >
        <div className="w-full h-full relative">
           <Spaceship />
           
           {/* The Arrow Shot */}
           {step !== 'enter' && (
             <motion.div
               className="absolute top-1/2 left-1/2 w-8 h-8 text-primary-blue"
               initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
               animate={{ 
                 x: deltaX, 
                 y: deltaY, 
                 scale: 2,
                 opacity: [1, 1, 0] 
               }}
               transition={{ duration: 0.6, ease: "backIn" }}
               style={{ 
                 marginLeft: -16, 
                 marginTop: -16,
                 rotate: angle + 45 // Adjust for arrow icon orientation
               }}
             >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_#0055FF]">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" fillOpacity="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </motion.div>
           )}
        </div>
      </motion.div>

      {/* Target Impact Effect */}
      {step === 'exit' && (
        <motion.div
          className="fixed z-50 w-20 h-20 rounded-full border-4 border-primary-blue"
          style={{ 
            left: data.target.x - 40, 
            top: data.target.y - 40 
          }}
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  );
};

const FlechadaLayer = forwardRef<FlechadaHandle>((props, ref) => {
  const [flechadas, setFlechadas] = useState<FlechadaInstance[]>([]);

  useImperativeHandle(ref, () => ({
    shoot: (start: DOMRect, end: DOMRect) => {
      const id = Date.now();
      const targetX = end.left + end.width / 2;
      const targetY = end.top + end.height / 2;

      setFlechadas((prev) => [...prev, { id, target: { x: targetX, y: targetY } }]);
    },
  }));

  const removeFlechada = (id: number) => {
    setFlechadas((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {flechadas.map((flechada) => (
          <FlechadaSequence 
            key={flechada.id} 
            data={flechada} 
            onComplete={() => removeFlechada(flechada.id)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

FlechadaLayer.displayName = 'FlechadaLayer';

export default FlechadaLayer;
