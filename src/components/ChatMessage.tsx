import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bot } from "lucide-react"

interface ChatMessageProps {
  message: {
    id: string
    text: string
    sender: "user" | "assistant"
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg max-w-[80%] relative",
        isUser ? "ml-auto justify-end" : "mr-auto justify-start",
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-rbcRed text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "p-3 rounded-xl shadow-md glassmorphism",
          isUser
            ? "bg-white/20 text-gray-800 border border-white/30 ring-1 ring-white/40"
            : "bg-white/20 text-gray-800 border border-white/30 ring-1 ring-white/40",
        )}
      >
        {message.text.startsWith("Data Source:") ? (
          <div className="text-sm text-gray-600">
            <span className="font-semibold bg-gradient-to-r from-stripeGradientStart via-stripeGradientMid to-stripeGradientEnd text-gradient-stripe">
              Data Source:
            </span>{" "}
            {message.text.substring("Data Source:".length).trim()}
          </div>
        ) : (
          <p className="text-base">{message.text}</p>
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.png" alt="User Avatar" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
