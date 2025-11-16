"use client";

import TopBar from "../../../components/customer/menu/TopBar";
import HeroSection from "../../../components/customer/menu/HeroSection";
import SearchBar from "../../../components/customer/menu/SearchBar";
import CategoryList from "../../../components/customer/menu/CategoryList";
import MenuList from "../../../components/customer/menu/MenuList";
import Footer from "../../../components/customer/menu/Footer";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Top Bar */}
      <TopBar />

      {/* Hero Banner */}
      <HeroSection />

      {/* Search */}
      <div className="px-4 mt-4">
        <SearchBar />
      </div>

      {/* Category */}
      <div className="px-4 mt-2">
        <CategoryList />
      </div>

      {/* Menu */}
      <div className="px-4 mt-4 pb-20">
        <MenuList />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
