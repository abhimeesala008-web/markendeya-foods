import { MapPin, Phone } from "lucide-react";
import { FALLBACK_RESTAURANT } from "@/lib/restaurant";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#1A1412] text-[#FFFDF9]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-heading text-xl font-extrabold tracking-tight">
            {FALLBACK_RESTAURANT.name}
          </h3>
          <p className="mt-1 text-sm text-[#D6C7B8]">{FALLBACK_RESTAURANT.tagline}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FBBF24]">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#F3E8DF]">
            {FALLBACK_RESTAURANT.phones.map((phone) => (
              <li key={phone} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#F59E0B]" />
                <a href={`tel:+91${phone}`} className="hover:text-[#FBBF24]">
                  +91 {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FBBF24]">Address</h4>
          <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#F3E8DF]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
            <span>
              {FALLBACK_RESTAURANT.address} — PIN {FALLBACK_RESTAURANT.pincode}
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-[#3D2E28] px-4 py-4 text-center text-xs text-[#D6C7B8] md:px-8">
        <p>
          © {new Date().getFullYear()} {FALLBACK_RESTAURANT.name} · Order on WhatsApp · Dish photos
          are representative images, not actual photographs of our food.
        </p>
      </div>
    </footer>
  );
}
