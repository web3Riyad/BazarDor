import Marquee from "@/component/Marquee";
import Hero from "@/component/Hero";
import ProductCard from "@/component/ProductCard";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[d]);
};

export default async function Home() {
  let products = [];

  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 1800 },
    });
    const data = await res.json();

    if (Array.isArray(data)) {
      products = data;
    } else if (Array.isArray(data?.products)) {
      products = data.products;
    } else if (Array.isArray(data?.data)) {
      products = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  // Section A: Top 6 Risers (দাম বেড়েছে)
  const risers = [...products]
    .filter((p) => p.change?.dir === "up" || (p.change?.pct && p.change.pct > 0))
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  // Section B: Top 6 Fallers (দাম কমেছে)
  const fallers = [...products]
    .filter((p) => p.change?.dir === "down" || (p.change?.pct && p.change.pct < 0))
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="pb-16 bg-[#fcfdfc] min-h-screen">
      <Marquee />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section A: আজ দাম বেড়েছে */}
        {risers.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <span className="text-red-500 text-sm">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {risers.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Section B: আজ দাম কমেছে */}
        {fallers.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <span className="text-emerald-600 text-sm">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {fallers.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Section C: সব পণ্য (Target for CTA anchor button) */}
        <section id="সব-পণ্য" className="scroll-mt-24">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
