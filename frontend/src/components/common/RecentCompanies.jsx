import { Link } from "react-router-dom";
import Table from "./Table";

export default function RecentCompanies({ companies }) {
  return (
    <Table
      title="Recent Companies"
      columns={["Company", "Email", "Status", "Created"]}
      action={
        <Link
          to="/super-admin/companies"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All →
        </Link>
      }
      data={companies}
      renderRow={(company) => (
        <tr key={company.id} className="hover:bg-gray-50">
          <td className="whitespace-nowrap px-6 py-4 font-medium">
            {company.name}
          </td>

          <td className="px-6 py-4 text-gray-600">{company.email}</td>

          <td className="px-6 py-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                company.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : company.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {company.status}
            </span>
          </td>

          <td className="whitespace-nowrap px-6 py-4 text-gray-500 white-space-no-wrap">
            {company.createdAt}
          </td>
        </tr>
      )}
    />
  );
}
