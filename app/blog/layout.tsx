import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-cyan-500 selection:text-black">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar
        currentRoute={"blog"}
      />

      {children}
    </div>
  )
}