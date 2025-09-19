"use client"

import { motion } from "framer-motion"

interface CTASectionProps {
  onJoinBeta?: () => void
}

export default function CTASection({ onJoinBeta }: CTASectionProps) {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl md:text-6xl font-light text-[#fafafa] mb-6 flex items-center justify-center gap-4">
            Stop scrolling,
            <br />
            <span className="font-medium italic flex items-center gap-3">start flying</span>
          </h2>
          <p className="text-[#fafafa]/70 text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their education with FLY
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onJoinBeta}
              className="px-12 py-4 rounded-full bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-[#fafafa] font-medium text-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#dc2626]/25"
            >
              Join Beta
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-full bg-transparent border border-[#f5f5dc]/30 text-[#fafafa] font-medium text-lg transition-all duration-200 hover:bg-[#f5f5dc]/10 hover:border-[#f5f5dc]/50"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
