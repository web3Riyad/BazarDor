import Link from "next/link";

const NavLink = async () => {
  let categories = [];

  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      next: { revalidate: 3600 },
    });
    const resdata = await res.json();
    categories = resdata;

    // if (Array.isArray(resdata)) {
    //   categories = resdata;
    // } else if (Array.isArray(resdata?.data)) {
    //   categories = resdata.data;
    // } else if (Array.isArray(resdata?.resdata)) {
    //   categories = resdata.resdata;
    // } else if (Array.isArray(resdata?.categories)) {
    //   categories = resdata.categories;
    // }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="w-full border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {categories.map((n) => (
            <Link
              key={n.id || n.slug}
              href={`/?category=${n.slug}`}
              className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors"
            >
              <span className="text-base select-none">{n.icon}</span>
              <span>{n.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavLink;
