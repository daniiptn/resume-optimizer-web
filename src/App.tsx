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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Centered container */}
      <div className="max-w-2xl mx-auto space-y-8">
        
        <h1 style={{ color: "red" }}>DEBUG CHECK</h1>

        <h1 className="text-3xl font-bold mb-6 text-center">Resume Optimizer Web</h1>
  
        {/* Upload Form Block */}
        <div className="bg-white text-black p-6 rounded shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Upload CV:</label>
              <input
                type="file"
                onChange={(e) => setCv(e.target.files?.[0] || null)}
                className="text-black"
              />
            </div>
  
            <div>
              <label className="block font-medium mb-1">Job Description:</label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                className="w-full h-32 text-black p-2 rounded border"
              />
            </div>
  
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              {loading ? "Optimizing..." : "Optimize"}
            </button>
          </form>
        </div>
  
        {/* Result Block */}
        {result && (
          <div className="bg-white text-black p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Optimization Result</h2>
            <p><strong>Filename:</strong> {result.filename}</p>
            <p><strong>Filesize:</strong> {(result.filesize / 1024).toFixed(1)} KB</p>
  
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
              <p><strong>Stored File:</strong> Not available</p>
            )}
  
            <p className="mt-2">
              <strong>Job Description snippet:</strong> {result.job_description}
            </p>
          </div>
        )}
  
        {/* Planned Features */}
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">Planned Features</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-300">
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
