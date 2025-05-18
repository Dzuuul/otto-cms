import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import { Search, Filter, Edit, Eye, Trash2, Car, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const cars = [
  {
    id: 1,
    name: "Toyota Avanza",
    brand: "Toyota",
    year: 2019,
    price: 180000000,
    status: "available",
    thumbnail: "",
  },
  {
    id: 2,
    name: "Honda Jazz",
    brand: "Honda",
    year: 2018,
    price: 175000000,
    status: "sold",
    thumbnail: "",
  },
  {
    id: 3,
    name: "Suzuki Ertiga",
    brand: "Suzuki",
    year: 2020,
    price: 195000000,
    status: "available",
    thumbnail: "",
  },
  {
    id: 4,
    name: "Toyota Innova",
    brand: "Toyota",
    year: 2017,
    price: 210000000,
    status: "archived",
    thumbnail: "",
  },
  {
    id: 5,
    name: "Daihatsu Xenia",
    brand: "Daihatsu",
    year: 2019,
    price: 165000000,
    status: "available",
    thumbnail: "",
  },
];

const statusLabels = {
  available: "Tersedia",
  sold: "Terjual",
  archived: "Diarsipkan",
};

const statusClassNames = {
  available: "status-available",
  sold: "status-sold",
  archived: "status-archived",
};

const CarsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredCars = cars.filter((car) => {
    return (
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterYear ? car.year === parseInt(filterYear) : true) &&
      (filterPrice
        ? filterPrice === "low"
          ? car.price < 180000000
          : car.price >= 180000000
        : true) &&
      (filterStatus ? car.status === filterStatus : true)
    );
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Mobil</h1>
          <Button
            asChild
            className="mt-3 md:mt-0 bg-otto-blue hover:bg-otto-blue/90"
          >
            <Link to="/add-car" className="flex items-center gap-2">
              <Plus size={16} />
              Tambah Mobil Baru
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <Input
                  type="text"
                  placeholder="Cari nama mobil..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <h3 className="font-medium mb-2">Tahun</h3>
                    <select
                      className="w-full border rounded p-1.5 mb-3 text-sm"
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                    >
                      <option value="">Semua Tahun</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                    </select>

                    <h3 className="font-medium mb-2">Harga</h3>
                    <select
                      className="w-full border rounded p-1.5 mb-3 text-sm"
                      value={filterPrice}
                      onChange={(e) => setFilterPrice(e.target.value)}
                    >
                      <option value="">Semua Harga</option>
                      <option value="low">&lt; 180 juta</option>
                      <option value="high">&gt;= 180 juta</option>
                    </select>

                    <h3 className="font-medium mb-2">Status</h3>
                    <select
                      className="w-full border rounded p-1.5 text-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="">Semua Status</option>
                      <option value="available">Tersedia</option>
                      <option value="sold">Terjual</option>
                      <option value="archived">Diarsipkan</option>
                    </select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Foto</TableHead>
                  <TableHead>Nama Mobil</TableHead>
                  <TableHead>Merek</TableHead>
                  <TableHead>Tahun</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.length > 0 ? (
                  filteredCars.map((car, index) => (
                    <TableRow key={car.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="w-12 h-10 bg-gray-200 rounded flex items-center justify-center">
                          <Car size={16} className="text-gray-500" />
                        </div>
                      </TableCell>
                      <TableCell>{car.name}</TableCell>
                      <TableCell>{car.brand}</TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>{formatPrice(car.price)}</TableCell>
                      <TableCell>
                        <span
                          className={`status-badge ${
                            statusClassNames[car.status]
                          }`}
                        >
                          {statusLabels[car.status]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye size={16} className="text-gray-500" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Edit size={16} className="text-gray-500" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 size={16} className="text-gray-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      Tidak ada data mobil yang ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
            <div>
              Menampilkan {filteredCars.length} dari {cars.length} mobil
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
    </div>
  );
};

export default CarsList;
