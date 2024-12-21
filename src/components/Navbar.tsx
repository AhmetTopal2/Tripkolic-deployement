import Image from 'next/image';
import FilterPopup from './FilterPopup';
import { FilterValues } from './FilterPopup';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setShowLogin: (show: boolean) => void;
  isLoggedIn: boolean;
  onApplyFilters: (filters: FilterValues) => void;
}

const Navbar = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  selectedCategory, 
  setSelectedCategory, 
  setShowLogin, 
  isLoggedIn,
  onApplyFilters 
}: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="relative w-[100px] h-[40px]">
          <Image 
            src="/logo.svg" 
            alt="TripKolic" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <div className="flex items-center gap-4">
          {!isLoggedIn && (
            <button
              onClick={() => setShowLogin?.(true)}
              className="text-sm text-primary-500 hover:text-primary-600"
            >
              Login / Register
            </button>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black hover:text-primary-500"
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
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <FilterPopup
          category={selectedCategory}
          onClose={() => setIsMenuOpen(false)}
          onApplyFilters={onApplyFilters}
          onCategoryChange={setSelectedCategory}
        />
      )}
    </nav>
  );
};

export default Navbar; 