import { useState } from "react";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Eye, Check, FileText, Search } from "lucide-react";
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
  DialogDescription,
} from "@/components/ui/dialog";

const transactions = [
  {
    id: "TRX-00123",
    customer: "Ahmad Rasyid",
    car: "Toyota Avanza 2019",
    price: 180000000,
    date: "2023-05-10",
    status: "success",
    receipt: "bukti-tf-00123.jpg",
  },
  {
    id: "TRX-00124",
    customer: "Siti Nuraini",
    car: "Honda Jazz 2018",
    price: 175000000,
    date: "2023-05-05",
    status: "pending",
    receipt: "bukti-tf-00124.jpg",
  },
  {
    id: "TRX-00125",
    customer: "Budi Santoso",
    car: "Suzuki Ertiga 2020",
    price: 195000000,
    date: "2023-05-01",
    status: "pending",
    receipt: "bukti-tf-00125.jpg",
  },
  {
    id: "TRX-00126",
    customer: "Diana Putri",
    car: "Toyota Innova 2017",
    price: 210000000,
    date: "2023-04-28",
    status: "success",
    receipt: "bukti-tf-00126.jpg",
  },
  {
    id: "TRX-00127",
    customer: "Rudi Hermawan",
    car: "Daihatsu Xenia 2019",
    price: 165000000,
    date: "2023-04-25",
    status: "failed",
    receipt: "bukti-tf-00127.jpg",
  },
];

const statusLabels = {
  pending: "Menunggu",
  success: "Berhasil",
  failed: "Gagal",
};

const statusClassNames = {
  pending: "status-pending",
  success: "status-success",
  failed: "status-failed",
};

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.car.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const showReceipt = (transaction: any) => {
    setSelectedTransaction(transaction);
    setReceiptDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Transaksi</h1>
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              Filter Tanggal
            </Button>
            <Button className="bg-otto-blue hover:bg-otto-blue/90">
              Ekspor Data
            </Button>
          </div>
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
                placeholder="Cari transaksi berdasarkan nama pelanggan, mobil, atau ID..."
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
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Mobil</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.id}
                      </TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.car}</TableCell>
                      <TableCell>{formatPrice(transaction.price)}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>
                        <span
                          className={`status-badge ${
                            statusClassNames[transaction.status]
                          }`}
                        >
                          {statusLabels[transaction.status]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => showReceipt(transaction)}
                          >
                            <FileText size={16} className="text-gray-500" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              /* View transaction details */
                            }}
                          >
                            <Eye size={16} className="text-gray-500" />
                          </Button>
                          {transaction.status === "pending" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                /* Verify transaction */
                              }}
                            >
                              <Check size={16} className="text-gray-500" />
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
                      Tidak ada transaksi yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <div>
              Menampilkan {filteredTransactions.length} dari{" "}
              {transactions.length} transaksi
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

      <Dialog open={receiptDialogOpen} onOpenChange={setReceiptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bukti Pembayaran</DialogTitle>
            <DialogDescription>
              {selectedTransaction && (
                <div className="mt-2">
                  <p>ID Transaksi: {selectedTransaction.id}</p>
                  <p>Pelanggan: {selectedTransaction.customer}</p>
                  <p>Mobil: {selectedTransaction.car}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 bg-gray-100 rounded-md p-4 flex items-center justify-center h-60">
            <div className="text-center">
              <FileText size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                {selectedTransaction && selectedTransaction.receipt}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              className="bg-otto-blue hover:bg-otto-blue/90"
              onClick={() => setReceiptDialogOpen(false)}
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;
