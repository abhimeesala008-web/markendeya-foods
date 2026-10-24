import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/queries";
import { FALLBACK_RESTAURANT } from "@/lib/restaurant";

// One representative dish photo per category (generated dish-specific images live in /public/images).
const CATEGORY_IMAGES: Record<string, { img: string; alt: string }> = {
  tiffins: { img: "/images/masala-dosa.jpg", alt: "Masala dosa" },
  meals: { img: "/images/full-meals.jpg", alt: "Full meals thali" },
  soups: { img: "/images/sweetcorn-soup.jpg", alt: "Sweet corn soup" },
  indians: { img: "/images/paneer-butter-masala.jpg", alt: "Paneer butter masala" },
  noodles_fried_rice: { img: "/images/veg-noodles.jpg", alt: "Veg noodles" },
  starters: { img: "/images/veg-manchuria.jpg", alt: "Veg manchuria" },
  rolls: { img: "/images/veg-roll.jpg", alt: "Veg roll" },
  biryanis: { img: "/images/chicken-dum-briyani.jpg", alt: "Chicken dum briyani" },
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1665660710687-b44c50751054?auto=format&fit=crop&w=1600&q=80";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, backgroundColor: "#18110D" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,13,10,0.88) 0%, rgba(35,18,12,0.72) 60%, rgba(15,10,8,0.85) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#FEF3C7] backdrop-blur">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            Visakhapatnam · Andhra Pradesh
          </span>
          <h1 className="mt-6 max-w-2xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-[#FFFDF9] md:text-6xl">
            Markendeya Foods
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#F3E8DF] md:text-xl">
            Fresh Food,{" "}
            <span className="font-bold text-[#FBBF24]">Great Taste</span>, Every Time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="rounded-full bg-[#C44D08] font-bold hover:bg-[#9A3412]"
              render={<Link to="/menu" />}
              data-testid="hero-view-menu-button"
            >
              View the Full Menu
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 font-bold text-white hover:bg-white/20 hover:text-white"
              render={<Link to="/cart" />}
              data-testid="hero-cart-button"
            >
              Go to Cart
            </Button>
          </div>

          <div className="mt-12 flex flex-col gap-3 text-sm text-[#F3E8DF] sm:flex-row sm:items-center sm:gap-8">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#FBBF24]" />
              <a href={`tel:+91${FALLBACK_RESTAURANT.phones[0]}`} className="font-semibold hover:text-white">
                +91 {FALLBACK_RESTAURANT.phones[0]}
              </a>
              <span className="text-[#D6C7B8]">/</span>
              <a href={`tel:+91${FALLBACK_RESTAURANT.phones[1]}`} className="font-semibold hover:text-white">
                {FALLBACK_RESTAURANT.phones[1]}
              </a>
            </span>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FBBF24]" />
              <span className="max-w-md">{FALLBACK_RESTAURANT.address}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Category highlights */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C44D08]">Our Menu</p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1F1B18] md:text-4xl">
          Eight categories, something for every craving
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const img = CATEGORY_IMAGES[cat.key];
            return (
              <Link
                key={cat.key}
                to={`/menu?category=${cat.key}`}
                data-testid={`home-category-${cat.key}`}
                className="group overflow-hidden rounded-2xl border border-[#EADBCE] bg-white shadow-[0_1px_3px_rgba(31,27,24,0.05)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(154,52,18,0.12)]"
              >
                <img
                  src={img.img}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                />
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="font-heading text-sm font-bold text-[#1F1B18]">{cat.label}</span>
                  <ArrowRight className="h-4 w-4 text-[#C44D08] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Order strip */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="rounded-3xl bg-[#FBF5EE] p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight text-[#1F1B18] md:text-3xl">
                Hungry? Order in three taps.
              </h2>
              <p className="mt-2 max-w-lg text-[#6E6259]">
                Browse the menu, add dishes to your cart, and send your order straight to us on
                WhatsApp. Choose delivery or pickup at the counter.
              </p>
            </div>
            <Button
              size="lg"
              className="shrink-0 rounded-full bg-[#C44D08] font-bold hover:bg-[#9A3412]"
              render={<Link to="/menu" />}
              data-testid="home-order-cta"
            >
              Start Your Order
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
