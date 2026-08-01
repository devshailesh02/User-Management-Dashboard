import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCompanyDetail } from "../../api/company.api";

const statusClasses = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  inactive: "bg-gray-100 text-gray-700",
  suspended: "bg-red-100 text-red-700",
};

const DetailRow = ({ label, value }) => (
  <div className="border-b py-4 last:border-b-0">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 font-medium text-gray-900">{value || "-"}</p>
  </div>
);

const CompanyDetailsSkeleton = () => (
  <div className="animate-pulse space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-7 w-48 rounded bg-gray-200"></div>
        <div className="h-4 w-64 rounded bg-gray-200"></div>
      </div>

      <div className="h-8 w-24 rounded-full bg-gray-200"></div>
    </div>

    {/* Company Details */}
    <div className="rounded-lg border bg-white px-5">
      {[...Array(7)].map((_, index) => (
        <div key={index} className="border-b py-4 last:border-b-0">
          <div className="mb-2 h-3 w-24 rounded bg-gray-200"></div>
          <div className="h-5 w-48 rounded bg-gray-200"></div>
        </div>
      ))}
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-4">
      {[1, 2].map((item) => (
        <div key={item} className="rounded-lg border bg-gray-50 p-4">
          <div className="mb-3 h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-8 w-16 rounded bg-gray-200"></div>
        </div>
      ))}
    </div>

    {/* Description */}
    <div>
      <div className="mb-3 h-6 w-36 rounded bg-gray-200"></div>

      <div className="space-y-2 rounded-lg border bg-gray-50 p-4">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        <div className="h-4 w-4/6 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
);

const CompanyDetails = ({ company_id }) => {
  const {
    data: company,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["company-detail", company_id],
    queryFn: () => getCompanyDetail(company_id),
    enabled: !!company_id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <CompanyDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center text-red-600">
        Failed to load company details.
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-500">
        Company not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{company.name}</h2>

          <p className="text-sm text-gray-500">{company.email}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
            statusClasses[company.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {company.status}
        </span>
      </div>

      {/* Company Information */}
      <div className="rounded-lg border bg-white px-5">
        <DetailRow label="Company ID" value={company.id} />
        <DetailRow label="Company Name" value={company.name} />
        <DetailRow label="Email" value={company.email} />
        <DetailRow label="Role" value={company.role} />
        <DetailRow label="Status" value={company.status} />
        <DetailRow
          label="Registered On"
          value={new Date(company.createdAt).toLocaleString()}
        />
        <DetailRow
          label="Last Updated"
          value={new Date(company.updatedAt).toLocaleString()}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Employees</p>

          <p className="mt-2 text-2xl font-bold">
            {company.employeeCount ?? 0}
          </p>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Departments</p>

          <p className="mt-2 text-2xl font-bold">
            {company.departmentCount ?? 0}
          </p>
        </div>
      </div>

      {/* Description */}
      {company.description && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">Description</h3>

          <div className="rounded-lg border bg-gray-50 p-4 text-gray-700">
            {company.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
