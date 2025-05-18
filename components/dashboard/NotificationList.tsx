import { Clock, AlertCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Toyota Avanza 2019",
    status: "Listing tidak diperbarui selama 30 hari",
    time: "2 hari yang lalu",
    urgent: true,
  },
  {
    id: 2,
    title: "Honda Jazz 2018",
    status: "Menunggu verifikasi foto",
    time: "3 hari yang lalu",
    urgent: false,
  },
  {
    id: 3,
    title: "Suzuki Ertiga 2020",
    status: "Harga di bawah rata-rata pasar",
    time: "5 hari yang lalu",
    urgent: false,
  },
];

const NotificationList = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Notifikasi Listing
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-5 flex items-center gap-4 hover:bg-gray-50 ${
                notification.urgent ? "border-l-4 border-otto-orange" : ""
              }`}
            >
              <div
                className={`rounded-full p-2 ${
                  notification.urgent
                    ? "bg-otto-orange/10 text-otto-orange"
                    : "bg-otto-blue-light/10 text-otto-blue-light"
                }`}
              >
                {notification.urgent ? (
                  <AlertCircle size={18} />
                ) : (
                  <Clock size={18} />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.status}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
              </div>
              <button className="text-sm text-otto-blue hover:underline">
                Tinjau
              </button>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            Tidak ada notifikasi
          </div>
        )}
      </div>
      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm text-otto-blue hover:underline">
            Lihat semua notifikasi
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
