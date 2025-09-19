"use client"

import { motion } from "framer-motion"
import { Check, ArrowLeft, MessageCircle, Mail, Linkedin, Twitter, Instagram, Star, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function PricingPage() {
  const router = useRouter()
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const monthlyFeatures = ["Unlimited AI Tutor sessions", "Course Summaries", "Progress Tracking"]
  const yearlyFeatures = ["All Monthly features", "Priority AI support", "Access to Beta Projects"]

  const handleFeedbackSubmit = () => {
    if (feedback.trim() && rating > 0) {
      setFeedbackSubmitted(true)
      // Here you would typically send the feedback to your backend
      setTimeout(() => {
        setFeedbackSubmitted(false)
        setFeedback("")
        setRating(0)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Go Back Button */}
      <motion.button
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Go Back</span>
      </motion.button>

      <div className="relative z-10 px-6 py-20">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Choose Your Plan.
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-blue-200 via-purple-200 to-white bg-clip-text text-transparent">
            Start Learning Today.
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Affordable, flexible, and built for every student.</p>
        </motion.div>

        {/* Pricing Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 h-full">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Monthly Plan</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">₹300</span>
                    <span className="text-white/60 ml-2">/ month</span>
                  </div>
                  <p className="text-white/60">Billed monthly</p>
                </div>

                <div className="space-y-4 mb-8">
                  {monthlyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                  size="lg"
                >
                  Get Monthly Plan
                </Button>
              </div>
            </motion.div>

            {/* Yearly Plan - Highlighted */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Save 30%
                </span>
              </div>
              <div className="relative bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-8 h-full ring-2 ring-purple-500/50">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Yearly Plan</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">₹200</span>
                    <span className="text-white/60 ml-2">/ month</span>
                  </div>
                  <p className="text-white/60">₹2400 billed once yearly</p>
                </div>

                <div className="space-y-4 mb-8">
                  {yearlyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25"
                  size="lg"
                >
                  Get Yearly Plan
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Section */}
        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white/60">Get in touch with our team</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/918449659345"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
                <p className="text-white/60">Chat with us on WhatsApp</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:suryapratapsinghbisht61@gmail.com"
              className="group block"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-white/60">Email us directly</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Share Your Feedback</h2>
            <p className="text-white/60">Help us improve FLY with your valuable feedback</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
            {!feedbackSubmitted ? (
              <div className="space-y-6">
                {/* Rating Stars */}
                <div className="text-center">
                  <p className="text-white mb-4">Rate your experience:</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors ${star <= rating ? "text-yellow-400" : "text-white/30"}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star className="w-8 h-8 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Feedback Textarea */}
                <div>
                  <label className="block text-white mb-2">Your Feedback:</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about your experience with FLY..."
                    className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    onClick={handleFeedbackSubmit}
                    disabled={!feedback.trim() || rating === 0}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>
              </div>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-white/60">Your feedback has been submitted successfully.</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center border-t border-white/10 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">FLY</h3>
            <p className="text-white/60 mb-6">Future Learning for Youth</p>

            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <p className="text-white/40 text-sm">© 2024 FLY. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  )
}
