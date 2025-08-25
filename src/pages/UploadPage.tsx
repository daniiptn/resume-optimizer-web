import { useState } from "react";
import Toast from "../components/Toast"; // ⬅️ add this import


type Result = {
  filename: string;
  filesize: number;
  job_description: string;
  supabase_url?: string;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false); // ⬅️ add this


  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://resume-optimizer-api-production.up.railway.app";

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
      if (!res.ok) {
        // try to read error text to make the message more helpful
        let reason = "";
        try {
          reason = await res.text();
        } catch (_) {}
        throw new Error(
          `Request failed (${res.status}). ${reason || "Please try again."}`
        );
      }
      const data: Result = await res.json();
      setResult(data);
      setShowSuccess(true); // ⬅️ show toast
    } catch (err: any) {
      setError(err?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {showSuccess && (
        <Toast
          message="CV uploaded successfully and stored in Supabase."
          type="success"
          onClose={() => setShowSuccess(false)}
        />
      )}
      <h1 className="text-4xl font-extrabold text-center">
        Resume Optimizer Web
      </h1>

      {/* Upload Form Block */}
      <div className="bg-white text-slate-900 p-6 rounded-lg shadow">
        {/* Error Alert */}
        {error && (
          <div
            className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-800"
            role="alert"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <svg
                  className="h-5 w-5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16Zm.75-11.5a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5Zm0 7.5a.75.75 0 10-1.5 0 .75.75 0 001.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">
                  <span className="font-semibold">Error:</span> {error}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setError("")}
                className="rounded p-1 text-red-700 hover:bg-red-100"
                aria-label="Dismiss error"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        )}

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

          {/* Submit with spinner */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 font-semibold"
          >
            {loading && (
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Optimizing…" : "Optimize"}
          </button>
        </form>
      </div>

      {/* Result Block */}
      {result && (
        <div className="bg-white text-slate-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Optimization Result</h2>
          <div className="space-y-4">
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
            </div>

            {/* JD Snippet */}
            <div>
              <p className="font-semibold mb-1">Job Description snippet:</p>
              <blockquote className="bg-slate-50 border-l-4 border-blue-600 p-3 italic rounded">
                {result.job_description}
              </blockquote>
            </div>

            {/* AI Suggestions (Coming Soon) */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                AI Suggestions (Coming Soon)
              </h3>
              <p className="text-slate-600">
                Here you will see tailored resume improvements once AI is
                integrated.
              </p>
              <ul className="list-disc pl-6 mt-2 text-slate-700">
                <li>Keywords to add that match the JD</li>
                <li>Bullet points to rewrite for impact</li>
                <li>Missing skills or certifications</li>
              </ul>
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
  );
}
