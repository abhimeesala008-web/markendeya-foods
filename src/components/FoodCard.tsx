import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import DishImage from "@/components/DishImage";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/lib/types";

// FSSAI-style Veg (green square + dot) / Non-Veg (brown square + triangle) indicator.
function VegMark({ isVeg }: { isVeg: boolean }) {
  return (
    <span
      title={isVeg ? "Veg" : "Non-Veg"}
      className={cn(
        "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-2 bg-white",
        isVeg ? "border-[#15803D]" : "border-[#B91C1C]",
      )}
    >
      {isVeg ? (
        <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
      ) : (
        <span className="h-0 w-0 border-x-[3.5px] border-b-[6px] border-x-transparent border-b-[#B91C1C]" />
      )}
    </span>
  );
}

export default function FoodCard({ item }: { item: MenuItem }) {
  const { add, increment, decrement, qtyOf } = useCart();
  const qty = qtyOf(item.id);

  return (
    <article
      data-testid={`food-card-${item.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#EADBCE] bg-white shadow-[0_1px_3px_rgba(31,27,24,0.05)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(154,52,18,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <DishImage
          src={item.image}
          alt={`${item.name} — ${item.category_label} at Markendeya Foods`}
          className="h-full w-full rounded-none object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {!item.available && (
          <span className="absolute inset-x-0 bottom-0 bg-black/65 py-1.5 text-center text-xs font-bold tracking-wide text-white">
            Currently unavailable
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-[15px] font-bold leading-snug text-[#1F1B18]">
            {item.name}
          </h3>
          <VegMark isVeg={item.is_veg} />
        </div>

        {item.description && (
          <p className="line-clamp-2 text-[13px] leading-snug text-[#6E6259]">
            {item.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-extrabold text-[#9A3412]">₹{item.price}</span>

          {qty === 0 ? (
            <Button
              size="sm"
              disabled={!item.available}
              data-testid={`food-card-add-button-${item.id}`}
              onClick={() =>
                add({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  isVeg: item.is_veg,
                })
              }
              className="gap-1.5 rounded-full font-bold"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add
            </Button>
          ) : (
            <div
              data-testid={`food-card-stepper-${item.id}`}
              className="flex items-center gap-1 rounded-full border border-[#EADBCE] bg-[#FFF7ED] p-1"
            >
              <Button
                size="icon-xs"
                variant="ghost"
                aria-label={`Decrease ${item.name} quantity`}
                data-testid={`food-card-qty-minus-${item.id}`}
                onClick={() => decrement(item.id)}
                className="rounded-full hover:bg-[#F3E3D3]"
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span
                data-testid={`food-card-qty-${item.id}`}
                className="min-w-6 text-center text-sm font-bold text-[#1F1B18]"
              >
                {qty}
              </span>
              <Button
                size="icon-xs"
                variant="ghost"
                aria-label={`Increase ${item.name} quantity`}
                data-testid={`food-card-qty-plus-${item.id}`}
                onClick={() => increment(item.id)}
                className="rounded-full hover:bg-[#F3E3D3]"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>

        <Badge variant="outline" className="mt-1 w-fit border-[#EADBCE] text-[11px] text-[#6E6259]">
          {item.category_label}
        </Badge>
      </div>
    </article>
  );
}
