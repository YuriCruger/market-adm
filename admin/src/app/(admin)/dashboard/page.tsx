import { ProductsDashboard } from "./components/productsDashboard";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className="container py-10">
      <ProductsDashboard />
    </div>
  );
}
