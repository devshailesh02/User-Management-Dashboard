import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateFormator";
import CompanyDetails from "./CompanyDetails";
import Drawer from "../common/Drawer";
import { upadateCompanyStatus } from "../../api/company.api";
import { useQueryClient } from "@tanstack/react-query";

const statusClasses = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  inactive: "bg-gray-100 text-gray-700",
  suspended: "bg-red-100 text-red-700",
};

const CompaniesTable = ({ companies = [] }) => {
  const queryClient = useQueryClient();
  const [company_id, setComapny_id] = useState("");
  const handleUpdate = async (status, id) => {
    try {
      await upadateCompanyStatus(status, id);
      queryClient.invalidateQueries(["companies"]);
    } catch (error) {}
  };

  return (
    <>
      <div className="rounded-lg  bg-white shadow-sm my-5">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm font-semibold text-gray-700">
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            {companies.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No companies found.
              </div>
            ) : (
              <>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {company.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {company.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            statusClasses[company.status]
                          }`}
                        >
                          {company.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {formatDate(company.createdAt)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span
                          onClick={() => setComapny_id(company.id)}
                          className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
                            company.status === "pending"
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {company.status === "pending" ? "Review" : "View"}
                        </span>
                        <select
                          value={company.status}
                          onChange={(e) =>
                            handleUpdate(e.target.value, company.id)
                          }
                        >
                          <option value="active">Activate</option>
                          <option value="inactive">Deactivate</option>
                          <option value="suspended">Suspend</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 p-4 md:hidden">
          {companies.map((company) => (
            <div key={company.id} className="rounded-lg border p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{company.name}</h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    statusClasses[company.status]
                  }`}
                >
                  {company.status}
                </span>
              </div>

              <p className="mt-2 break-all text-sm text-gray-600">
                {company.email}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Created: {company.createdAt}
              </p>

              <span
                onClick={() => setComapny_id(company.id)}
                className={`mt-4 inline-block rounded-lg px-4 py-2 text-sm font-medium text-white ${
                  company.status === "pending"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {company.status === "pending"
                  ? "Review Company"
                  : "View Details"}
              </span>
            </div>
          ))}
        </div>
      </div>

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
};

export default CompaniesTable;
