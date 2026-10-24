import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { count } = useCart();
  const { pathname } = useLocation();

  const linkCls = (active: boolean) =>
    cn(
      "flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors",
      active
        ? "bg-[#FBEADB] text-[#9A3412]"
        : "text-[#4A3E36] hover:bg-[#FBF5EE] hover:text-[#9A3412]",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-[#EADBCE] bg-[#FFFDF9]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-8">
        <Link to="/" data-testid="nav-home-link" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C44D08] text-white shadow-sm">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-lg font-extrabold tracking-tight text-[#1F1B18]">
              Markendeya Foods
            </span>
            <span className="hidden text-[11px] font-semibold tracking-wide text-[#C44D08] sm:block">
              Fresh Food, Great Taste, Every Time.
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link to="/" className={linkCls(pathname === "/")} data-testid="nav-home-tab">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <Link to="/menu" className={linkCls(pathname === "/menu")} data-testid="nav-menu-link">
            <UtensilsCrossed className="h-4 w-4" />
            <span className="hidden sm:inline">Menu</span>
          </Link>
          <Button
            variant="default"
            className="relative ml-1 gap-2 rounded-full bg-[#C44D08] px-4 font-bold hover:bg-[#9A3412]"
            data-testid="cart-icon"
            render={
              <Link to="/cart" aria-label={`Cart, ${count} items`} />
            }
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span
                data-testid="cart-count-badge"
                className="animate-in zoom-in-50 absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D97706] px-1 text-[11px] font-extrabold text-white shadow"
              >
                {count}
              </span>
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
