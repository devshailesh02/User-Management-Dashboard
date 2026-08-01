import { Link } from "react-router-dom";
import Table from "./Table";
import { formatDate } from "../../utils/dateFormator";
import { useState } from "react";
import Drawer from "./Drawer";
import CompanyDetails from "../superadmin/CompanyDetails";

export default function RecentCompanies({ companies, pendingApproval }) {
  const [company_id, setComapny_id] = useState("");
  return (
    <>
      <Table
        title="Recent Companies"
        columns={["Company", "Email", "Status", "Created", "Action"]}
        pendingApproval={pendingApproval}
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
              {formatDate(company.createdAt)}
            </td>
            <td
              className="whitespace-nowrap px-6 py-4 text-gray-500 white-space-no-wrap"
              onClick={() => setComapny_id(company.id)}
            >
              <span className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline">
                {" "}
                view
              </span>
            </td>
          </tr>
        )}
      />

      <Drawer
        open={!!company_id}
        onClose={() => setComapny_id("")}
        title="Company Details"
        width="w-full sm:w-[500px]"
        position="right"
      >
        <CompanyDetails company_id={company_id} />
      </Drawer>
    </>
  );
}
