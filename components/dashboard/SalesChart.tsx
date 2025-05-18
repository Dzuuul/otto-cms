import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", penjualan: 65 },
  { month: "Feb", penjualan: 59 },
  { month: "Mar", penjualan: 80 },
  { month: "Apr", penjualan: 81 },
  { month: "Mei", penjualan: 56 },
  { month: "Jun", penjualan: 55 },
  { month: "Jul", penjualan: 40 },
  { month: "Agu", penjualan: 70 },
  { month: "Sep", penjualan: 90 },
  { month: "Okt", penjualan: 75 },
  { month: "Nov", penjualan: 85 },
  { month: "Des", penjualan: 95 },
];

const SalesChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Grafik Penjualan Mobil
      </h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="penjualan"
              name="Jumlah Penjualan"
              stroke="#1e3a8a"
              strokeWidth={2.5}
              activeDot={{ r: 8, fill: "#1e3a8a" }}
              dot={{ r: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
