import { useState } from "react";

type Result = {
  filename: string;
  filesize: number;
  job_description: string;
  supabase_url?: string;
};

function App() {
  const [cv, setCv] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!cv || !jd) {
      setError("Please upload a CV and paste a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cv);
    formData.append("jd", jd);

    try {
      const response = await fetch(
        "https://resume-optimizer-api-production.up.railway.app/optimize",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "600px" }}>
      <h1>Resume Optimizer Web</h1>

      {/* ----- Upload form ----- */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Upload CV:</strong>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={(e) => setCv(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Job Description:</strong>
            <textarea
              rows={5}
              cols={50}
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              style={{ width: "100%", marginTop: "0.5rem" }}
            />
          </label>
        </div>

        <button type="submit">Optimize</button>
      </form>

      {/* ----- Error message ----- */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ----- Result card ----- */}
      {result && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Optimization Result</h2>
          <p><strong>Filename:</strong> {result.filename}</p>
          <p><strong>Filesize:</strong> {(result.filesize / 1024).toFixed(1)} KB</p>

          {result.supabase_url && (
            <p>
              <strong>Stored File:</strong>{" "}
              <a href={result.supabase_url} target="_blank" rel="noopener noreferrer">
                View in Supabase
              </a>
            </p>
          )}

          <div style={{ marginTop: "1rem" }}>
            <p><strong>Job Description snippet:</strong></p>
            <blockquote
              style={{
                backgroundColor: "#fff",
                borderLeft: "4px solid #007acc",
                padding: "0.5rem 1rem",
                fontStyle: "italic",
              }}
            >
              {result.job_description}
            </blockquote>
          </div>
        </div>
      )}

      {/* ----- Future features block ----- */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Planned Features</h3>
        <ul>
          <li>✅ Store CV in Supabase</li>
          <li>⬜ AI-Optimized Resume Text</li>
          <li>⬜ ATS Compatibility Score</li>
          <li>⬜ Improvement Recommendations</li>
          <li>⬜ Version History & Comparison</li>
          <li>⬜ Export as PDF (template-based)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
