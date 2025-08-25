import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="max-w-3xl mx-auto text-center mt-20">
      <h1 className="text-4xl font-bold text-gray-800">
        Optimize Your Resume with AI
      </h1>
      <p className="mt-4 text-gray-600">
        Upload your CV, match it with a job description, and get tailored
        suggestions to improve your chances of landing interviews.
      </p>
      <Link
        to="/upload"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
      >
        Get Started
      </Link>
    </div>
  );
}
