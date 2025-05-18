import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  Plus,
  Car,
  BarChart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Daftar Mobil",
    icon: List,
    path: "/cars",
  },
  {
    title: "Tambah Mobil",
    icon: Plus,
    path: "/add-car",
  },
  {
    title: "Transaksi",
    icon: Car,
    path: "/transactions",
  },
  {
    title: "Pengguna",
    icon: Users,
    path: "/users",
  },
  {
    title: "Notifikasi",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Statistik",
    icon: BarChart,
    path: "/statistics",
  },
  {
    title: "Pengaturan",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Anda telah berhasil keluar");
    navigate("/login");
  };

  return (
    <div
      className={`bg-sidebar h-screen transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between py-6 px-4 border-b border-sidebar-border">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center w-full" : ""
          }`}
        >
          {!collapsed && (
            <h1 className="text-white font-bold text-xl">Otto Fikri</h1>
          )}
          {collapsed && <Car className="text-white" size={24} />}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white p-1 rounded hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 py-8 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `menu-item flex items-center gap-3 px-4 py-3 rounded-md ${
                isActive
                  ? "menu-item-active"
                  : "text-gray-300 hover:bg-sidebar-accent/60 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            A
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-gray-300 text-xs">admin@ottofikri.com</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-sidebar-accent/60 text-gray-300 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
        {collapsed && (
          <button
            onClick={handleLogout}
            className="mt-3 p-2 w-full flex justify-center rounded-full hover:bg-sidebar-accent/60 text-gray-300 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
