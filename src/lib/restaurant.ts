// Static restaurant facts — used as the offline/CDN fallback when /api/restaurant is unreachable.
// Backend .env WHATSAPP_NUMBER is the live source for the WhatsApp number; this is the default.
export const FALLBACK_RESTAURANT = {
  name: "Markendeya Foods",
  tagline: "Fresh Food, Great Taste, Every Time.",
  phones: ["8341708176", "9959382812"],
  whatsapp_number: "918341708176",
  address:
    "Chinnagadhili, Opposite CARE Hospitals, Arilova Health City, Visakhapatnam, Andhra Pradesh, India",
  pincode: "500040",
} as const;
