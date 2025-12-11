import React from 'react';
import { motion } from 'framer-motion';
export function Navbar() {
  return <motion.nav initial={{
    y: -100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.6,
    ease: 'easeOut'
  }} className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-5 backdrop-blur-2xl bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <motion.div whileHover={{
        scale: 1.02
      }} className="flex items-center gap-2 h-full">
          <img 
            src="/lightbulb_logo.png" 
            alt="Postulate Logo" 
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 object-contain"
          />
          <span className="text-base sm:text-lg md:text-xl font-bold text-gradient-animated tracking-tight flex items-center" style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: '1' }}>
            postulate.ai
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10 h-full">
          <motion.a 
            href="#how-it-works" 
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('how-it-works');
              if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition + 400;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
            whileHover={{
              y: -2
            }} 
            className="text-gray-400 hover:text-white transition-colors duration-300 font-normal text-sm flex items-center" style={{ lineHeight: '1' }}
          >
            How it Works
          </motion.a>
          <motion.a 
            href="#contact-us" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{
              y: -2
            }} 
            className="text-gray-400 hover:text-white transition-colors duration-300 font-normal text-sm flex items-center" style={{ lineHeight: '1' }}
          >
            Contact Us
          </motion.a>
        </div>
      </div>
    </motion.nav>;
}