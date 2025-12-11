import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WaitlistModal } from './WaitlistModal';

export function Hero() {
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  // Generate floating particles
  const particles = Array.from({
    length: 15
  }, (_, i) => ({
    id: i,
    delay: i * 0.4,
    duration: 5 + Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  // Generate floating geometric shapes with random movement
  const shapes = Array.from({ length: 8 }, (_, i) => {
    const size = 60 + Math.random() * 80; // Smaller on mobile: 60-140px (will be hidden on very small screens)
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    // More varied movement patterns - some move in arcs, some in straight lines
    const moveX1 = (Math.random() - 0.5) * 300;
    const moveY1 = (Math.random() - 0.5) * 300;
    const moveX2 = (Math.random() - 0.5) * 300;
    const moveY2 = (Math.random() - 0.5) * 300;
    const duration = 20 + Math.random() * 25;
    const delay = Math.random() * 5;
    const rotation = Math.random() * 360;
    const rotationSpeed = (Math.random() - 0.5) * 720; // Faster rotation
    
    const types = ['square', 'circle', 'triangle'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: i,
      type,
      size,
      startX,
      startY,
      moveX1,
      moveY1,
      moveX2,
      moveY2,
      duration,
      delay,
      rotation,
      rotationSpeed
    };
  });
  return <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 py-20 sm:py-32">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut'
      }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-3xl" />
        <motion.div animate={{
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.25, 0.15]
      }} transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 3
      }} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      {particles.map(particle => <motion.div key={particle.id} initial={{
      opacity: 0,
      x: `${particle.x}vw`,
      y: `${particle.y}vh`
    }} animate={{
      opacity: [0, 0.6, 0.6, 0],
      y: [`${particle.y}vh`, `${particle.y - 30}vh`],
      x: [`${particle.x}vw`, `${particle.x + 10}vw`]
    }} transition={{
      duration: particle.duration,
      repeat: Infinity,
      delay: particle.delay,
      ease: 'easeInOut'
    }} className="absolute w-1 h-1 bg-amber-300/60 rounded-full" />)}

      {/* Floating geometric shapes */}
      {shapes.map(shape => {
        const getShapeStyle = () => {
          const baseStyle: React.CSSProperties = {
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.startX}%`,
            top: `${shape.startY}%`,
            border: `2px solid rgba(245, 158, 11, 0.6)`,
            backgroundColor: 'transparent',
          };

          switch (shape.type) {
            case 'circle':
              return { ...baseStyle, borderRadius: '50%' };
            case 'triangle':
              // Triangle handled separately with SVG
              return baseStyle;
            default: // square
              return { ...baseStyle, borderRadius: '8px' };
          }
        };

        if (shape.type === 'triangle') {
          return (
            <motion.svg
              key={shape.id}
              width={shape.size}
              height={shape.size}
              style={{
                position: 'absolute',
                left: `${shape.startX}%`,
                top: `${shape.startY}%`,
              }}
              className="absolute"
              animate={{
                x: [0, shape.moveX1, shape.moveX2, 0],
                y: [0, shape.moveY1, shape.moveY2, 0],
                rotate: [shape.rotation, shape.rotation + shape.rotationSpeed, shape.rotation + shape.rotationSpeed * 2, shape.rotation],
                scale: [1, 1, 1, 1], // Maintain fixed size
                opacity: [0.4, 0.6, 0.5, 0.4],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                delay: shape.delay,
                ease: 'easeInOut',
              }}
            >
              <polygon
                points={`${shape.size / 2},0 0,${shape.size} ${shape.size},${shape.size}`}
                fill="none"
                stroke="rgba(245, 158, 11, 0.6)"
                strokeWidth="2"
              />
            </motion.svg>
          );
        }

        return (
          <motion.div
            key={shape.id}
            style={getShapeStyle()}
            className="absolute hidden sm:block"
            animate={{
              x: [0, shape.moveX1, shape.moveX2, 0],
              y: [0, shape.moveY1, shape.moveY2, 0],
              rotate: [shape.rotation, shape.rotation + shape.rotationSpeed, shape.rotation + shape.rotationSpeed * 2, shape.rotation],
              scale: [1, 1, 1, 1], // Maintain fixed size
              opacity: [0.1, 0.3, 0.2, 0.1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Bottom fade gradient to blend seamlessly with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/90 via-[#0a0a0f]/50 via-[#0a0a0f]/20 to-transparent pointer-events-none z-[5]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="mb-12">
          <motion.span animate={{
          opacity: [0.4, 0.7, 0.4]
        }} transition={{
          duration: 3,
          repeat: Infinity
        }} className="text-amber-300 font-medium tracking-[0.2em] uppercase text-xs">
            Powered by Intelligence
          </motion.span>
        </motion.div>

        <motion.h1 initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="text-6xl md:text-7xl lg:text-8xl font-bold mb-16 leading-[1.1] tracking-tight">
          A marketplace for{' '}
          <motion.span animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }} transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear'
        }} className="inline-block bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent" style={{
          backgroundSize: '200% 100%'
        }}>
            ideas
          </motion.span>
          .
        </motion.h1>

        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 sm:mb-20 max-w-2xl mx-auto leading-relaxed font-normal px-4">
          Skip the patent process. Submit ideas and get paid fast. Companies get free access to curated innovations from vetted creators.
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.8
      }} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 sm:mb-32 px-4">
          <motion.button
            onClick={() => setShowCreatorModal(true)}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)'
            }}
            whileTap={{
              scale: 0.98
            }}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-lg bg-black border border-amber-400/30 font-semibold text-sm sm:text-base overflow-hidden w-full sm:w-auto flex items-center justify-center"
          >
            <span className="relative z-10 flex items-center gap-3 text-gradient-animated justify-center">
              Join Creator Waitlist
              <motion.div 
                animate={{
                  x: [0, 4, 0]
                }} 
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <ArrowRight className="w-4 h-4" style={{ 
                  stroke: '#FFD700'
                }} />
              </motion.div>
            </span>
          </motion.button>

          <motion.button
            onClick={() => setShowCompanyModal(true)}
            whileHover={{
              scale: 1.02,
              borderColor: 'rgba(245, 158, 11, 0.6)'
            }}
            whileTap={{
              scale: 0.98
            }}
            className="px-8 sm:px-10 py-4 sm:py-5 rounded-lg border border-amber-400/30 bg-amber-500/5 text-white font-semibold text-sm sm:text-base hover:bg-amber-500/10 transition-all duration-300 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            Join Company Waitlist
            <motion.div animate={{
              x: [0, 4, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 1.2
      }} className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-xs sm:text-sm px-4">
          {[{
          label: 'Secure NDA Protection',
          color: 'bg-amber-400'
        }, {
          label: 'AI-Powered Matching',
          color: 'bg-yellow-400'
        }, {
          label: 'Fair Compensation',
          color: 'bg-amber-300'
        }].map((item, index) => <motion.div key={item.label} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1.4 + index * 0.1
        }} className="flex items-center gap-3">
              <motion.div animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }} transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.4
          }} className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
              <span className="text-gray-500 font-light tracking-wide text-xs uppercase">
                {item.label}
              </span>
            </motion.div>)}
        </motion.div>
      </div>

      <WaitlistModal
        isOpen={showCreatorModal}
        onClose={() => setShowCreatorModal(false)}
        type="CREATOR"
      />
      <WaitlistModal
        isOpen={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        type="COMPANY"
      />
    </div>;
}