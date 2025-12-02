export default function AdminDashboard() {
  const stats = [
    { label: "Total Posts", value: 128, color: "bg-red-600" },
    { label: "Categories", value: 12, color: "bg-blue-600" },
    { label: "Users", value: 342, color: "bg-green-600" },
    { label: "Drafts", value: 8, color: "bg-gray-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
            <div className={`h-1 w-full mt-4 rounded ${stat.color}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
