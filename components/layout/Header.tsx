import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Honda Jazz 2018 - Listing kedaluwarsa",
      time: "5 menit yang lalu",
      read: false,
    },
    {
      id: 2,
      title: "Toyota Avanza 2019 - Pembayaran dikonfirmasi",
      time: "1 jam yang lalu",
      read: false,
    },
    {
      id: 3,
      title: "Suzuki Ertiga - Mobil ditambahkan ke wishlist",
      time: "3 jam yang lalu",
      read: true,
    },
  ]);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewAllNotifications = () => {
    setNotificationOpen(false);
    navigate("/notifications");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-800">
            Dashboard Admin
          </h1>
        </div>

        <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 flex-1 max-w-lg mx-6">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Cari mobil, transaksi, atau pengguna..."
            className="bg-transparent border-none focus:outline-none w-full px-2 text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-2 rounded-full hover:bg-gray-100 relative transition-all duration-300"
            >
              <Bell size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-otto-red w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-fade-in">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifikasi</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-white bg-otto-blue px-2 py-0.5 rounded-full">
                        {unreadCount} Baru
                      </span>
                    )}
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada notifikasi
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-gray-200 text-center">
                  <button
                    className="text-sm text-otto-blue hover:underline"
                    onClick={handleViewAllNotifications}
                  >
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
