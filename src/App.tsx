import { useState } from "react";

function App() {
  const [cv, setCv] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv || !jd) {
      alert("Please upload a CV and paste a job description.");
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

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Resume Optimizer Web</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div>
          <label>
            Upload CV:
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={(e) => setCv(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>
            Job Description:
            <textarea
              rows={5}
              cols={50}
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Optimize
        </button>
      </form>

      <h2>Result:</h2>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
