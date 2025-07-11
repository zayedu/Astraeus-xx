import { Bot } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm z-10 relative">
      <div className="flex items-center space-x-2">
        <Bot className="h-6 w-6 text-rbcRed" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-stripeGradientStart via-stripeGradientMid to-stripeGradientEnd text-gradient-stripe">
          RBC Astraeus
        </h1>
      </div>
      <nav>{/* Navigation items can go here */}</nav>
    </header>
  )
}
