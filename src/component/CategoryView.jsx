"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

const toBengaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[d]);
};

export default function CategoryView({
  products = [],
  categoryNameBn = "ক্যাটাগরি",
  categoryIcon = "🛒",
}) {
  const [sortBy, setSortBy] = useState("default");

  // Empty State handling
  if (!products || products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-xs">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🔍
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই অথবা ভুল ক্যাটাগরি নির্বাচন করা হয়েছে।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  // Sorting Logic
  let sortedProducts = [...products];
  if (sortBy === "low-to-high") {
    sortedProducts.sort((a, b) => (a.today ?? 0) - (b.today ?? 0));
  } else if (sortBy === "high-to-low") {
    sortedProducts.sort((a, b) => (b.today ?? 0) - (a.today ?? 0));
  }

  return (
    <div className="space-y-6">
      {/* Category Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 flex items-center gap-4 sm:gap-5 shadow-xs">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl select-none shrink-0 border border-gray-100">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {categoryNameBn}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort Control Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex items-center justify-end gap-3 shadow-xs">
        <span className="text-xs sm:text-sm text-gray-500 font-medium">সাজান</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-emerald-600 cursor-pointer"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {/* Subtitle / Counter */}
      <div>
        <p className="text-xs sm:text-sm text-gray-500">
          মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

