import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[d]);
};

const unitMap = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pc: "পিস",
  gm: "গ্রাম",
};

const getUnitBn = (unit) => {
  if (!unit) return "কেজি";
  return unitMap[unit.toLowerCase()] || unit;
};

const calcMarketAvg = (min, max) => {
  const avg = (min + max) / 2;
  return avg % 1 === 0 ? avg : avg.toFixed(2);
};

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  // 1. Protected Route — Requires Login
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (err) {
    console.error("Auth session check error:", err);
  }

  if (!session) {
    redirect(`/signin?callbackURL=/product/${slug}`);
  }

  // 2. Fetch Product Data
  let product = null;
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const products = Array.isArray(data) ? data : data?.products || data?.data || [];
    product = products.find((p) => p.slug === slug || String(p.id) === slug);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    notFound();
  }

  // Calculate Market Prices
  const markets = product.markets || [];
  const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice =
    markets.length > 0
      ? Math.round(markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length)
      : product.today;

  // Price Difference from yesterday
  const priceDiff = product.today - (product.yesterday ?? product.today);
  const isUp = product.change?.dir === "up" || (product.change?.pct && product.change.pct > 0);
  const isDown = product.change?.dir === "down" || (product.change?.pct && product.change.pct < 0);
  const pctValue = Math.abs(product.change?.pct || 0).toFixed(1);

  return (
    <div className="bg-[#f6f8f6] min-h-screen py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/categories/${product.category}`}
            className="hover:text-emerald-700 transition-colors"
          >
            {product.categoryNameBn || "ক্যাটাগরি"}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{product.nameBn}</span>
        </nav>

        {/* Top Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl border border-gray-100 select-none shrink-0 shadow-2xs">
              {product.image || product.categoryIcon || "🍚"}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                প্রতি {getUnitBn(product.unit)} • {product.categoryNameBn || product.category}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {priceDiff > 0 ? (
                  <>গতকালের তুলনায় আজ দাম বেড়েছে : {toBengaliNumber(priceDiff)} টাকা</>
                ) : priceDiff < 0 ? (
                  <>গতকালের তুলনায় আজ দাম কমেছে : {toBengaliNumber(Math.abs(priceDiff))} টাকা</>
                ) : (
                  <>গতকালের তুলনায় আজ দাম অপরিবর্তিত</>
                )}
              </p>
            </div>
          </div>

          {/* Right: Today's Price Box */}
          <div className="bg-[#f0f9f4] border border-emerald-100/80 rounded-2xl p-4 sm:p-5 text-center min-w-[140px] sm:min-w-[160px] self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-center items-center">
            <div>
              <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 my-0.5">
                {toBengaliNumber(product.today)}
              </div>
              <span className="text-xs text-gray-500">টাকা / {getUnitBn(product.unit)}</span>
            </div>

            <div
              className={`mt-2 inline-flex items-center gap-0.5 text-xs font-bold ${
                isUp ? "text-red-500" : isDown ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
              <span>{toBengaliNumber(pctValue)}%</span>
            </div>
          </div>
        </div>

        {/* Middle Card: Price Summary (দামের সারসংক্ষেপ) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Minimum Price */}
            <div className="bg-gray-50/70 border border-gray-100 rounded-xl p-4 sm:p-5">
              <span className="text-xs text-gray-500 font-medium block">সর্বনিম্ন মূল্য</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-600 block my-1">
                {toBengaliNumber(minPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400">সবচেয়ে কম দামের বাজার</span>
            </div>

            {/* Maximum Price */}
            <div className="bg-gray-50/70 border border-gray-100 rounded-xl p-4 sm:p-5">
              <span className="text-xs text-gray-500 font-medium block">সর্বাধিক মূল্য</span>
              <span className="text-xl sm:text-2xl font-bold text-red-500 block my-1">
                {toBengaliNumber(maxPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            {/* Average Price */}
            <div className="bg-gray-50/70 border border-gray-100 rounded-xl p-4 sm:p-5">
              <span className="text-xs text-gray-500 font-medium block">গড় মূল্য</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-800 block my-1">
                {toBengaliNumber(avgPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400">
                প্রতি {getUnitBn(product.unit)}-এর হিসাবে
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Card: Market-based Today's Price (বাজারভিত্তিক আজকের দাম) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase">
                  <th className="py-3 px-4 font-semibold">বাজার</th>
                  <th className="py-3 px-4 font-semibold">বিভাগ</th>
                  <th className="py-3 px-4 font-semibold text-right sm:text-left">সর্বনিম্ন</th>
                  <th className="py-3 px-4 font-semibold text-right sm:text-left">সর্বাধিক</th>
                  <th className="py-3 px-4 font-semibold text-right sm:text-left">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {markets.map((m, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/60 transition-colors text-gray-700"
                  >
                    <td className="py-3.5 px-4 font-medium text-gray-900">{m.market}</td>
                    <td className="py-3.5 px-4 text-gray-500">{m.division}</td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {toBengaliNumber(m.min)} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-right sm:text-left">
                      {toBengaliNumber(m.max)} টাকা
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-900 text-right sm:text-left">
                      {toBengaliNumber(calcMarketAvg(m.min, m.max))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

