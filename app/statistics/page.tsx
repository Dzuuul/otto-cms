import { useState } from "react";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthlySalesData = [
  { month: "Jan", sales: 12, amount: 2160 },
  { month: "Feb", sales: 19, amount: 3420 },
  { month: "Mar", sales: 15, amount: 2700 },
  { month: "Apr", sales: 25, amount: 4500 },
  { month: "Mei", sales: 23, amount: 4140 },
  { month: "Jun", sales: 18, amount: 3240 },
  { month: "Jul", sales: 20, amount: 3600 },
  { month: "Agu", sales: 26, amount: 4680 },
  { month: "Sep", sales: 24, amount: 4320 },
  { month: "Okt", sales: 28, amount: 5040 },
  { month: "Nov", sales: 30, amount: 5400 },
  { month: "Des", sales: 29, amount: 5220 },
];

const carStatusData = [
  { name: "Tersedia", value: 128, color: "#10b981" },
  { name: "Terjual", value: 243, color: "#3b82f6" },
  { name: "Diarsipkan", value: 38, color: "#94a3b8" },
];

const carBrandData = [
  { name: "Toyota", sales: 120 },
  { name: "Honda", sales: 80 },
  { name: "Suzuki", sales: 70 },
  { name: "Daihatsu", sales: 60 },
  { name: "Mitsubishi", sales: 40 },
  { name: "Nissan", sales: 30 },
];

const sellingTimeData = [
  { days: "1-7", cars: 12 },
  { days: "8-14", cars: 18 },
  { days: "15-30", cars: 29 },
  { days: "31-60", cars: 14 },
  { days: "60+", cars: 8 },
];

const Statistics = () => {
  const [timeframe, setTimeframe] = useState("yearly");

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Statistik</h1>
          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <div className="flex">
              <Button
                variant={timeframe === "monthly" ? "default" : "outline"}
                className={timeframe === "monthly" ? "bg-otto-blue" : ""}
                onClick={() => setTimeframe("monthly")}
              >
                Bulanan
              </Button>
              <Button
                variant={timeframe === "yearly" ? "default" : "outline"}
                className={`${
                  timeframe === "yearly" ? "bg-otto-blue" : ""
                } ml-[-1px]`}
                onClick={() => setTimeframe("yearly")}
              >
                Tahunan
              </Button>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              Pilih Periode
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Penjualan</CardTitle>
              <CardDescription>
                {timeframe === "yearly" ? "Tahun 2023" : "30 hari terakhir"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {timeframe === "yearly" ? "269 mobil" : "28 mobil"}
              </div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <span className="text-otto-green mr-1">↑ 12.5%</span> dari
                periode sebelumnya
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Pendapatan</CardTitle>
              <CardDescription>
                {timeframe === "yearly" ? "Tahun 2023" : "30 hari terakhir"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {timeframe === "yearly" ? "Rp48,3 Miliar" : "Rp5,4 Miliar"}
              </div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <span className="text-otto-green mr-1">↑ 8.2%</span> dari
                periode sebelumnya
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Rata-rata Waktu Penjualan
              </CardTitle>
              <CardDescription>Dari listing hingga terjual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18 hari</div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <span className="text-otto-red mr-1">↓ 2.5 hari</span> lebih
                cepat dari periode sebelumnya
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Penjualan Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySalesData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} yAxisId="left" />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      orientation="right"
                      yAxisId="right"
                      hide
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="sales"
                      name="Jumlah Mobil"
                      fill="#1e3a8a"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="amount"
                      name="Total (juta)"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Inventori</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-80 w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={carStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                        name,
                      }) => {
                        const radius = outerRadius + 25;
                        const x =
                          cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y =
                          cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#64748b"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                            fontSize={12}
                          >
                            {name} ({(percent * 100).toFixed(0)}%)
                          </text>
                        );
                      }}
                    >
                      {carStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} mobil`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performa Merek</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={carBrandData}
                    layout="vertical"
                    margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis type="number" axisLine={false} tickLine={false} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="sales"
                      name="Penjualan"
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waktu Penjualan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={sellingTimeData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="days" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line
                      dataKey="cars"
                      name="Jumlah Mobil"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#10b981" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
