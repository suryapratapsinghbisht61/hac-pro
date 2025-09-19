"use client"

interface HeaderProps {
  onJoinBeta?: () => void
}

export default function Header({ onJoinBeta }: HeaderProps) {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <div className="flex items-center">
        <div className="text-[#fafafa] font-bold text-2xl tracking-wider">
          <span className="animate-pulse">F</span>
          <span className="animate-bounce delay-100">L</span>
          <span className="animate-pulse delay-200">Y</span>
        </div>
      </div>

      <nav className="flex items-center space-x-2">
        <a
          href="#"
          className="text-[#fafafa]/80 hover:text-[#fafafa] text-xs font-light px-3 py-2 rounded-full hover:bg-[#f5f5dc]/10 transition-all duration-200"
        >
          Use Cases
        </a>
        <a
          href="#"
          className="text-[#fafafa]/80 hover:text-[#fafafa] text-xs font-light px-3 py-2 rounded-full hover:bg-[#f5f5dc]/10 transition-all duration-200"
        >
          Features
        </a>
        <a
          href="#"
          className="text-[#fafafa]/80 hover:text-[#fafafa] text-xs font-light px-3 py-2 rounded-full hover:bg-[#f5f5dc]/10 transition-all duration-200"
        >
          Contact
        </a>
      </nav>

      <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <button className="absolute right-0 px-2.5 py-2 rounded-full bg-[#f5f5dc] text-[#1a1a1a] font-normal text-xs transition-all duration-300 hover:bg-[#f5f5dc]/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <button 
          onClick={onJoinBeta}
          className="px-6 py-2 rounded-full bg-[#f5f5dc] text-[#1a1a1a] font-normal text-xs transition-all duration-300 hover:bg-[#f5f5dc]/90 cursor-pointer h-8 flex items-center z-10"
        >
          Join Beta
        </button>
      </div>
    </header>
  )
}
