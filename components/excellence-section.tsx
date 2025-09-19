"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ExcellenceSection() {
  const words = ["Discover", "Excellence"]

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-stone-50 to-neutral-100 overflow-hidden">
      <div className="absolute inset-0">
        {/* Floating transparent blocks */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-sm rounded-2xl border border-red-200/20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Gradient overlay blocks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`gradient-${i}`}
            className="absolute bg-gradient-to-r from-neutral-900/5 to-red-500/10 rounded-3xl backdrop-blur-md"
            style={{
              width: Math.random() * 300 + 150,
              height: Math.random() * 300 + 150,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-neutral-900 to-neutral-700/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the future of learning with our AI-powered platform designed for excellence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="inline-block group relative bg-gradient-to-b from-neutral-900/10 to-red-500/10 
                        p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl 
                        transition-shadow duration-300"
          >
            <Button
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-stone-50/95 hover:bg-white/100 text-neutral-900 transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-neutral-900/10
                            hover:shadow-md hover:shadow-red-500/10"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">Discover Excellence</span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300 text-red-600"
              >
                →
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
