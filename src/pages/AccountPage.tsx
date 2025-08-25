export default function AccountPage() {
  // 👉 constant at the TOP of the component:
  const dummyCVs = [
    { id: 1, name: "resume_maxim.pdf", uploaded: "2025-08-20" },
    { id: 2, name: "resume_jane.docx", uploaded: "2025-08-22" },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">My Account</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <p className="text-gray-600">
          Stored CVs in your account (dummy data for now):
        </p>

        {/* 👉 list inside the CARD */}
        <ul className="divide-y">
          {dummyCVs.map((cv) => (
            <li key={cv.id} className="py-3 flex items-center justify-between">
              <span className="font-medium text-gray-800">{cv.name}</span>
              <span className="text-gray-500 text-sm">{cv.uploaded}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
