"use client"

import { motion } from "framer-motion"
import { ArrowRight, Brain, Users, Target, Globe, Rocket, BookOpen, Trophy, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react" // Add useState and useEffect imports

export default function LearnMorePage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false) // Add client-side check
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 }) // Add state for window dimensions with default values

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
      const handleResize = () => {
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="fixed top-6 left-6 z-50">
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full shadow-lg hover:bg-white/90 transition-all duration-300 border border-white/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-chart-2/20 to-secondary/20" />
        <div className="relative container mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Learning is just the beginning.{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                The future is yours to build.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              FLY empowers every child to learn, create, and contribute using AI.
            </p>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isClient &&
            [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * windowDimensions.width, // Use windowDimensions state instead of direct window access
                  y: Math.random() * windowDimensions.height, // Use windowDimensions state instead of direct window access
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-destructive" />
                </div>
                <h2 className="text-3xl font-bold text-card-foreground">The Problem</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Students today are overwhelmed by one-size-fits-all education systems. They lack personalized learning
                paths, struggle with engagement, and miss the connection between learning and real-world impact.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-card-foreground">The Solution</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                FLY transforms learning with dual AI tutors, personalized roadmaps, and gamified experiences. Students
                learn at their own pace, track mastery-based progress, and connect their education to meaningful
                projects.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Future Goals Timeline */}
      <section className="py-24 bg-gradient-to-r from-muted/50 to-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">Your Journey with FLY</h2>
            <p className="text-xl text-muted-foreground">From learning to building to changing the world</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-chart-2 to-secondary rounded-full" />

            <div className="space-y-16">
              {[
                {
                  icon: Brain,
                  title: "Learn with AI",
                  description: "Personal tutor + course summaries tailored to your learning style",
                  color: "primary",
                },
                {
                  icon: Trophy,
                  title: "Pass Learning Milestones",
                  description: "Mastery-based progress tracking with personalized achievements",
                  color: "chart-2",
                },
                {
                  icon: Rocket,
                  title: "Unlock Real-World Projects",
                  description: "AI-guided challenges + peer collaborations on meaningful work",
                  color: "secondary",
                },
                {
                  icon: Globe,
                  title: "Contribute Globally",
                  description: "Publish projects, share with community, impact real problems",
                  color: "accent",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                      <h3 className="text-2xl font-bold text-card-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-${step.color} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why FLY is Different */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4">Why FLY is Different</h2>
            <p className="text-xl text-muted-foreground">Revolutionary features that transform how students learn</p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Brain,
                title: "Dual AI System",
                description: "Personal Tutor + Life Coach working together for your success",
              },
              {
                icon: Users,
                title: "Multiplayer Learning",
                description: "Turn education into engaging collaborative games with peers",
              },
              {
                icon: Target,
                title: "Outcome-Based Progress",
                description: "Track real mastery, not just completion of assignments",
              },
              {
                icon: BookOpen,
                title: "Learn → Build → Contribute",
                description: "Clear path from knowledge to real-world impact",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-chart-2 to-secondary">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Are you ready to{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">FLY?</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Join thousands of students already transforming their learning journey with AI
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Start Free Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Join Beta Program
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">FLY</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Future Learning for Youth - Empowering the next generation with AI-powered education.
              </p>
              <div className="flex gap-4">{/* Social media icons would go here */}</div>
            </div>

            <div>
              <h4 className="font-semibold text-card-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-card-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FLY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
