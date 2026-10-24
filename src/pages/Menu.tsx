import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, SearchX, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FoodCard from "@/components/FoodCard";
import { CATEGORIES, fetchMenu, menuQueryKey } from "@/lib/queries";
import { cn } from "@/lib/utils";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("category") ?? "all";
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: menuQueryKey,
    queryFn: fetchMenu,
  });

  const items = data?.items ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter(
      (it) =>
        (active === "all" || it.category === active) &&
        (q === "" || it.name.toLowerCase().includes(q)),
    );
  }, [items, active, search]);

  const setActive = (key: string) => {
    setSearchParams(key === "all" ? {} : { category: key }, { replace: true });
  };

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const it of items) map.set(it.category, (map.get(it.category) ?? 0) + 1);
    return map;
  }, [items]);

  const tabs = [{ key: "all", label: "All" }, ...CATEGORIES];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C44D08]">Full Menu</p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#1F1B18] md:text-4xl">
        Our Dishes
      </h1>

      {/* Sticky search + category tabs */}
      <div className="sticky top-16 z-30 -mx-4 mt-6 border-b border-[#EADBCE] bg-[#FFFDF9]/95 px-4 pb-3 pt-3 backdrop-blur md:-mx-8 md:px-8">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E6259]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes…"
            data-testid="search-food-input"
            className="rounded-full border-[#EADBCE] bg-white pl-10 pr-9"
            aria-label="Search dishes by name"
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              data-testid="search-clear-button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#6E6259] hover:bg-[#FBF5EE]"
            >
              <SearchX className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Menu categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active === tab.key}
              data-testid={`category-tab-${tab.key}`}
              onClick={() => setActive(tab.key)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                active === tab.key
                  ? "border-[#C44D08] bg-[#C44D08] text-white"
                  : "border-[#EADBCE] bg-white text-[#4A3E36] hover:border-[#C44D08] hover:text-[#C44D08]",
              )}
            >
              {tab.label}
              {items.length > 0 && (
                <span className={cn("ml-1.5 text-xs", active === tab.key ? "text-white/80" : "text-[#6E6259]")}>
                  {tab.key === "all" ? items.length : counts.get(tab.key) ?? 0}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-5 text-sm text-[#6E6259]" data-testid="menu-count">
        {isLoading
          ? "Loading menu…"
          : isError
            ? ""
            : `${filtered.length} ${filtered.length === 1 ? "dish" : "dishes"}${
                active !== "all" ? ` in ${CATEGORIES.find((c) => c.key === active)?.label}` : ""
              }${search.trim() ? ` matching “${search.trim()}”` : ""}`}
      </p>

      {/* Grid */}
      {isLoading ? (
        <div
          className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          data-testid="menu-loading"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-[#EADBCE] bg-white">
              <div className="aspect-[4/3] w-full animate-pulse bg-[#F3E8DF]" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-[#F3E8DF]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-[#F3E8DF]" />
                <div className="h-8 w-full animate-pulse rounded bg-[#F3E8DF]" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-[#EADBCE] bg-[#FBF5EE] p-10 text-center"
          data-testid="menu-error"
        >
          <TriangleAlert className="h-8 w-8 text-[#D97706]" />
          <p className="font-semibold text-[#1F1B18]">
            The menu could not be loaded right now.
          </p>
          <p className="text-sm text-[#6E6259]">
            Please check your connection and try again.
          </p>
          <Button
            variant="outline"
            className="mt-2 rounded-full border-[#C44D08] font-bold text-[#C44D08] hover:bg-[#FBEADB]"
            onClick={() => refetch()}
            data-testid="menu-retry-button"
          >
            Retry
          </Button>
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#EADBCE] bg-[#FBF5EE] p-10 text-center"
          data-testid="menu-empty"
        >
          <SearchX className="h-8 w-8 text-[#6E6259]" />
          {search.trim() ? (
            <>
              <p className="font-semibold text-[#1F1B18]">No dishes match “{search.trim()}”.</p>
              <p className="text-sm text-[#6E6259]">Try a different dish name or clear the search.</p>
              <Button
                variant="outline"
                className="mt-2 rounded-full border-[#C44D08] font-bold text-[#C44D08] hover:bg-[#FBEADB]"
                onClick={() => setSearch("")}
                data-testid="menu-empty-clear-button"
              >
                Clear Search
              </Button>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#1F1B18]">No dishes in this category yet.</p>
              <Button
                variant="outline"
                className="mt-2 rounded-full border-[#C44D08] font-bold text-[#C44D08] hover:bg-[#FBEADB]"
                render={<Link to="/menu" />}
                onClick={() => setActive("all")}
                data-testid="menu-empty-all-button"
              >
                Show All Dishes
              </Button>
            </>
          )}
        </div>
      ) : (
        <div
          className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          data-testid="menu-grid"
        >
          {filtered.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
