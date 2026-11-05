import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[d]);
};

const unitToBn = (unit) => {
  const map = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pc: "পিস",
    gm: "গ্রাম",
  };
  return map[unit?.toLowerCase()] || unit || "কেজি";
};

const Marquee = async () => {
  let products = [];

  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 1800 },
    });
    const resdata = await res.json();

    if (Array.isArray(resdata)) {
      products = resdata;
    } else if (Array.isArray(resdata?.products)) {
      products = resdata.products;
    } else if (Array.isArray(resdata?.data)) {
      products = resdata.data;
    } else if (Array.isArray(resdata?.resdata)) {
      products = resdata.resdata;
    }
  } catch (error) {
    console.error("Failed to fetch products for Marquee:", error);
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#fcfcfc] border-b border-gray-200 overflow-hidden select-none">
      <MarqueeText direction="right" duration={10} pauseOnHover={true} className="flex items-center py-2">
        {products.map((item) => {
          const isUp = item.change?.dir === "up" || (item.change?.pct && item.change.pct > 0);
          const isDown = item.change?.dir === "down" || (item.change?.pct && item.change.pct < 0);
          const pctValue = Math.abs(item.change?.pct || 0).toFixed(1);

          return (
            <div
              key={item.id || item.slug}
              className="inline-flex items-center gap-2 px-5 border-r border-gray-200 text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap"
            >
              <span className="text-base select-none">{item.image || item.categoryIcon}</span>
              <span className="font-semibold">{item.nameBn}</span>
              <span className="text-gray-600">
                {toBengaliNumber(item.today)} টাকা/{unitToBn(item.unit)}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 font-bold ${
                  isUp ? "text-red-500" : isDown ? "text-emerald-600" : "text-gray-500"
                }`}
              >
                <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                <span>{toBengaliNumber(pctValue)}%</span>
              </span>
            </div>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
