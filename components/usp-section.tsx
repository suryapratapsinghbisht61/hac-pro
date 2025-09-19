"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const usps = [
  {
    title: "Structure + AI + Motivation",
    description: "Everything you need for effective learning in one unified platform",
    gradient: "from-[#dc2626] to-[#ef4444]",
  },
  {
    title: "Dual AI System",
    description: "AI Teacher explains concepts while AI Coach keeps you motivated",
    gradient: "from-[#ef4444] to-[#f87171]",
  },
  {
    title: "Multiplayer Learning",
    description: "Turn education into an engaging social game with peers worldwide",
    gradient: "from-[#f87171] to-[#dc2626]",
  },
  {
    title: "Community + Mentorship",
    description: "Connect with mentors and peers who share your learning journey",
    gradient: "from-[#dc2626] to-[#fca5a5]",
  },
  {
    title: "Outcome-Based Tracking",
    description: "Measure real progress through skills, projects, and career advancement",
    gradient: "from-[#ef4444] to-[#dc2626]",
  },
]

export default function USPSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-[#fafafa] mb-4">Why Choose FLY?</h2>
          <p className="text-[#fafafa]/70 text-lg max-w-2xl mx-auto">
            Five unique advantages that make FLY the future of learning
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {usps.map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 bg-[#f5f5dc]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#f5f5dc]/20 hover:bg-[#f5f5dc]/20 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <div className={`w-full h-2 bg-gradient-to-r ${usp.gradient} rounded-full mb-6`} />
                <h3 className="text-2xl font-medium text-[#fafafa] mb-4">{usp.title}</h3>
                <p className="text-[#fafafa]/70 leading-relaxed">{usp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
