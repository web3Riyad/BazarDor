import Link from "next/link";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[d]);
};

const unitMap = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pc: "প্রতি পিস",
  gm: "প্রতি গ্রাম",
};

const formatUnit = (unit) => {
  if (!unit) return "প্রতি কেজি";
  if (unit.startsWith("প্রতি")) return unit;
  return unitMap[unit.toLowerCase()] || `প্রতি ${unit}`;
};

const ProductCard = ({ item }) => {
  const isUp = item.change?.dir === "up" || (item.change?.pct && item.change.pct > 0);
  const isDown = item.change?.dir === "down" || (item.change?.pct && item.change.pct < 0);
  const pctValue = Math.abs(item.change?.pct || 0).toFixed(1);

  return (
    <Link
      href={`/product/${item.slug}`}
      className="block group"
    >
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col justify-between h-full">
        {/* Top: Icon + Name + Unit */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl select-none shrink-0 border border-gray-100 group-hover:scale-105 transition-transform duration-200">
            {item.image || item.categoryIcon || "🛒"}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-emerald-700 transition-colors">
              {item.nameBn}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatUnit(item.unit)}
            </p>
          </div>
        </div>

        {/* Bottom: Today's Price + Change Badge */}
        <div className="flex items-end justify-between mt-5 pt-3 border-t border-gray-50">
          <div>
            <span className="text-[11px] text-gray-400 block font-normal">
              আজকের দাম
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-900">
              {toBengaliNumber(item.today)} টাকা
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold select-none ${
              isUp
                ? "text-red-500 bg-red-50 border border-red-100"
                : isDown
                ? "text-emerald-600 bg-emerald-50 border border-emerald-100"
                : "text-gray-500 bg-gray-50 border border-gray-200"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{toBengaliNumber(pctValue)}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

