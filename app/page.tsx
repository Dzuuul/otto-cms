import { Car, TrendingUp, Users } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import RecentReviews from "../components/dashboard/RecentReviews";
import NotificationList from "../components/dashboard/NotificationList";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <StatCard
            title="Total Mobil Aktif"
            value="128"
            change={{ value: "12%", positive: true }}
            icon={<Car size={24} />}
          />
          <StatCard
            title="Mobil Terjual Bulan Ini"
            value="43"
            change={{ value: "8%", positive: true }}
            icon={<TrendingUp size={24} />}
          />
          <StatCard
            title="Pelanggan Aktif"
            value="2,157"
            change={{ value: "5%", positive: true }}
            icon={<Users size={24} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <NotificationList />
          </div>
        </div>

        <div className="mt-6">
          <RecentReviews />
        </div>
      </div>
    </div>
  );
};

export default Index;
