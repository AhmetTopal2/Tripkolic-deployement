'use client';

import { useState } from 'react';

interface FilterPopupProps {
  category: string;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
  onCategoryChange: (category: string) => void;
}

export interface FilterValues {
  location?: string;
  priceRange: [number, number];
  startTime: [string, string];
  groupSize: [number, number];
  vehicle?: string[];
  features?: string[];
  tourCategory?: string;
  theme?: string[];
  activities?: string[];
}

interface CategoryFilter {
  vehicles?: string[];
  features: string[];
  tourCategories?: string[];
  showTimeFilter: boolean;
  showGroupSize: boolean;
  activities?: string[];
}

const categoryFilters: Record<string, CategoryFilter> = {
  tours: {
    vehicles: ['Yacht', 'Catamaran', 'Bus', 'Minivan'],
    features: ['WiFi', 'Food', 'Guide', 'Transfer'],
    tourCategories: ['Island Tour', 'Safari', 'Land Tour'],
    activities: ['Swimming', 'Running', 'Elephant Care', 'Snorkelling'],
    showTimeFilter: true,
    showGroupSize: true,
  },
  tickets: {
    features: ['Skip the line', 'Audio Guide', 'Printed', 'Mobile'],
    showTimeFilter: true,
    showGroupSize: false,
  },
  rent: {
    vehicles: ['Car', 'Bike', 'Scooter', 'Boat'],
    features: ['Insurance', 'GPS', 'Child Seat', 'Unlimited Mileage'],
    showTimeFilter: false,
    showGroupSize: false,
  },
  transfer: {
    vehicles: ['Luxury Car', 'Van', 'Bus', 'Helicopter'],
    features: ['Meet & Greet', 'Flight Tracking', 'Child Seat', 'Multiple Stops'],
    showTimeFilter: true,
    showGroupSize: true,
  },
};

const FilterPopup = ({ category, onClose, onApplyFilters, onCategoryChange }: FilterPopupProps) => {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [filters, setFilters] = useState<FilterValues>({
    location: '',
    priceRange: [0, 10000],
    startTime: ['00:00', '23:59'],
    groupSize: [1, 50],
    vehicle: [],
    features: [],
    tourCategory: '',
    theme: [],
    activities: []
  });

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
    // Reset filters when category changes
    setFilters({
      location: '',
      priceRange: [0, 10000],
      startTime: ['00:00', '23:59'],
      groupSize: [1, 50],
      vehicle: [],
      features: [],
      tourCategory: '',
      theme: [],
      activities: []
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl max-h-[95vh] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-black">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Categories */}
          <div className="mt-4">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {Object.keys(categoryFilters).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-primary-500 text-black'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-180px)] p-6">
          <div className="space-y-6">
            {/* Location Search */}
            <div>
              <label className="text-sm font-medium text-black">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({
                  ...filters,
                  location: e.target.value
                })}
                placeholder="Search by location..."
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-black placeholder-gray-500"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-black">Price Range</label>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-black">$0</span>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [0, parseInt(e.target.value)]
                  })}
                  className="flex-1"
                />
                <span className="text-sm text-black">${filters.priceRange[1]}</span>
              </div>
            </div>

            {/* Category Specific Filters */}
            {categoryFilters[selectedCategory as keyof typeof categoryFilters].showTimeFilter && (
              <div>
                <label className="text-sm font-medium text-black">Start Time</label>
                <div className="flex gap-4">
                  <input
                    type="time"
                    value={filters.startTime[0]}
                    onChange={(e) => setFilters({
                      ...filters,
                      startTime: [e.target.value, filters.startTime[1]]
                    })}
                    className="border rounded px-2 py-1 text-black"
                  />
                  <input
                    type="time"
                    value={filters.startTime[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      startTime: [filters.startTime[0], e.target.value]
                    })}
                    className="border rounded px-2 py-1"
                  />
                </div>
              </div>
            )}

            {categoryFilters[selectedCategory as keyof typeof categoryFilters].showGroupSize && (
              <div>
                <label className="text-sm font-medium text-black">Group Size</label>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-black">1</span>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={filters.groupSize[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      groupSize: [1, parseInt(e.target.value)]
                    })}
                    className="flex-1"
                  />
                  <span className="text-sm text-black">{filters.groupSize[1]}</span>
                </div>
              </div>
            )}

            {/* Vehicle Selection */}
            {categoryFilters[selectedCategory]?.vehicles && (
              <div>
                <label className="text-sm font-medium text-black">Vehicle Type</label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {(categoryFilters[selectedCategory]?.vehicles ?? []).map((vehicle) => (
                    <label key={vehicle} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.vehicle?.includes(vehicle)}
                        onChange={(e) => {
                          const newVehicles = e.target.checked
                            ? [...(filters.vehicle || []), vehicle]
                            : filters.vehicle?.filter(v => v !== vehicle);
                          setFilters({ ...filters, vehicle: newVehicles });
                        }}
                        className="rounded text-primary-500"
                      />
                      <span className="text-sm text-black">{vehicle}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Features - Category Specific */}
            <div>
              <label className="text-sm font-medium text-black">Features</label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {categoryFilters[selectedCategory as keyof typeof categoryFilters].features.map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.features?.includes(feature)}
                      onChange={(e) => {
                        const newFeatures = e.target.checked
                          ? [...(filters.features || []), feature]
                          : filters.features?.filter(f => f !== feature);
                        setFilters({ ...filters, features: newFeatures });
                      }}
                      className="rounded text-primary-500"
                    />
                    <span className="text-sm text-black">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {categoryFilters[selectedCategory]?.tourCategories && (
              <div>
                <label className="text-sm font-medium text-black">Tour Category</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {(categoryFilters[selectedCategory]?.tourCategories ?? []).map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        checked={filters.tourCategory === category}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({ ...filters, tourCategory: category });
                          }
                        }}
                        className="rounded text-primary-500"
                      />
                      <span className="text-sm text-black">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {categoryFilters[selectedCategory]?.activities && (
              <div>
                <label className="text-sm font-medium text-black">Activities</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {(categoryFilters[selectedCategory]?.activities ?? []).map((activity) => (
                    <label key={activity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.activities?.includes(activity)}
                        onChange={(e) => {
                          const newActivities = e.target.checked
                            ? [...(filters.activities || []), activity]
                            : filters.activities?.filter(a => a !== activity);
                          setFilters({ ...filters, activities: newActivities });
                        }}
                        className="rounded text-primary-500"
                      />
                      <span className="text-sm text-black">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="sticky bottom-0 bg-white p-4 border-t flex gap-4">
          <button
            onClick={() => {
              setFilters({
                location: '',
                priceRange: [0, 10000],
                startTime: ['00:00', '23:59'],
                groupSize: [1, 50],
                vehicle: [],
                features: [],
                tourCategory: '',
                theme: [],
                activities: []
              });
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-black"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApplyFilters(filters);
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-primary-500 text-black rounded-lg hover:bg-primary-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup; 