import { Zap, Target, Brain } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Analyze retinal images in under 2 seconds with our optimized neural networks for rapid clinical decision-making.",
    },
    {
      icon: Target,
      title: "High Accuracy",
      description:
        "Achieve 99.2% detection accuracy across all stages of diabetic retinopathy with clinically validated algorithms.",
    },
    {
      icon: Brain,
      title: "AI Powered",
      description:
        "State-of-the-art deep learning models trained on 500,000+ verified clinical cases for unmatched reliability.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Enterprise-Grade Features</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Built for healthcare professionals with clinical precision and ease of use
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
