export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Gallery {
  id: number;
  url: string;
}

export interface Route {
  id: number;
  name: string;
  startTime: string[];
  groupSize: number;
  duration: string;
  guideLanguage: string[];
  locations?: Array<{
    id: number;
    lat: number;
    lng: number;
    name: string;
    stop: number | null;
    activities: Array<{ name: string }>;
    sightseeing: boolean;
  }>;
}

export interface Vehicle {
  name: string;
}

export interface Product {
  id: number;
  productId: string;
  title: string;
  description: string;
  activityLocation: Location;
  galleries: Gallery[];
  price: {
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
  };
  routes: Route[];
  vehicle: Vehicle;
  productCategory: 'tour' | 'ticket' | 'rent' | 'transfer';
  tourCategory: {
    name: string;
  };
  foodAndDrinks: Array<{
    name: string;
    isActive: boolean;
  }>;
}

export interface ApiResponse {
  products: Product[];
} 