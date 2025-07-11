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
    <div
      className="min-h-screen bg-gray-50 flex flex-col relative"
      style={{
        backgroundImage: `url(/background-pattern.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-6 bg-white/50 rounded-xl shadow-lg border border-white/20 backdrop-blur-xl my-8"
      >
        {/* Model Toggle */}
        <div className="mb-6">
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
                className="flex flex-col items-center justify-center h-full text-center py-24 px-4"
              >
                <div className="w-16 h-16 bg-rbc-blue rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-display font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                  Astraeus: Your <span className="text-gradient-stripe">RBC</span> Insight Engine
                </h2>
                <p className="text-base text-gray-600 max-w-xl leading-relaxed">
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
        <div className="pt-4">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isStreaming}
            placeholder="Ask me about your RBC data insights..."
          />
        </div>
      </motion.div>
    </div>
  )
}

export default App
