import { Linkedin, Twitter, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">◉</span>
              </div>
              <span className="font-semibold text-lg">RetinalAI</span>
            </div>
            <p className="text-background/70 text-sm">Advancing healthcare through AI-powered retinal diagnostics.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  HIPAA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-sm text-background/70">© {currentYear} RetinalAI. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
