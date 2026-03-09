import { motion } from 'framer-motion';

export function WaterCycleAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Rain drops */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-0.5 h-4 bg-primary/20 rounded-full"
          style={{ left: `${5 + i * 6.5}%`, top: '-20px' }}
          animate={{
            y: ['0vh', '105vh'],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'linear',
          }}
        />
      ))}

      {/* Steam / evaporation bubbles rising */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`steam-${i}`}
          className="absolute rounded-full bg-accent/10"
          style={{
            width: 8 + Math.random() * 12,
            height: 8 + Math.random() * 12,
            left: `${10 + i * 11}%`,
            bottom: '0px',
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, 10 * (i % 2 === 0 ? 1 : -1), 20 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.2, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Cloud shapes floating */}
      {[15, 55, 80].map((left, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute top-8 bg-muted/30 rounded-full blur-sm"
          style={{
            width: 80 + i * 20,
            height: 30 + i * 5,
            left: `${left}%`,
          }}
          animate={{
            x: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Electric sparks */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute text-lg"
          style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 1.5 + 2,
            repeatDelay: 4,
          }}
        >
          ⚡
        </motion.div>
      ))}
    </div>
  );
}
