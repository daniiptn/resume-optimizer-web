import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center mt-24 bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-800">Page not found</h1>
      <p className="mt-3 text-gray-600">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go Home
        </Link>
        <Link
          to="/upload"
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Upload a CV
        </Link>
      </div>
    </div>
  );
}
