"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Alex Chen",
    role: "Student",
    avatar: "/student-avatar.png",
    feedback: "FLY turned my boring study routine into a game. I actually learn daily!",
  },
  {
    name: "Sarah Johnson",
    role: "Parent",
    avatar: "/parent-avatar.png",
    feedback: "As a parent, I can finally see my child's real progress.",
  },
  {
    name: "Mike Rodriguez",
    role: "Professional",
    avatar: "/professional-avatar.png",
    feedback: "The AI coaching system helped me stay consistent with my skill development.",
  },
  {
    name: "Emma Wilson",
    role: "Teacher",
    avatar: "/teacher-avatar.png",
    feedback: "My students are more engaged than ever with FLY's gamified approach.",
  },
]

const FloatingPaths = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* More visible animated paths with higher opacity */}
        <motion.path
          d="M0,400 Q250,200 500,400 T1000,400"
          stroke="rgba(245, 245, 220, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0,
          }}
        />
        <motion.path
          d="M0,300 Q300,100 600,300 T1000,300"
          stroke="rgba(173, 216, 230, 0.4)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.7, 0],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.path
          d="M0,500 Q200,700 400,500 T800,500"
          stroke="rgba(255, 182, 193, 0.3)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.path
          d="M200,100 Q500,300 800,100"
          stroke="rgba(144, 238, 144, 0.3)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.4, 0],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.path
          d="M100,600 Q400,400 700,600 Q900,500 1000,600"
          stroke="rgba(221, 160, 221, 0.3)"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </svg>
    </div>
  )
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-20 px-8 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] overflow-hidden">
      <FloatingPaths />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-[#fafafa] mb-4">What Our Users Say</h2>
          <p className="text-[#fafafa]/70 text-lg">Real feedback from students, parents, and educators</p>
        </motion.div>

        <div className="relative h-64 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                x: index === currentIndex ? 0 : 100,
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-[#f5f5dc]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#f5f5dc]/20 max-w-2xl mx-auto text-center">
                <img
                  src={`/abstract-geometric-shapes.png?key=j23en&height=64&width=64&query=${testimonial.role.toLowerCase()}-avatar-professional-headshot`}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-[#fafafa] text-lg mb-4 italic">"{testimonial.feedback}"</p>
                <div>
                  <p className="text-[#fafafa] font-medium">{testimonial.name}</p>
                  <p className="text-[#fafafa]/70 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#fafafa]" : "bg-[#f5f5dc]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
