import type { CartItem, RestaurantInfo } from "@/lib/types";

// Builds the owner-approved order message and a wa.me URL. No delivery fee line is emitted
// unless a fee is actually configured (delivery_fee != null) — we never invent one.
export function buildOrderMessage(
  items: CartItem[],
  opts: {
    customerName: string;
    mode: "delivery" | "pickup";
    address: string;
    notes: string;
    info: Pick<RestaurantInfo, "name" | "delivery_fee">;
  },
): string {
  const lines: string[] = [];
  const subtotal = items.reduce((n, it) => n + it.qty * it.price, 0);
  const fee = opts.mode === "delivery" && opts.info.delivery_fee != null ? opts.info.delivery_fee : 0;
  const total = subtotal + fee;

  lines.push(`${opts.info.name.toUpperCase()} — ORDER`);
  lines.push("");
  lines.push(`Customer name: ${opts.customerName}`);
  lines.push("");
  lines.push("Items:");
  for (const it of items) {
    lines.push(`- ${it.name} × ${it.qty} — ₹${it.qty * it.price}`);
  }
  lines.push("");
  lines.push(`Subtotal: ₹${subtotal}`);
  if (fee > 0) lines.push(`Delivery fee: ₹${fee}`);
  lines.push("");
  lines.push(`Total: ₹${total}`);
  lines.push("");
  lines.push(`Delivery/pickup: ${opts.mode === "delivery" ? "Delivery" : "Pickup"}`);
  if (opts.mode === "delivery" && opts.address.trim()) {
    lines.push("");
    lines.push(`Address: ${opts.address.trim()}`);
  }
  if (opts.notes.trim()) {
    lines.push("");
    lines.push(`Customer notes: ${opts.notes.trim()}`);
  }
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string, whatsappNumber: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
