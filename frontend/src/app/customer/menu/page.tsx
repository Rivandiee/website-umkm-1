// frontend/src/app/customer/menu/page.tsx
"use client";

import { useEffect, useState } from "react";
import TopBar from "../../../components/customer/menu/TopBar";
import HeroSection from "../../../components/customer/menu/HeroSection";
import SearchBar from "../../../components/customer/menu/SearchBar";
import CategoryList from "../../../components/customer/menu/CategoryList";
import MenuList from "../../../components/customer/menu/MenuList";
import Footer from "../../../components/customer/menu/Footer";
import Cart from "../../../components/customer/menu/Cart";
import { CartItemType } from "../../../components/customer/cart/CartItemsList";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<{id:string;name:string}[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);


// di page.tsx
useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/categories`)
    .then(res => res.json())
    .then(res => {
      setCategories(res.data); // backend kamu wrap di .data
      setLoadingCategories(false);
    })
    .catch(err => console.error(err));
}, []);

  const handleAddToCart = (item: any) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <TopBar cartCount={cartCount} onCartClick={() => setShowCart(true)} />

      {/* Hero Banner */}
      <HeroSection />

      {/* Search */}
      <div className="px-4 mt-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Category */}
      <div className="px-4 mt-2">
        <CategoryList
        categories={categories}
        isLoading={loadingCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Menu */}
      <div className="px-4 mt-4 pb-20">
        <MenuList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Cart Sidebar */}
      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        showCart={showCart}
        setShowCart={setShowCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
