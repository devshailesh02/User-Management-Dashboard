import { useQuery } from "@tanstack/react-query";
import RecentCompanies from "../../components/common/RecentCompanies";
import CompanyGrowthChart from "../../components/superadmin/CompanyGrowthChart";
import StatCards from "../../components/superadmin/StatCards";
import { companyGrowth, getSuperAdminDashboard } from "../../api/company.api";
import { useState } from "react";

const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  const {
    data: growth,
    isLoading: isGrowthLoading,
    isError: isGrowthError,
    error: growthError,
  } = useQuery({
    queryKey: ["growth", year],
    queryFn: () => companyGrowth(year),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    error: dashboardError,
  } = useQuery({
    queryKey: ["super-admin-dashboard"],
    queryFn: getSuperAdminDashboard,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <StatCards stats={data?.stats} />
      <CompanyGrowthChart data={{ growth, year, setYear }} />
      <RecentCompanies companies={data?.recentCompanies} />
    </div>
  );
};

export default Dashboard;
