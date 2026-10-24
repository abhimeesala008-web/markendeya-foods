import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Minus, Plus, ShoppingBag, Trash2, Truck, Utensils, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DishImage from "@/components/DishImage";
import { fetchRestaurant, restaurantQueryKey } from "@/lib/queries";
import { FALLBACK_RESTAURANT } from "@/lib/restaurant";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, increment, decrement, remove, clear, subtotal } = useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"delivery" | "pickup">("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Restaurant info (WhatsApp number, delivery fee policy) with offline fallback.
  const { data: infoData } = useQuery({
    queryKey: restaurantQueryKey,
    queryFn: fetchRestaurant,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
  const info = {
    name: infoData?.name ?? FALLBACK_RESTAURANT.name,
    delivery_fee: infoData?.delivery_fee ?? null,
    whatsapp_number: infoData?.whatsapp_number ?? FALLBACK_RESTAURANT.whatsapp_number,
  };

  const fee = mode === "delivery" && info.delivery_fee != null ? info.delivery_fee : 0;
  const total = subtotal + fee;
  const canOrder = items.length > 0 && name.trim().length > 0 && (mode === "pickup" || address.trim().length > 0);

  const handleWhatsAppOrder = () => {
    const message = buildOrderMessage(items, {
      customerName: name.trim(),
      mode,
      address,
      notes,
      info: { name: info.name, delivery_fee: info.delivery_fee },
    });
    const url = buildWhatsAppUrl(message, info.whatsapp_number);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.info("Opening WhatsApp with your order…", {
      description:
        "Sending the message on WhatsApp does not confirm your order — it is confirmed once we reply.",
      duration: 6000,
    });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF5EE]">
          <ShoppingBag className="h-7 w-7 text-[#C44D08]" />
        </span>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#1F1B18]">
          Your cart is empty
        </h1>
        <p className="text-[#6E6259]">
          Browse the menu and add your favourite dishes — they will show up here.
        </p>
        <Button
          size="lg"
          className="mt-2 rounded-full bg-[#C44D08] font-bold hover:bg-[#9A3412]"
          render={<Link to="/menu" />}
          data-testid="browse-menu-button"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse the Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C44D08]">Your Order</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1F1B18]">
            Cart
          </h1>
        </div>
        <Button
          variant="ghost"
          className="gap-2 rounded-full text-[#6E6259] hover:bg-[#FBF5EE] hover:text-[#B91C1C]"
          onClick={clear}
          data-testid="clear-cart-button"
        >
          <Trash2 className="h-4 w-4" />
          Clear cart
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Items */}
        <section className="lg:col-span-2" aria-label="Cart items">
          <ul className="space-y-3">
            {items.map((it) => (
              <li
                key={it.id}
                data-testid={`cart-item-${it.id}`}
                className="flex gap-4 rounded-2xl border border-[#EADBCE] bg-white p-3"
              >
                <DishImage
                  src={it.image}
                  alt={it.name}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-heading text-sm font-bold text-[#1F1B18]">
                        {it.name}
                      </h3>
                      <p className="text-sm text-[#6E6259]">₹{it.price} each</p>
                    </div>
                    <span className="shrink-0 font-extrabold text-[#9A3412]">
                      ₹{it.price * it.qty}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-[#EADBCE] p-1">
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label={`Decrease ${it.name} quantity`}
                        data-testid={`cart-item-minus-${it.id}`}
                        onClick={() => decrement(it.id)}
                        className="rounded-full hover:bg-[#F3E3D3]"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span
                        data-testid={`cart-item-qty-${it.id}`}
                        className="min-w-6 text-center text-sm font-bold"
                      >
                        {it.qty}
                      </span>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label={`Increase ${it.name} quantity`}
                        data-testid={`cart-item-plus-${it.id}`}
                        onClick={() => increment(it.id)}
                        className="rounded-full hover:bg-[#F3E3D3]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      aria-label={`Remove ${it.name} from cart`}
                      data-testid={`cart-item-remove-${it.id}`}
                      onClick={() => remove(it.id)}
                      className="rounded-full text-[#6E6259] hover:bg-[#FEE2E2] hover:text-[#B91C1C]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Button
            variant="outline"
            className="mt-4 gap-2 rounded-full border-[#C44D08] font-bold text-[#C44D08] hover:bg-[#FBEADB]"
            render={<Link to="/menu" />}
            data-testid="continue-shopping-button"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Button>
        </section>

        {/* Summary + details */}
        <section className="space-y-4" aria-label="Order summary and customer details">
          <div className="rounded-2xl border border-[#EADBCE] bg-[#FFF7ED] p-5">
            <div className="flex justify-between py-1 text-sm text-[#1F1B18]">
              <span>Subtotal</span>
              <span data-testid="cart-subtotal" className="font-bold">
                ₹{subtotal}
              </span>
            </div>
            {fee > 0 && (
              <div className="flex justify-between py-1 text-sm text-[#1F1B18]">
                <span>Delivery fee</span>
                <span data-testid="cart-delivery-fee" className="font-bold">
                  ₹{fee}
                </span>
              </div>
            )}
            <div className="mt-2 flex justify-between border-t border-[#EADBCE] pt-3 text-base">
              <span className="font-bold text-[#1F1B18]">Total</span>
              <span data-testid="cart-total" className="font-extrabold text-[#9A3412]">
                ₹{total}
              </span>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-[#EADBCE] bg-white p-5">
            <div className="space-y-1.5">
              <Label htmlFor="customer-name">Customer name</Label>
              <Input
                id="customer-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                data-testid="customer-name-input"
                className="border-[#EADBCE]"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Delivery or pickup</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  data-testid="delivery-mode-pickup"
                  onClick={() => setMode("pickup")}
                  className={cn(
                    "flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors",
                    mode === "pickup"
                      ? "border-[#C44D08] bg-[#FBEADB] text-[#9A3412]"
                      : "border-[#EADBCE] bg-white text-[#4A3E36] hover:border-[#C44D08]",
                  )}
                >
                  <Store className="h-4 w-4" />
                  Pickup
                </button>
                <button
                  type="button"
                  data-testid="delivery-mode-delivery"
                  onClick={() => setMode("delivery")}
                  className={cn(
                    "flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition-colors",
                    mode === "delivery"
                      ? "border-[#C44D08] bg-[#FBEADB] text-[#9A3412]"
                      : "border-[#EADBCE] bg-white text-[#4A3E36] hover:border-[#C44D08]",
                  )}
                >
                  <Truck className="h-4 w-4" />
                  Delivery
                </button>
              </div>
            </div>

            {mode === "delivery" && (
              <div className="space-y-1.5">
                <Label htmlFor="customer-address">Delivery address</Label>
                <Textarea
                  id="customer-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / flat, street, landmark…"
                  data-testid="customer-address-input"
                  className="min-h-20 border-[#EADBCE]"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="customer-notes">Customer notes</Label>
              <Textarea
                id="customer-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Spice level, less oil, any special request…"
                data-testid="customer-notes-input"
                className="min-h-20 border-[#EADBCE]"
              />
            </div>

            <Button
              size="lg"
              disabled={!canOrder}
              onClick={handleWhatsAppOrder}
              data-testid="whatsapp-order-submit-btn"
              className="w-full gap-2 rounded-full bg-[#25D366] font-bold text-[#0B3818] hover:bg-[#1FB855]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Order on WhatsApp
            </Button>
            <p className="text-center text-xs leading-relaxed text-[#6E6259]">
              Opens WhatsApp with your order pre-filled. Opening WhatsApp does not confirm the
              order — it is confirmed once the restaurant replies.
            </p>
          </div>

          <p className="flex items-start gap-2 rounded-2xl bg-[#FBF5EE] p-4 text-xs leading-relaxed text-[#6E6259]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
            Pickup address: {FALLBACK_RESTAURANT.address} — PIN {FALLBACK_RESTAURANT.pincode}
          </p>
        </section>
      </div>
    </div>
  );
}
