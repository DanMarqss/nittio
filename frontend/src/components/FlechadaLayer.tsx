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
            <div className="text-pink-600 drop-shadow-lg filter">
               {/* Custom SVG Arrow or Icon */}
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

FlechadaLayer.displayName = 'FlechadaLayer';

export default FlechadaLayer;
