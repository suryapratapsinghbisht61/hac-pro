"use client"

import { motion } from "framer-motion"
import { Target, Bot, Gamepad2, Globe, TrendingUp } from "lucide-react"

const useCases = [
  {
    icon: Target,
    title: "Personalized AI Roadmaps",
    description: "Get custom learning paths tailored to your goals and learning style",
  },
  {
    icon: Bot,
    title: "AI Teacher + AI Coach",
    description: "Dual AI system that teaches concepts and motivates you to keep going",
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Earn tokens, complete quests, and climb leaderboards while learning",
  },
  {
    icon: Globe,
    title: "Global Peer Network",
    description: "Connect with learners worldwide and learn together",
  },
  {
    icon: TrendingUp,
    title: "Outcome Tracking",
    description: "Track real skills, projects, and career progress",
  },
]

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function UseCasesSection() {
  return (
    <section className="relative py-20 px-8 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] overflow-hidden">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-[#fafafa] mb-4">Transform Your Learning</h2>
          <p className="text-[#fafafa]/70 text-lg max-w-2xl mx-auto">
            Discover how FLY revolutionizes education with AI-powered features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#f5f5dc]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#f5f5dc]/20 hover:bg-[#f5f5dc]/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#dc2626]/20 to-[#ef4444]/20 border border-[#f5f5dc]/10 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-[#fafafa]" />
                </div>
                <h3 className="text-xl font-medium text-[#fafafa] mb-3">{useCase.title}</h3>
                <p className="text-[#fafafa]/70 text-sm leading-relaxed">{useCase.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
