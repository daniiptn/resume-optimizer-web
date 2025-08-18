import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState<string>("loading...");

  useEffect(() => {
    fetch("https://resume-optimizer-api-production.up.railway.app/health")
      .then((res) => res.json())
      .then((data) => setStatus(JSON.stringify(data)))
      .catch((err) => setStatus("Error: " + err.message));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Resume Optimizer Web</h1>
      <p>Backend health: {status}</p>
    </div>
  );
}

export default App;
