import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ahmad Rasyid",
    avatar: "",
    rating: 5,
    date: "10 Mei 2023",
    car: "Toyota Avanza 2019",
    content:
      "Pelayanan cepat dan mobil dalam kondisi sangat baik seperti yang dijelaskan di listing.",
  },
  {
    id: 2,
    name: "Siti Nuraini",
    avatar: "",
    rating: 4,
    date: "5 Mei 2023",
    car: "Honda Jazz 2018",
    content:
      "Proses pembayaran mudah, namun pengiriman sedikit terlambat dari jadwal.",
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "",
    rating: 5,
    date: "1 Mei 2023",
    car: "Suzuki Ertiga 2020",
    content:
      "Sangat puas dengan layanan dan kondisi mobil. Akan merekomendasikan ke teman-teman.",
  },
];

const RecentReviews = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Review Pelanggan Terbaru
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {reviews.map((review) => (
          <div key={review.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-otto-blue-light/20 flex items-center justify-center text-otto-blue font-medium">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.car}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">{review.date}</div>
            </div>
            <div className="mt-2 flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "#f97316" : "none"}
                    stroke={i < review.rating ? "#f97316" : "#94a3b8"}
                    className="mr-1"
                  />
                ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">{review.content}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100 text-center">
        <button className="text-sm text-otto-blue hover:underline">
          Lihat semua review
        </button>
      </div>
    </div>
  );
};

export default RecentReviews;
