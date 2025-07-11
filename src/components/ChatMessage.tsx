"use client"

import type React from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import type { Message } from "../store/chatStore"

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-gray-700" : "bg-rbc-blue"
          }`}
        >
          {isUser ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>

        {/* Message Content */}
        <div
          className={`bg-white/30 rounded-xl shadow-lg border border-white/20 backdrop-blur-2xl ring-1 ring-white/50`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed px-4 py-3">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none text-gray-800 px-4 py-3">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-sm">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 pl-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 pl-4">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gradient-stripe">{children}</h1>,
                  h2: ({ children }) => (
                    <h2 className="text-base font-semibold mb-2 text-gradient-stripe">{children}</h2>
                  ),
                  h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-gradient-stripe">{children}</h3>,
                  code: ({ children, className }) => {
                    const isInline = !className
                    return isInline ? (
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-800">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto mb-2 border border-gray-200">
                        <code className="text-xs font-mono text-gray-800">{children}</code>
                      </pre>
                    )
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2 rounded-r-sm bg-gray-50 py-1">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content || ""}
              </ReactMarkdown>

              {message.isStreaming && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block w-2 h-3 bg-rbc-blue rounded-sm ml-1"
                />
              )}
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs mt-1 ${isUser ? "text-gray-500" : "text-gray-400"} px-4`}>
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage
