import { apiGet } from "@/lib/api";
import type { MenuResponse, RestaurantInfo } from "@/lib/types";

export const fetchMenu = () => apiGet<MenuResponse>("/menu");
export const fetchRestaurant = () => apiGet<RestaurantInfo>("/restaurant");

export const menuQueryKey = ["menu"] as const;
export const restaurantQueryKey = ["restaurant"] as const;

// Category tab order + labels. Mirrors CATEGORIES in backend/seed.py.
export const CATEGORIES: { key: string; label: string }[] = [
  { key: "tiffins", label: "Tiffins" },
  { key: "meals", label: "Meals" },
  { key: "soups", label: "Soups" },
  { key: "indians", label: "Indians" },
  { key: "noodles_fried_rice", label: "Noodles & Fried Rice" },
  { key: "starters", label: "Starters" },
  { key: "rolls", label: "Rolls" },
  { key: "biryanis", label: "Biryanis" },
];
