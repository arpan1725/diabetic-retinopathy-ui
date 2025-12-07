"use client"

import type React from "react"

import { useState } from "react"
import { Upload, CheckCircle } from "lucide-react"

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setIsUploaded(true)
  }

  return (
    <section id="test" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Test Your Images</h2>
          <p className="text-lg text-foreground/60">Upload a retinal image and get instant AI analysis</p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative p-12 border-2 border-dashed rounded-2xl transition-all cursor-pointer ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 bg-card"
          } ${isUploaded ? "border-accent bg-accent/5" : ""}`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            {isUploaded ? (
              <>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Image Uploaded</h3>
                  <p className="text-foreground/60">Processing your retinal image...</p>
                </div>
                <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
                  Analyze Now
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload size={32} className="text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Drag and drop your image</h3>
                  <p className="text-foreground/60">or click to browse (PNG, JPG, up to 10MB)</p>
                </div>
                <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
                  Select File
                </button>
              </>
            )}
          </div>

          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={() => setIsUploaded(true)}
          />
        </div>

        {/* File Requirements */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { label: "Format", value: "PNG, JPG, TIFF" },
            { label: "Resolution", value: "512x512 min" },
            { label: "File Size", value: "Max 10MB" },
          ].map((req, idx) => (
            <div key={idx} className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-foreground/60 mb-1">{req.label}</p>
              <p className="font-semibold text-foreground">{req.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
