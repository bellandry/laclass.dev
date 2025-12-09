import { ArrowDown } from "lucide-react"

export const RotatingScrollIndicator = ({ className }: { className?: string}) => {
  return (
    <div className={`scroll-indicator absolute bottom-12 right-8 md:right-12 z-20 ${className}`}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
          <text fill="white" fontSize="12" fontWeight="bold" letterSpacing="2">
            <textPath href="#circlePath" startOffset="0%">SCROLL • TO • EXPLORE •</textPath>
          </text>
        </svg>
        <ArrowDown className="absolute text-cyan-400 animate-bounce" />
      </div>
    </div>
  )
}