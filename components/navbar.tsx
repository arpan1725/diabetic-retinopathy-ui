"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Test", href: "#test" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">◉</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline">RetinalAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button className="hidden sm:block px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-4 mx-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
