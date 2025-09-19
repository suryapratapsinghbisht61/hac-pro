"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Linkedin, Twitter, Instagram } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="py-20 px-8 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-light text-[#fafafa] mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f5f5dc]/10 backdrop-blur-sm border border-[#f5f5dc]/20 rounded-lg text-[#fafafa] placeholder-[#fafafa]/50 focus:outline-none focus:border-[#f5f5dc]/50 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f5f5dc]/10 backdrop-blur-sm border border-[#f5f5dc]/20 rounded-lg text-[#fafafa] placeholder-[#fafafa]/50 focus:outline-none focus:border-[#f5f5dc]/50 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#f5f5dc]/10 backdrop-blur-sm border border-[#f5f5dc]/20 rounded-lg text-[#fafafa] placeholder-[#fafafa]/50 focus:outline-none focus:border-[#f5f5dc]/50 transition-all duration-200 resize-none"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-[#dc2626] to-[#ef4444] text-[#fafafa] font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#dc2626]/25"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-light text-[#fafafa] mb-6">FLY</h3>
              <p className="text-[#fafafa]/70 leading-relaxed mb-6">
                Your AI-powered personal learning OS. Transform education into an engaging multiplayer experience.
              </p>

              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-[#f5f5dc]/10 backdrop-blur-sm border border-[#f5f5dc]/20 rounded-full flex items-center justify-center text-[#fafafa]/70 hover:text-[#fafafa] hover:bg-[#f5f5dc]/20 hover:border-[#dc2626]/50 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-[#f5f5dc]/10 backdrop-blur-sm border border-[#f5f5dc]/20 rounded-full flex items-center justify-center text-[#fafafa]/70 hover:text-[#fafafa] hover:bg-[#f5f5dc]/20 hover:border-[#dc2626]/50 transition-all duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-[#f5f5dc]/10 backdrop-blur-sm border border-[#f5f5dc]/20 rounded-full flex items-center justify-center text-[#fafafa]/70 hover:text-[#fafafa] hover:bg-[#f5f5dc]/20 hover:border-[#ef4444]/50 transition-all duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[#fafafa] font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-[#fafafa]/70 hover:text-[#fafafa] transition-colors duration-200">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#fafafa]/70 hover:text-[#fafafa] transition-colors duration-200">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#fafafa] font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-[#fafafa]/70 hover:text-[#fafafa] transition-colors duration-200">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#fafafa]/70 hover:text-[#fafafa] transition-colors duration-200">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-[#f5f5dc]/20 mt-16 pt-8 text-center">
          <p className="text-[#fafafa]/50 text-sm">© 2024 FLY - Future Learning for Youth. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
