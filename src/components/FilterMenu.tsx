import { useState } from 'react';
import FilterPopup, { FilterValues } from './FilterPopup';

interface FilterMenuProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
}

const categories = [
  { id: 'tours', label: 'Tours' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'rent', label: 'Rent' },
  { id: 'transfer', label: 'Transfer' },
];

const FilterMenu = ({ selectedCategory, setSelectedCategory, onClose, onApplyFilters }: FilterMenuProps) => {
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
 
    onApplyFilters({
      priceRange: [0, 10000],
      startTime: ['00:00', '23:59'],
      groupSize: [1, 50],
      vehicle: [],
      features: [],
      theme: [],
      activities: []
    });
    onClose();
  };

  return (
    <>
      <div className="absolute top-full left-0 right-0 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-black mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowFilterPopup(true)}
            className="w-full mt-4 px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50"
          >
            Filter Options
          </button>
        </div>
      </div>

      {showFilterPopup && (
        <FilterPopup
          category={selectedCategory}
          onClose={() => setShowFilterPopup(false)}
          onApplyFilters={onApplyFilters}
          onCategoryChange={setSelectedCategory}
        />
      )}
    </>
  );
};

export default FilterMenu; 