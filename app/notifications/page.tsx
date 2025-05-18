import { useState } from "react";
import {
  Bell,
  CheckCircle,
  Clock,
  Filter,
  AlertTriangle,
  Search,
  Trash,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock notification data
const initialNotifications = [
  {
    id: 1,
    title: "Honda Jazz 2018 - Listing kedaluwarsa",
    description: "Listing mobil Honda Jazz 2018 akan kedaluwarsa dalam 2 hari",
    time: "5 menit yang lalu",
    type: "warning",
    read: false,
    category: "listing",
  },
  {
    id: 2,
    title: "Toyota Avanza 2019 - Pembayaran dikonfirmasi",
    description: "Pembayaran untuk Toyota Avanza 2019 telah dikonfirmasi",
    time: "1 jam yang lalu",
    type: "success",
    read: false,
    category: "payment",
  },
  {
    id: 3,
    title: "Suzuki Ertiga - Mobil ditambahkan ke wishlist",
    description:
      "Pengguna aldi@gmail.com menambahkan Suzuki Ertiga ke wishlist",
    time: "3 jam yang lalu",
    type: "info",
    read: true,
    category: "user",
  },
  {
    id: 4,
    title: "Permintaan foto baru - Daihatsu Xenia 2020",
    description: "Admin meminta foto baru untuk listing Daihatsu Xenia 2020",
    time: "5 jam yang lalu",
    type: "warning",
    read: true,
    category: "listing",
  },
  {
    id: 5,
    title: "Penjualan bulan ini meningkat 15%",
    description:
      "Penjualan bulan ini telah meningkat 15% dibandingkan bulan lalu",
    time: "1 hari yang lalu",
    type: "success",
    read: true,
    category: "system",
  },
  {
    id: 6,
    title: "Pembaruan sistem berhasil",
    description: "Sistem telah berhasil diperbarui ke versi terbaru",
    time: "2 hari yang lalu",
    type: "info",
    read: true,
    category: "system",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "unread") return !notification.read && matchesSearch;
    return notification.category === activeFilter && matchesSearch;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("Semua notifikasi telah ditandai sebagai telah dibaca");
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Notifikasi telah dihapus");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.success("Semua notifikasi telah dihapus");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="text-amber-500" size={20} />;
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "info":
        return <Bell className="text-blue-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifikasi</h1>
          <p className="text-gray-500">
            Kelola semua notifikasi Anda dalam satu tempat
          </p>
        </div>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="hidden md:flex"
            >
              <CheckCircle size={16} className="mr-2" />
              Tandai Semua Dibaca
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <Filter size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Notifikasi</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant={activeFilter === "all" ? "default" : "outline"}
                    onClick={() => setActiveFilter("all")}
                  >
                    Semua
                  </Button>
                  <Button
                    variant={activeFilter === "unread" ? "default" : "outline"}
                    onClick={() => setActiveFilter("unread")}
                  >
                    Belum Dibaca
                  </Button>
                  <Button
                    variant={activeFilter === "listing" ? "default" : "outline"}
                    onClick={() => setActiveFilter("listing")}
                  >
                    Listing Mobil
                  </Button>
                  <Button
                    variant={activeFilter === "payment" ? "default" : "outline"}
                    onClick={() => setActiveFilter("payment")}
                  >
                    Pembayaran
                  </Button>
                  <Button
                    variant={activeFilter === "user" ? "default" : "outline"}
                    onClick={() => setActiveFilter("user")}
                  >
                    Aktivitas Pengguna
                  </Button>
                  <Button
                    variant={activeFilter === "system" ? "default" : "outline"}
                    onClick={() => setActiveFilter("system")}
                  >
                    Sistem
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Cari notifikasi..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-4">
          <TabsTrigger value="all" onClick={() => setActiveFilter("all")}>
            Semua
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread" onClick={() => setActiveFilter("unread")}>
            Belum Dibaca
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="listing"
            onClick={() => setActiveFilter("listing")}
          >
            Listing
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            onClick={() => setActiveFilter("payment")}
          >
            Pembayaran
          </TabsTrigger>
          <TabsTrigger
            value="user"
            className="hidden md:block"
            onClick={() => setActiveFilter("user")}
          >
            Pengguna
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="hidden md:block"
            onClick={() => setActiveFilter("system")}
          >
            Sistem
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <CardTitle>Notifikasi Terbaru</CardTitle>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="md:hidden"
              >
                <CheckCircle size={16} className="mr-2" />
                Tandai Dibaca
              </Button>
              <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                <Trash size={16} className="mr-2" />
                Hapus Semua
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center">
              <Bell size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">
                Tidak ada notifikasi
              </h3>
              <p className="text-gray-500 mt-1">
                {searchQuery
                  ? "Tidak ada notifikasi yang cocok dengan pencarian Anda"
                  : "Semua notifikasi Anda akan muncul di sini"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex gap-4 relative hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="p-2 rounded-full bg-gray-100 h-fit">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4
                        className={`font-medium ${
                          !notification.read ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <div className="flex gap-2 items-center ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {notification.time}
                    </div>
                    {!notification.read && (
                      <div className="absolute right-4 top-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
