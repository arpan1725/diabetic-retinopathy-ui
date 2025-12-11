"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"


export default function ResultsDisplay() {
  const mockData = [
    { name: "No DR", value: 92, fill: "var(--color-chart-1)" },
    { name: "Mild", value: 5, fill: "var(--color-chart-3)" },
    { name: "Moderate", value: 2, fill: "var(--color-chart-2)" },
    { name: "Severe", value: 1, fill: "var(--color-chart-4)" },
  ]

  const findings = [
    { stage: "Microaneurysms", status: "Detected", confidence: 97 },
    { stage: "Hard Exudates", status: "Not Detected", confidence: 99 },
    { stage: "Cotton Wool Spots", status: "Detected", confidence: 94 },
    { stage: "Hemorrhages", status: "Not Detected", confidence: 96 },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center">Detailed Analysis Results</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Severity Classification</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-foreground)" />
                <YAxis stroke="var(--color-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                  cursor={{ fill: "var(--color-primary)", opacity: 0.1 }}
                />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Findings Table */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Clinical Findings</h3>
            <div className="space-y-4">
              {findings.map((finding, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{finding.stage}</p>
                    <p className={`text-sm ${finding.status === "Detected" ? "text-accent" : "text-foreground/60"}`}>
                      {finding.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{finding.confidence}%</p>
                    <p className="text-xs text-foreground/60">Confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="mt-8 p-8 bg-accent/10 border border-accent/30 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Clinical Recommendation</h4>
              <p className="text-foreground/70">
                Stage 1 - Mild Non-Proliferative Diabetic Retinopathy detected. Recommend routine follow-up examination
                in 3-6 months. Continue glycemic control management.
              </p>
              
            </div><div className="flex items-start gap-4 rounded-2xl border p-6 bg-muted">
              <span className="text-2xl">📋</span>
  

  <div>
    <h4 className="text-lg font-bold text-foreground mb-2">
      Clinical Recommendation
    </h4>

    <p className="text-foreground/70">
                 Stage 2 - Moderate Non-Proliferative Diabetic Retinopathy detected. Recommend follow-up examination in approximately 2–3 months to monitor
                 disease progression. Reinforce strict glycemic control, blood pressure management, and regular ophthalmic evaluations.
    </p>
            </div><div className="flex items-start gap-4 rounded-2xl border p-6 bg-muted">
              <span className="text-2xl">📋</span>
   

  <div>
    <h4 className="text-lg font-bold text-foreground mb-2">
      Clinical Recommendation
    </h4>

    <p className="text-foreground/70">
      Stage 3 – Severe Non-Proliferative Diabetic Retinopathy detected.  Recommend closer monitoring with a follow-up examination in 1–2 months. 
      Evaluate for potential macular edema and prepare for referral to a retinal specialist if progression continues. Maintain strict glycemic, blood pressure, 
      and lipid control.
    </p>
            </div><div className="flex items-start gap-4 rounded-2xl border p-6 bg-muted">
              <span className="text-2xl">📋</span>
     

  <div>
    <h4 className="text-lg font-bold text-foreground mb-2">
      Clinical Recommendation
    </h4>

    <p className="text-foreground/70">
      Stage 4 – Proliferative Diabetic Retinopathy detected. Recommend urgent referral to a retinal specialist for further evaluation and potential 
      treatment options such as laser therapy or intravitreal interventions. 
      Advise close follow-up and continued maintenance of optimal glycemic and 
      blood pressure control.
    </p>
  </div>
</div>

</div>

</div>

             
              

          </div>
        </div>
      </div>
    </section>
  )
}
