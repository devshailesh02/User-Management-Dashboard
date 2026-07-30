import CompanyGrowthChart from "../../components/superadmin/CompanyGrowthChart";
import StatCards from "../../components/superadmin/StatCards";

const Dashboard = () => {
  const stats = {
    total: 120,
    active: 96,
    pending: 12,
    suspended: 12,
    employees: 2450,
  };
  const data = [
    { label: "Jan", total: 12 },
    { label: "Feb", total: 18 },
    { label: "Mar", total: 25 },
    { label: "Apr", total: 31 },
    { label: "May", total: 40 },
    { label: "Jun", total: 48 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <StatCards stats={stats} />
      <CompanyGrowthChart data={data} />
    </div>
  );
};

export default Dashboard;
