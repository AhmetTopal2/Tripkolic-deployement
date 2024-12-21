'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Login from '@/components/Login';
import { FilterValues } from '@/components/FilterPopup';

const defaultFilters: FilterValues = {
  priceRange: [0, 10000],
  startTime: ['00:00', '23:59'],
  groupSize: [1, 50],
  vehicle: [],
  features: [],
  theme: [],
  activities: []
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('tours');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setIsMenuOpen(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showLogin ? (
        <>
          <button
            onClick={handleLoginClose}
            className="fixed top-4 left-4 p-2 text-gray-600 hover:text-primary-500 z-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <Login onLoginSuccess={handleLoginSuccess} />
        </>
      ) : (
        <>
          <Navbar 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            setShowLogin={setShowLogin}
            isLoggedIn={isLoggedIn}
            onApplyFilters={handleApplyFilters}
          />
          <main className="px-4 py-6 mt-16">
            <ProductGrid 
              category={selectedCategory}
              filters={filters}
            />
          </main>
        </>
      )}
    </div>
  );
}
