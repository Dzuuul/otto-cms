import { useState } from "react";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const [companyInfo, setCompanyInfo] = useState({
    name: "Otto Fikri",
    tagline: "Platform Jual Beli Mobil Bekas Terpercaya",
    address: "Jl. Ahmad Yani No. 123, Jakarta Selatan",
    phone: "(021) 1234-5678",
    email: "info@ottofikri.com",
    website: "www.ottofikri.com",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true,
  });

  const handleCompanyInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveCompanyInfo = () => {
    toast({
      title: "Berhasil Disimpan",
      description: "Informasi perusahaan telah diperbarui.",
    });
  };

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Preferensi notifikasi telah diperbarui.",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="company">Informasi Perusahaan</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="users">Pengguna & Hak Akses</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Perusahaan</CardTitle>
                <CardDescription>
                  Kelola informasi dasar perusahaan yang akan ditampilkan kepada
                  pelanggan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Perusahaan</Label>
                      <Input
                        id="name"
                        name="name"
                        value={companyInfo.name}
                        onChange={handleCompanyInfoChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        name="tagline"
                        value={companyInfo.tagline}
                        onChange={handleCompanyInfoChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={companyInfo.address}
                      onChange={handleCompanyInfoChange}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={companyInfo.phone}
                        onChange={handleCompanyInfoChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={companyInfo.email}
                        onChange={handleCompanyInfoChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={companyInfo.website}
                        onChange={handleCompanyInfoChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      className="bg-otto-blue hover:bg-otto-blue/90"
                      onClick={handleSaveCompanyInfo}
                    >
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>
                  Sesuaikan preferensi notifikasi dan laporan untuk sistem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifikasi Email</h3>
                        <p className="text-sm text-gray-500">
                          Terima pemberitahuan via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailAlerts}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("emailAlerts", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifikasi Push</h3>
                        <p className="text-sm text-gray-500">
                          Terima notifikasi langsung di browser
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("pushNotifications", checked)
                        }
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="font-medium mb-4">Laporan Berkala</h3>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Laporan Harian</p>
                          </div>
                          <Switch
                            checked={notifications.dailyReports}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("dailyReports", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Laporan Mingguan</p>
                          </div>
                          <Switch
                            checked={notifications.weeklyReports}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("weeklyReports", checked)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Laporan Bulanan</p>
                          </div>
                          <Switch
                            checked={notifications.monthlyReports}
                            onCheckedChange={(checked) =>
                              handleNotificationChange(
                                "monthlyReports",
                                checked
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      className="bg-otto-blue hover:bg-otto-blue/90"
                      onClick={handleSaveNotificationSettings}
                    >
                      Simpan Pengaturan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Pengguna & Hak Akses</CardTitle>
                <CardDescription>
                  Kelola akun dan izin akses untuk pengguna CMS.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">
                      Pengaturan pengguna dan hak akses tersedia di modul
                      Manajemen Pengguna.
                    </p>
                    <Button className="bg-otto-blue hover:bg-otto-blue/90">
                      Buka Manajemen Pengguna
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Keamanan</CardTitle>
                <CardDescription>
                  Pengaturan keamanan dan autentikasi untuk akun Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Ubah Password</h3>
                    <p className="text-sm text-gray-500">
                      Disarankan untuk mengganti password secara berkala.
                    </p>
                    <div className="pt-2 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="current-password">
                          Password Saat Ini
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new-password">Password Baru</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirm-password">
                          Konfirmasi Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-medium mb-3">Verifikasi Dua Faktor</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">
                          Aktifkan Verifikasi Dua Faktor
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Tingkatkan keamanan akun dengan autentikasi dua
                          faktor.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      className="bg-otto-blue hover:bg-otto-blue/90"
                      onClick={() =>
                        toast({
                          title: "Pengaturan Disimpan",
                          description: "Pengaturan keamanan telah diperbarui.",
                        })
                      }
                    >
                      Simpan Pengaturan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
