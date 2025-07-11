"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModelToggle() {
  const [activeModel, setActiveModel] = useState("GPT-4o")

  const models = ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3"]

  return (
    <div className="flex items-center justify-center p-2 rounded-full glassmorphism border border-white/20 shadow-lg">
      {models.map((model) => (
        <Button
          key={model}
          variant="ghost"
          onClick={() => setActiveModel(model)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeModel === model
              ? "bg-white text-transparent bg-clip-text bg-gradient-to-r from-stripeGradientStart via-stripeGradientMid to-stripeGradientEnd shadow-md"
              : "text-gray-600 hover:text-gray-800 hover:bg-white/20",
          )}
        >
          {model}
        </Button>
      ))}
    </div>
  )
}
