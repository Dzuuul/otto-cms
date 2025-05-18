import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import Header from "@/components/layout/Header";

const AddCar = () => {
  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    year: "",
    price: "",
    engine: "",
    transmission: "",
    color: "",
    status: "available",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setImages([...images, ...newImages]);

    // Create previews
    const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Car Data:", carData);
    console.log("Images:", images);
    // Here you would typically send the data to your backend API
  };

  const carBrands = [
    "Toyota",
    "Honda",
    "Suzuki",
    "Daihatsu",
    "Nissan",
    "Mitsubishi",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Hyundai",
    "Kia",
  ];

  const carYears = Array.from({ length: 11 }, (_, i) => 2023 - i);

  const transmissionTypes = ["Manual", "Otomatis", "CVT"];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Tambah Mobil Baru
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <Card className="col-span-1 lg:col-span-4">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nama Mobil</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Contoh: Toyota Avanza G 2019"
                      value={carData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brand">Merek</Label>
                      <Select
                        value={carData.brand}
                        onValueChange={(value) =>
                          handleSelectChange("brand", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih merek mobil" />
                        </SelectTrigger>
                        <SelectContent>
                          {carBrands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="year">Tahun</Label>
                      <Select
                        value={carData.year}
                        onValueChange={(value) =>
                          handleSelectChange("year", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tahun" />
                        </SelectTrigger>
                        <SelectContent>
                          {carYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price">Harga (Rp)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Contoh: 180000000"
                      value={carData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="engine">Mesin</Label>
                      <Input
                        id="engine"
                        name="engine"
                        placeholder="Contoh: 1.5L VVT-i"
                        value={carData.engine}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="transmission">Transmisi</Label>
                      <Select
                        value={carData.transmission}
                        onValueChange={(value) =>
                          handleSelectChange("transmission", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih transmisi" />
                        </SelectTrigger>
                        <SelectContent>
                          {transmissionTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="color">Warna</Label>
                      <Input
                        id="color"
                        name="color"
                        placeholder="Contoh: Putih Metalik"
                        value={carData.color}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={carData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Tersedia</SelectItem>
                        <SelectItem value="sold">Terjual</SelectItem>
                        <SelectItem value="archived">Diarsipkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      placeholder="Masukkan deskripsi mobil..."
                      value={carData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label>Foto Mobil</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="car-images"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="car-images"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          Klik untuk upload foto
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          PNG, JPG, atau WEBP (max. 5MB)
                        </span>
                      </label>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {imagePreviewUrls.map((url, index) => (
                        <div
                          key={index}
                          className="relative aspect-square bg-gray-100 rounded overflow-hidden"
                        >
                          <img
                            src={url}
                            alt={`Car preview ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            onClick={() => {
                              const newImages = [...images];
                              const newUrls = [...imagePreviewUrls];
                              newImages.splice(index, 1);
                              newUrls.splice(index, 1);
                              setImages(newImages);
                              setImagePreviewUrls(newUrls);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">Batal</Button>
            <Button
              type="submit"
              className="bg-otto-blue hover:bg-otto-blue/90"
            >
              Simpan Mobil
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
