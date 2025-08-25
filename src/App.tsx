<div className="h-10 w-10 bg-red-500"></div>


import { useState } from "react";


type Result = {
  filename: string;
  filesize: number;
  job_description: string;
  supabase_url?: string;
};

function App() {
  // ---- State ----
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // ---- Backend URL from .env ----
  const API_URL = import.meta.env.VITE_API_URL;

  // ---- Handlers ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file || !jd) {
      setError("Please upload a CV and paste a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);
    formData.append("jd", jd);

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/optimize`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: Result = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ---- UI ----
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-center">
          Resume Optimizer Web
        </h1>

        {/* Upload Form Block */}
        <div className="bg-white text-slate-900 p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* File input */}
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Upload CV:
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.rtf,.txt"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-slate-600
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
              />
            </div>

            {/* JD textarea */}
            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Job Description:
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={6}
                className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste the job description here…"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 font-semibold"
            >
              {loading ? "Optimizing..." : "Optimize"}
            </button>

            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>

        {/* Result Block */}
        {result && (
          <div className="bg-white text-slate-900 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Optimization Result</h2>
            <div className="space-y-2">
              <p>
                <strong>Filename:</strong> {result.filename}
              </p>
              <p>
                <strong>Filesize:</strong>{" "}
                {(result.filesize / 1024).toFixed(1)} KB
              </p>

              {result.supabase_url ? (
                <p className="mt-2">
                  <strong>Stored File:</strong>{" "}
                  <a
                    href={result.supabase_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Uploaded CV
                  </a>
                </p>
              ) : (
                <p>
                  <strong>Stored File:</strong> Not available
                </p>
              )}

              <div className="mt-3">
                <p className="font-semibold mb-1">Job Description snippet:</p>
                <blockquote className="bg-slate-50 border-l-4 border-blue-600 p-3 italic rounded">
                  {result.job_description}
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* Planned Features */}
        <div className="bg-slate-800 text-slate-200 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Planned Features</h3>
          <ul className="list-disc pl-6 space-y-1">
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
