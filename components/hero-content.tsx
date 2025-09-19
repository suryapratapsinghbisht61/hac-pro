"use client"

import { Rocket } from "lucide-react"
import Link from "next/link"

interface HeroContentProps {
  onGetStarted?: () => void
}

export default function HeroContent({ onGetStarted }: HeroContentProps) {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-[#f5f5dc]/20 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-[#fafafa]/20 to-transparent rounded-full" />
          <Rocket className="w-3 h-3 text-[#fafafa]/90 mr-2" />
          <span className="text-[#fafafa]/90 text-xs font-light relative z-10">Future Learning for Youth</span>
        </div>

        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-[#fafafa] mb-4">
          <span className="font-medium italic instrument">FLY</span> with AI
          <br />
          <span className="font-light tracking-tight text-[#fafafa]">Learning OS</span>
        </h1>

        <p className="text-xs font-light text-[#fafafa]/70 mb-4 leading-relaxed">
          Your AI-powered personal learning OS. Transform boring study routines into engaging multiplayer games with
          personalized AI roadmaps, dual AI coaching system, and outcome-based progress tracking.
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/learn-more">
            <button className="px-8 py-3 rounded-full bg-transparent border border-[#f5f5dc]/30 text-[#fafafa] font-normal text-xs transition-all duration-200 hover:bg-[#f5f5dc]/10 hover:border-[#f5f5dc]/50 cursor-pointer">
              Learn More
            </button>
          </Link>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 rounded-full bg-[#dc2626] text-[#fafafa] font-normal text-xs transition-all duration-200 hover:bg-[#ef4444] cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}
