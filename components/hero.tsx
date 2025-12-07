import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              ✓ FDA-Grade Accuracy
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Early Detection Saves <span className="text-primary">Sight</span>
            </h1>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Harness advanced AI technology to detect diabetic retinopathy with 99.2% accuracy. Empower healthcare
              professionals with rapid, reliable diagnosis for better patient outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/5 transition-colors">
                Watch Demo
              </button>
            </div>

            <div className="flex gap-8 pt-8 text-sm">
              <div>
                <div className="font-bold text-2xl text-primary">99.2%</div>
                <div className="text-foreground/60">Detection Accuracy</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-primary">&lt;2s</div>
                <div className="text-foreground/60">Analysis Time</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-primary">Global</div>
                <div className="text-foreground/60">Deployment Ready</div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Eye illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-white rounded-full border-8 border-primary/30 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Scan lines animation */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                  <circle
                    cx="128"
                    cy="128"
                    r="96"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent/30"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent/20"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
