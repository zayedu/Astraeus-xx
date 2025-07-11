"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { ChatInput } from "@/components/ChatInput"
import { ChatMessage } from "@/components/ChatMessage"
import { ModelToggle } from "@/components/ModelToggle"
import { useChatStore } from "@/store/chatStore"
import { fetchChatResponse } from "@/services/api"
import { ScrollArea } from "@/components/ui/scroll-area"

function App() {
  const { messages, addMessage } = useChatStore()
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (text: string) => {
    const userMessage = { id: Date.now().toString(), text, sender: "user" as const }
    addMessage(userMessage)
    setIsTyping(true)

    // Simulate a data source message before the main response
    setTimeout(async () => {
      const dataSourceMessage = {
        id: (Date.now() + 1).toString(),
        text: "Data Source: RBC Internal Knowledge Base",
        sender: "assistant" as const,
      }
      addMessage(dataSourceMessage)

      const assistantResponse = await fetchChatResponse(text)
      const assistantMessage = {
        id: (Date.now() + 2).toString(),
        text: assistantResponse,
        sender: "assistant" as const,
      }
      addMessage(assistantMessage)
      setIsTyping(false)
    }, 500)
  }

  useEffect(() => {
    // Scroll to bottom of chat messages
    const chatContainer = document.getElementById("chat-messages")
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
      style={{
        backgroundImage: `url(/background-pattern.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div> {/* Subtle overlay */}
      <div className="relative z-10 w-full max-w-3xl h-[90vh] flex flex-col rounded-xl shadow-2xl overflow-hidden glassmorphism">
        <Header />
        <div className="flex-1 flex flex-col p-4 bg-white/50 overflow-hidden">
          <div className="flex justify-center mb-4">
            <ModelToggle />
          </div>
          <ScrollArea id="chat-messages" className="flex-1 pr-4">
            <div className="flex flex-col space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <ChatMessage
                  message={{
                    id: "typing",
                    text: "Astraeus is typing...",
                    sender: "assistant",
                  }}
                />
              )}
            </div>
          </ScrollArea>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default App
