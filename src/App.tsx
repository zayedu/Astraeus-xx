"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatMessage from "./components/ChatMessage"
import ChatInput from "./components/ChatInput"
import ModelToggle from "./components/ModelToggle"
import Header from "./components/Header"
import { useChatStore } from "./store/chatStore"
import { streamInsights } from "./services/api"
import "./App.css"

export type ModelType = "dfr" | "par"

function App() {
  const { messages, addMessage, updateMessage, selectedModel, setSelectedModel } = useChatStore()
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (isStreaming) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      role: "user" as const,
      timestamp: new Date(),
    }
    addMessage(userMessage)

    // Add assistant message placeholder
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      content: "",
      role: "assistant" as const,
      timestamp: new Date(),
      isStreaming: true,
    }
    addMessage(assistantMessage)

    setIsStreaming(true)

    try {
      await streamInsights(
        content,
        selectedModel,
        (chunk) => {
          updateMessage(assistantMessage.id, (prev) => ({
            ...prev,
            content: prev.content + chunk,
          }))
        },
        () => {
          updateMessage(assistantMessage.id, (prev) => ({
            ...prev,
            isStreaming: false,
          }))
          setIsStreaming(false)
        },
      )
    } catch (error) {
      updateMessage(assistantMessage.id, (prev) => ({
        ...prev,
        content: "Sorry, I encountered an error while processing your request. Please try again.",
        isStreaming: false,
      }))
      setIsStreaming(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rbc-gradient-start via-rbc-gradient-middle-1 to-rbc-gradient-middle-2 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[400px] h-[400px] bg-rbc-blue/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-60 -left-60 w-[400px] h-[400px] bg-rbc-yellow/15 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-rbc-gradient-middle-1/10 rounded-full blur-3xl animate-pulse-slow delay-500" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <Header />

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Model Toggle */}
          <div className="py-4">
            <ModelToggle selectedModel={selectedModel} onModelChange={setSelectedModel} />
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto pb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            <AnimatePresence mode="popLayout">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-24 px-4" // Increased padding
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-rbc-blue to-rbc-blue-light rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                    {" "}
                    {/* Larger, more rounded, prominent */}
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-5xl font-display font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                    {" "}
                    {/* Larger, bolder, display font */}
                    Astraeus: Your <span className="text-rbc-blue">RBC</span> Insight Engine
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
                    {" "}
                    {/* Larger, more readable body text */}
                    Unlock the power of your data with natural language queries. Astraeus provides instant, actionable
                    insights from RBC datasets, transforming complex information into clear, understandable answers.
                  </p>
                </motion.div>
              ) : (
                messages.map((message) => <ChatMessage key={message.id} message={message} />)
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="py-4">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isStreaming}
              placeholder="Ask me about your RBC data insights..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
