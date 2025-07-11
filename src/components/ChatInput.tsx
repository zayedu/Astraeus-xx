"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex items-center p-4 border-t border-gray-200 bg-white glassmorphism rounded-t-xl shadow-lg">
      <Textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 resize-none border-none focus:ring-0 focus-visible:ring-0 shadow-none bg-transparent text-gray-800 placeholder:text-gray-400"
        rows={1}
      />
      <Button
        onClick={handleSendMessage}
        className="ml-4 p-2 rounded-full bg-gradient-to-r from-stripeGradientStart via-stripeGradientMid to-stripeGradientEnd text-white shadow-md hover:opacity-90 transition-opacity"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}
