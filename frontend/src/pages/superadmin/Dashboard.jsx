import StatCards from "../../components/superadmin/StatCards";

const Dashboard = () => {
  const stats = {
    total: 120,
    active: 96,
    pending: 12,
    suspended: 12,
    employees: 2450,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <StatCards stats={stats} />
    </div>
  );
};

export default Dashboard;
