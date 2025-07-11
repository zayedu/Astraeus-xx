import type { ModelType } from "../App"

export const streamInsights = async (
  query: string,
  model: ModelType,
  onChunk: (chunk: string) => void,
  onComplete: () => void,
): Promise<void> => {
  const endpoints = {
    dfr: "http://localhost:8080/par/stream-insights",
    par: "http://127.0.0.1:8080/dfr/stream-insights",
  }

  try {
    const response = await fetch(`${endpoints[model]}?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error("No response body")
    }

    const decoder = new TextDecoder()

    try {
      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        onChunk(chunk)
      }
    } finally {
      reader.releaseLock()
      onComplete()
    }
  } catch (error) {
    console.error("Streaming error:", error)
    throw error
  }
}
