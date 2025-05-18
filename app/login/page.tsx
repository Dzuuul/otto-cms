import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      // This is just for demo purposes, replace with actual authentication
      if (email.includes("@") && password.length > 3) {
        toast.success("Login berhasil!");
        navigate("/");
      } else {
        toast.error("Email atau password tidak valid");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Login image section */}
      <div className="hidden md:flex md:w-1/2 bg-menu-gradient items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-indigo-700/80 z-10"></div>
        <div className="absolute w-full h-full">
          <img
            src="/placeholder.svg"
            alt="Car dealership"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative z-20 text-center p-8">
          <Car size={80} className="text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Otto Fikri Wheels
          </h2>
          <p className="text-white/80 text-xl max-w-md mx-auto">
            Sistem manajemen kendaraan terpadu untuk mengelola inventaris mobil
            dan transaksi dengan mudah
          </p>
        </div>
      </div>

      {/* Login form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center md:hidden mb-4">
              <Car size={40} className="text-otto-blue mr-2" />
              <h2 className="text-2xl font-bold">Otto Fikri</h2>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Selamat Datang Kembali
            </h1>
            <p className="text-gray-500 mt-2">
              Masuk ke akun Anda untuk mengelola Otto Fikri Wheels
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@ottofikri.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-6"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-otto-blue hover:underline">
                  Lupa Password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-6"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Ingat Saya
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-otto-blue hover:bg-otto-blue/90 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Otto Fikri Wheels. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
