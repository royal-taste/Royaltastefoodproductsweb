import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "@/react-app/components/Navbar";
import Footer from "@/react-app/components/Footer";
import ScrollToTop from "@/react-app/components/ScrollToTop";
import { CartProvider } from "@/react-app/contexts/CartContext";
import HomePage from "@/react-app/pages/Home";
import AboutPage from "@/react-app/pages/About";
import ProductsPage from "@/react-app/pages/Products";
import ContactPage from "@/react-app/pages/Contact";
import CartPage from "@/react-app/pages/Cart";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </CartProvider>
  );
}
