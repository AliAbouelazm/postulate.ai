import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollLightbulb() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center center"] // Starts reacting earlier but finishes exactly at center
  });

  // 100% grayscale (gray) -> 0% grayscale (gold)
  const filterVal = useTransform(scrollYProgress, [0, 1], ["grayscale(100%) brightness(0.7)", "grayscale(0%) brightness(1.2)"]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3]);
  const glowOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 0.8]);

  return (
    <div ref={ref} className="flex justify-center items-center py-32 sm:py-48 relative z-20">
      <motion.div 
        className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center"
        style={{ scale, opacity }}
      >
        {/* Ambient Glow Background */}
        <motion.div 
          className="absolute inset-0 bg-amber-500 rounded-full blur-[80px]"
          style={{ opacity: glowOpacity }}
        />

        {/* The Image */}
        <motion.img 
          src="/lightbulb_logo.png" 
          alt="Postulate Idea" 
          className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
          style={{ 
            filter: filterVal
          }}
        />
      </motion.div>
    </div>
  );
}
