"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNavList({ categories = [] }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3 sm:gap-5 md:gap-6 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
      {categories.map((n) => {
        const isActive = pathname === `/categories/${n.slug}` || pathname === `/category/${n.slug}`;
        return (
          <Link
            key={n.id || n.slug}
            href={`/categories/${n.slug}`}
            className={`flex items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all ${
              isActive
                ? "bg-emerald-700 text-white px-3.5 py-1 rounded-full shadow-xs"
                : "text-gray-700 hover:text-emerald-700 px-2 py-1"
            }`}
          >
            <span className="text-base select-none">{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
}

