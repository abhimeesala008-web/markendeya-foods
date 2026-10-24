import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import CartPage from "@/pages/Cart";

export default function App() {
  return (
    <CartProvider>
      <div className="flex min-h-svh flex-col bg-[#FFFDF9]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </CartProvider>
  );
}
