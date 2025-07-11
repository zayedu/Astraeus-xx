"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message...",
}) => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/50 rounded-xl border border-white/20 shadow-lg backdrop-blur-xl p-4"
    >
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none border-0 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 text-base leading-relaxed max-h-32 scrollbar-thin scrollbar-thumb-gray-300"
            style={{ minHeight: "24px" }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
            message.trim() && !disabled
              ? "bg-rbc-blue text-white shadow-md hover:bg-rbc-blue-dark"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={message.trim() && !disabled ? { scale: 1.05 } : {}}
          whileTap={message.trim() && !disabled ? { scale: 0.95 } : {}}
        >
          {disabled ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
            />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </motion.button>
      </form>

      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span className={`${message.length > 500 ? "text-red-500" : ""}`}>{message.length}/1000</span>
      </div>
    </motion.div>
  )
}

export default ChatInput
