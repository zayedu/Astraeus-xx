import { create } from "zustand"
import type { ModelType } from "../App"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isStreaming?: boolean
}

interface ChatStore {
  messages: Message[]
  selectedModel: ModelType
  addMessage: (message: Message) => void
  updateMessage: (id: string, updater: (message: Message) => Message) => void
  clearMessages: () => void
  setSelectedModel: (model: ModelType) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  selectedModel: "dfr",
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (id, updater) =>
    set((state) => ({
      messages: state.messages.map((msg) => (msg.id === id ? updater(msg) : msg)),
    })),
  clearMessages: () => set({ messages: [] }),
  setSelectedModel: (model) => set({ selectedModel: model }),
}))
