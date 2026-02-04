'use client';

import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface FlechadaHandle {
  shoot: (start: DOMRect, end: DOMRect) => void;
}

interface Arrow {
  id: number;
  start: { x: number; y: number };
  end: { x: number; y: number };
  angle: number;
  distance: number;
}

const FlechadaLayer = forwardRef<FlechadaHandle>((props, ref) => {
  const [arrows, setArrows] = useState<Arrow[]>([]);

  useImperativeHandle(ref, () => ({
    shoot: (start: DOMRect, end: DOMRect) => {
      const id = Date.now();
      
      // Calculate center points
      const startX = start.left + start.width / 2;
      const startY = start.top + start.height / 2;
      const endX = end.left + end.width / 2;
      const endY = end.top + end.height / 2;

      // Calculate angle
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const newArrow: Arrow = {
        id,
        start: { x: startX, y: startY },
        end: { x: endX, y: endY },
        angle,
        distance
      };

      setArrows((prev) => [...prev, newArrow]);

      // Remove arrow after animation
      setTimeout(() => {
        setArrows((prev) => prev.filter((a) => a.id !== id));
      }, 1000); // Animation duration + buffer
    },
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {arrows.map((arrow) => (
          <motion.div
            key={arrow.id}
            initial={{ 
              left: arrow.start.x, 
              top: arrow.start.y, 
              opacity: 0,
              scale: 0.5,
              rotate: arrow.angle 
            }}
            animate={{ 
              left: arrow.end.x, 
              top: arrow.end.y, 
              opacity: [0, 1, 1, 0], // Fade in, stay, fade out
              scale: 1,
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1]
            }}
            style={{
              position: 'absolute',
              transformOrigin: 'center center',
              marginLeft: '-12px', // Center the icon (assuming 24px size)
              marginTop: '-12px'
            }}
          >
            <div className="relative">
                {/* Alienzinho Cupid */}
                <div className="absolute -top-6 -left-6 w-12 h-12 animate-pulse">
                     <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,100,0.6)]">
                        {/* Head */}
                        <path d="M50 20 C30 20 15 35 15 55 C15 85 50 95 50 95 C50 95 85 85 85 55 C85 35 70 20 50 20 Z" fill="#00FF88" />
                        {/* Eyes */}
                        <ellipse cx="35" cy="50" rx="8" ry="12" fill="black" transform="rotate(15 35 50)" />
                        <ellipse cx="65" cy="50" rx="8" ry="12" fill="black" transform="rotate(-15 65 50)" />
                        <circle cx="37" cy="46" r="3" fill="white" />
                        <circle cx="63" cy="46" r="3" fill="white" />
                        {/* Antenna */}
                        <path d="M50 20 L50 5" stroke="#00FF88" strokeWidth="3" />
                        <circle cx="50" cy="5" r="4" fill="#00FF88" />
                        {/* Smile */}
                        <path d="M40 70 Q50 75 60 70" stroke="black" strokeWidth="2" fill="none" />
                     </svg>
                </div>
                
                {/* Arrow */}
                <div className="text-primary-blue drop-shadow-[0_0_10px_rgba(0,85,255,0.5)] filter ml-2 mt-2">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-45deg)' }}>
                        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

FlechadaLayer.displayName = 'FlechadaLayer';

export default FlechadaLayer;
