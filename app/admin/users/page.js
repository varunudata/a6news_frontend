export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <table className="w-full bg-white border border-gray-200 rounded-xl shadow">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t text-sm">
            <td className="p-3">Varun</td>
            <td className="p-3">varun@example.com</td>
            <td className="p-3">Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
