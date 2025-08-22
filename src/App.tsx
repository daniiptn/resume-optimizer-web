import { useState } from "react";

function App() {
  const [cv, setCv] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv || !jd) return alert("Please upload a CV and paste a job description");

    const formData = new FormData();
    formData.append("cv", cv);
    formData.append("jd", jd);

    setLoading(true);
    try {
      const response = await fetch(
        "https://resume-optimizer-api-production.up.railway.app/optimize",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111827", color: "#fff", padding: "24px" }}>
      {/* Centered container */}
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>
          Resume Optimizer Web
        </h1>
  
        {/* Upload Form Block (white card) */}
        <div style={{ background: "#fff", color: "#111", padding: 24, borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,.2)", marginBottom: 24 }}>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Upload CV:</label>
              <input type="file" onChange={(e) => setCv(e.target.files?.[0] || null)} />
            </div>
  
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Job Description:</label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                style={{ width: "100%", height: 140, padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
              />
            </div>
  
            <button
              type="submit"
              disabled={loading}
              style={{
                alignSelf: "start",
                padding: "10px 16px",
                background: "#2563eb",
                color: "#fff",
                border: 0,
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              {loading ? "Optimizing..." : "Optimize"}
            </button>
          </form>
        </div>
  
        {/* Result Block (white card) */}
        {result && (
          <div style={{ background: "#fff", color: "#111", padding: 24, borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,.2)", marginBottom: 24 }}>
            <h2 style={{ marginTop: 0, fontSize: 22, fontWeight: 700 }}>Optimization Result</h2>
            <p><strong>Filename:</strong> {result.filename}</p>
            <p><strong>Filesize:</strong> {(result.filesize / 1024).toFixed(1)} KB</p>
  
            {result.supabase_url ? (
              <p>
                <strong>Stored File:</strong>{" "}
                <a
                  href={result.supabase_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    background: "#2563eb",
                    color: "#fff",
                    borderRadius: 6,
                    textDecoration: "none",
                    fontWeight: 600
                  }}
                >
                  View Uploaded CV
                </a>
              </p>
            ) : (
              <p><strong>Stored File:</strong> Not available</p>
            )}
  
            <div style={{ marginTop: 12 }}>
              <p><strong>Job Description snippet:</strong></p>
              <blockquote style={{ background: "#f9fafb", borderLeft: "4px solid #2563eb", margin: 0, padding: "8px 12px", fontStyle: "italic" }}>
                {result.job_description}
              </blockquote>
            </div>
          </div>
        )}
  
        {/* Planned Features (dark card) */}
        <div style={{ background: "#1f2937", color: "#e5e7eb", padding: 24, borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,.2)" }}>
          <h3 style={{ marginTop: 0 }}>Planned Features</h3>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>✅ Store CV in Supabase</li>
            <li>⬜ AI-Optimized Resume Text</li>
            <li>⬜ ATS Compatibility Score</li>
            <li>⬜ Improvement Recommendations</li>
            <li>⬜ Version History & Comparison</li>
            <li>⬜ Export as PDF (template-based)</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  
  
}

export default App;
