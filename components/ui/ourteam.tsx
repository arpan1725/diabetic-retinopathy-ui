export default function OurTeam() {
  const Ourteam = [
     {
      name: "Dr. Dhrubajyoti Ghosh",
      role: "Associate Professor, CSE, OmDayal Group of Institutions",
      expertise: "Supervisor/Mentor",
      image: "/dg.jpg",
    },
    {
      name: "Soumyodip Thanadar",
      role: "Computer Science Egg. Student",
      expertise: "Team Leader, Innovation & Python Model",
      image: "/st.jpg",
    },
    {
      name: "Arpan Maity",
      role: "Computer Science Engg. Student",
      expertise: "Frontend and Database Pilot",
      image: "/am.png",
    },
    {
      name: "Maharshi Adhikary",
      role: "Computer Science Engg. Student",
      expertise: "Reasearch & Development and Documentation Pilot",
      image: "/ma.png",
    },
    
    {
      name: "Md. Asif",
      role: "Computer Science Engg. Student",
      expertise: "JavaScript & Presentation Pilot",
      image: "/mda.jpg",
    },
    {
      name: "Pushpaksha Ghosh",
      role: "Computer Science Engg. Student",
      expertise: "Dataset and Code Quality Pilot",
      image: "/pg.jpg",
    },
    
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Creators of the Application</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            This Project is Designed and Made with ❤️ in India.<br></br>
            We Students from Computer Science and Enginnering Department at <br></br> OmDayal Group of Institutions Research and Crafted this work in our <br></br> CSE LAB - 2.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* {Ourteam.map((member, idx) => (
            <div key={idx} className="text-center group"> */}

             {Ourteam.map((member, idx) => (
            <div
              key={idx}
              className={`text-center group ${
                // Shift Asif (index 4) and Pushpaksha (index 5)
                idx === 4 || idx === 5 ? "lg:translate-x-70" : ""
              }`}>
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
