"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import UseCasesSection from "@/components/use-cases-section"
import USPSection from "@/components/usp-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import ContactSection from "@/components/contact-section"
import ExcellenceSection from "@/components/excellence-section"
import { useRouter } from "next/navigation"

export default function ShaderShowcase() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const handleJoinBeta = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-screen overflow-hidden">
        <ShaderBackground>
          <Header onJoinBeta={handleJoinBeta} />
          <HeroContent onGetStarted={handleGetStarted} />
          <PulsingCircle />
        </ShaderBackground>
      </div>

      <ExcellenceSection />

      <div className="relative z-30 bg-black">
        <UseCasesSection />
        <USPSection />
        <TestimonialsSection />
        <CTASection onJoinBeta={handleJoinBeta} />
        <ContactSection />
      </div>
    </div>
  )
}
