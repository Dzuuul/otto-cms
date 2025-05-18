import { useState } from "react";
import Header from "../components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, UserX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Type definitions
type UserRole = "customer" | "admin" | "customer_support";
type UserStatus = "active" | "inactive";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  registrationDate: string;
  lastLogin: string;
}

// User data
const users: User[] = [
  {
    id: 1,
    name: "Ahmad Rasyid",
    email: "ahmad@email.com",
    role: "customer",
    status: "active",
    registrationDate: "2023-01-10",
    lastLogin: "2023-05-10",
  },
  {
    id: 2,
    name: "Siti Nuraini",
    email: "siti@email.com",
    role: "customer",
    status: "active",
    registrationDate: "2023-02-15",
    lastLogin: "2023-05-08",
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi@email.com",
    role: "customer",
    status: "inactive",
    registrationDate: "2023-03-01",
    lastLogin: "2023-04-20",
  },
  {
    id: 4,
    name: "Diana Putri",
    email: "diana@email.com",
    role: "admin",
    status: "active",
    registrationDate: "2022-10-05",
    lastLogin: "2023-05-11",
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    email: "rudi@email.com",
    role: "customer_support",
    status: "active",
    registrationDate: "2023-01-20",
    lastLogin: "2023-05-09",
  },
];

const roleLabels: Record<UserRole, string> = {
  customer: "Pelanggan",
  admin: "Admin",
  customer_support: "Customer Support",
};

const statusLabels: Record<UserStatus, string> = {
  active: "Aktif",
  inactive: "Tidak Aktif",
};

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const openEmailDialog = (user: User) => {
    setSelectedUser(user);
    setEmailDialogOpen(true);
  };

  const openSuspendDialog = (user: User) => {
    setSelectedUser(user);
    setSuspendDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Pengguna
          </h1>
          <Button className="mt-3 md:mt-0 bg-otto-blue hover:bg-otto-blue/90">
            Tambah Pengguna
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <Input
                type="text"
                placeholder="Cari berdasarkan nama atau email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Registrasi</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-otto-blue-light/20 flex items-center justify-center text-otto-blue font-medium">
                            {user.name.charAt(0)}
                          </div>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{roleLabels[user.role]}</TableCell>
                      <TableCell>
                        <span
                          className={`status-badge ${
                            user.status === "active"
                              ? "status-available"
                              : "status-archived"
                          }`}
                        >
                          {statusLabels[user.status]}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.registrationDate)}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEmailDialog(user)}
                          >
                            <Mail size={16} className="text-gray-500" />
                          </Button>
                          {user.status === "active" &&
                            user.role !== "admin" && (
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => openSuspendDialog(user)}
                              >
                                <UserX size={16} className="text-gray-500" />
                              </Button>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      Tidak ada pengguna yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <div>
              Menampilkan {filteredUsers.length} dari {users.length} pengguna
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kirim Email</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="recipient">Penerima</Label>
                <Input id="recipient" value={selectedUser.email} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subjek</Label>
                <Input id="subject" placeholder="Masukkan subjek email..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tulis pesan email di sini..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Batal
            </Button>
            <Button className="bg-otto-blue hover:bg-otto-blue/90">
              Kirim Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Pengguna</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-2">
              <p>
                Anda yakin ingin menangguhkan akun untuk{" "}
                <span className="font-semibold">{selectedUser.name}</span> (
                {selectedUser.email})?
              </p>
              <p className="text-sm text-gray-500">
                Pengguna tidak akan dapat masuk ke akun mereka sampai status
                mereka diaktifkan kembali.
              </p>
              <div className="space-y-2">
                <Label htmlFor="suspend-reason">Alasan</Label>
                <Textarea
                  id="suspend-reason"
                  rows={4}
                  placeholder="Masukkan alasan penangguhan akun..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSuspendDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                /* Handle suspend user */
                setSuspendDialogOpen(false);
              }}
            >
              Suspend Akun
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
