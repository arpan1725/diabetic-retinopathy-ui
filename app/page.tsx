import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import ImageUpload from "@/components/image-upload"
import ResultsDisplay from "@/components/results-display"
import Team from "@/components/team"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <ImageUpload />
      <ResultsDisplay />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
