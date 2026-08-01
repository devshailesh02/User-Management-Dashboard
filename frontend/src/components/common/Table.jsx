import React from "react";
import { Link } from "react-router-dom";

const Table = ({
  title,
  columns,
  data,
  renderRow,
  action,
  pendingApproval,
}) => {
  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {pendingApproval ? (
          <Link
            to="/super-admin/companies?status=pending"
            className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 transition hover:bg-yellow-200"
          >
            Pending Approval →
          </Link>
        ) : (
          ""
        )}
        {action}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data?.length > 0 ? (
              data.map(renderRow)
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
