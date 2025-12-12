import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import ImageUpload from "@/components/image-upload"
import ResultsDisplay from "@/components/results-display"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import VideoCallFrontEnd from "@/components/ui/VideoCallFrontEnd"
import ourteam from "@/components/ui/ourteam"
import OurTeam from "@/components/ui/ourteam"


export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <ImageUpload />
      <ResultsDisplay />
      <VideoCallFrontEnd/>
      <Team />
      <OurTeam/>
      <Contact />
      <Footer />
    </main>
  )
}
