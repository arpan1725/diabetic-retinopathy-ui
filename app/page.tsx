"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import ImageUpload from "@/components/image-upload"
import ResultsDisplay from "@/components/results-display"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import VideoCallFrontEnd from "@/components/ui/VideoCallFrontEnd"
import OurTeam from "@/components/ui/ourteam"
import Chatbot from "@/components/ui/chatbot"

export default function Page() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false)

  return (
    <main className="min-h-screen bg-background relative">
      
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsChatbotVisible(!isChatbotVisible)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {isChatbotVisible ? "✖ Close Chatbot" : "👩‍⚕️ Open Chatbot"}
      </button>

      {/* Chatbot UI */}
      {isChatbotVisible && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-2xl rounded-xl z-50">
          <Chatbot />
        </div>
      )}

      {/* Website Content */}
      <Navbar />
      <Hero />
      <Features />
      <ImageUpload />
      <ResultsDisplay />
      <VideoCallFrontEnd />
      <Team />
      <OurTeam />
      <Contact />
      <Footer />
    </main>
  )
}
