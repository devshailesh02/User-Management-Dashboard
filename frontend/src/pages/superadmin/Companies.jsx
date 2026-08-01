import { useState } from "react";
import CompanyFilters from "../../components/superadmin/CompanyFilters";
import CompaniesTable from "../../components/superadmin/CompaniesTable";
import Pagination from "../../components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getCompanyList } from "../../api/company.api";
import { useSearchParams } from "react-router-dom";

export const Companies = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanyList(searchParam),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <CompanyFilters />
      <CompaniesTable companies={companies} />
      <Pagination
      // currentPage={pagination.page}
      // totalPages={pagination.totalPages}
      // total={pagination.total}
      // limit={pagination.limit}
      />

      {/* Company Table */}
    </>
  );
};
