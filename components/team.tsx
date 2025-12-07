export default function Team() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      expertise: "Ophthalmology",
      image: "/professional-woman-doctor.jpg",
    },
    {
      name: "Prof. James Mitchell",
      role: "AI Research Lead",
      expertise: "Deep Learning",
      image: "/professional-man-scientist.jpg",
    },
    {
      name: "Dr. Priya Patel",
      role: "Clinical Validation Lead",
      expertise: "Retinopathy",
      image: "/professional-woman-researcher.jpg",
    },
    {
      name: "Michael Torres",
      role: "Engineering Director",
      expertise: "Healthcare Tech",
      image: "/professional-man-engineer.jpg",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Expert Team</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Led by world-class ophthalmologists, AI researchers, and healthcare technologists
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="text-center group">
              <div className="mb-4 overflow-hidden rounded-2xl border border-border">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-primary font-semibold mb-1">{member.role}</p>
              <p className="text-sm text-foreground/60">{member.expertise}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
