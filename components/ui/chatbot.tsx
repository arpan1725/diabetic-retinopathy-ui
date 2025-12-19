"use client"

import { useState, useRef, useEffect } from "react"
import styles from "@/components/ui/css/chatbot.module.css"
import systemPrompt from "./diabeticinfo"

/* ---------- Types ---------- */
type Sender = "user" | "bot"

interface ChatMessage {
  sender: Sender
  text: string
  suggestions?: string[]
}

/* ---------- Component ---------- */
const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hello! 👋 I’m your Diabetic Retinopathy Detection Assistant. I can help you understand diabetic eye disease, how our AI model works, and how to use this system.",
      suggestions: [
        "What is Diabetic Retinopathy?",
        "Symptoms of Diabetic Retinopathy",
        "Stages of Diabetic Retinopathy",
        "How does this AI model work?",
        "How to upload eye image?",
        "Is this prediction accurate?",
        "Is this a medical diagnosis?",
        "Precautions for diabetic patients",
      ],
    },
  ])

  const [userInput, setUserInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  /* ---------- Effects ---------- */
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory, isTyping])

  /* ---------- Send Handler ---------- */
  const handleSend = async (input: string = userInput) => {
    if (!input.trim()) return

    // 1️⃣ UI update immediately
    const updatedHistory: ChatMessage[] = [
      ...chatHistory,
      { sender: "user", text: input },
    ]

    setChatHistory(updatedHistory)
    setUserInput("")
    setIsTyping(true)

    try {
      // 2️⃣ Backend ke liye SIRF USER messages
      const limitedMessages = updatedHistory
        .filter((m) => m.sender === "user" && m.text.trim() !== "")
        .map((m) => ({
          sender: "user",
          text: m.text,
        }))
        .slice(-6)

      const response = await fetch(
        "https://odgibackend.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemPrompt,       // ✅ IMPORTANT
            messages: limitedMessages,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Backend error")
      }

      const data = await response.json()
      const fullText: string =
        data.response ||
        "I can help with Diabetic Retinopathy related questions."

      // 3️⃣ Typing animation
      let currentText = ""

      for (const char of fullText) {
        currentText += char
        await new Promise((resolve) => setTimeout(resolve, 15))

        setChatHistory((prev) => {
          const updated = [...prev]
          const lastMsg = updated[updated.length - 1]

          if (lastMsg?.sender === "bot") {
            updated[updated.length - 1] = {
              ...lastMsg,
              text: currentText,
            }
          } else {
            updated.push({ sender: "bot", text: currentText })
          }
          return updated
        })
      }

      setIsTyping(false)
    } catch (error) {
      console.error("Chatbot error:", error)
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again later.",
        },
      ])
      setIsTyping(false)
    }
  }

  /* ---------- UI ---------- */
  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatWindow}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[msg.sender]}`}
          >
            <p>{msg.text}</p>

            {msg.suggestions && (
              <div className={styles.suggestions}>
                {msg.suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div
            className={`${styles.message} ${styles.bot} ${styles.typing}`}
          >
            <i>Analyzing...</i>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend()
          }}
          placeholder="Ask about Diabetic Retinopathy..."
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  )
}

export default Chatbot
