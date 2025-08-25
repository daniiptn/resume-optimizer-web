import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          ResumeOptimizer
        </Link>

        {/* Right: Links */}
        <div className="space-x-6">
          <Link to="/upload" className="text-gray-700 hover:text-blue-600">
            Upload
          </Link>
          <Link to="/account" className="text-gray-700 hover:text-blue-600">
            Account
          </Link>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
