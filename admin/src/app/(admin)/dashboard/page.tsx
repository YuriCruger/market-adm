import { DashboardContent } from "./components/dashboardContent";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className="container py-10">
      <DashboardContent />
    </div>
  );
}
