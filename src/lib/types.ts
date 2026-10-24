// Hand-written mirrors of the Pydantic models in backend/models/menu.py — keep in sync.
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  category_label: string;
  price: number;
  image: string;
  description: string;
  available: boolean;
  price_confirmed: boolean;
  is_veg: boolean;
}

export interface MenuResponse {
  items: MenuItem[];
  total: number;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  phones: string[];
  whatsapp_number: string;
  address: string;
  pincode: string;
  currency: string;
  delivery_fee: number | null;
  notes: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isVeg: boolean;
  qty: number;
}
