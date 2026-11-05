import Marquee from "@/component/Marquee";
import CategoryView from "@/component/CategoryView";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  let categories = [];
  let products = [];

  try {
    // 1. Fetch categories dynamically
    const catRes = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      next: { revalidate: 3600 },
    });
    const catData = await catRes.json();
    categories = Array.isArray(catData)
      ? catData
      : Array.isArray(catData?.data)
      ? catData.data
      : Array.isArray(catData?.categories)
      ? catData.categories
      : Array.isArray(catData?.resdata)
      ? catData.resdata
      : [];

    // 2. Fetch products dynamically
    const prodRes = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      next: { revalidate: 1800 },
    });
    const prodData = await prodRes.json();
    products = Array.isArray(prodData)
      ? prodData
      : Array.isArray(prodData?.products)
      ? prodData.products
      : Array.isArray(prodData?.data)
      ? prodData.data
      : [];
  } catch (error) {
    console.error("Failed to fetch category data:", error);
  }

  // Find the current category metadata
  const currentCategory = categories.find(
    (c) => c.slug?.toLowerCase() === slug?.toLowerCase() || c.id?.toLowerCase() === slug?.toLowerCase()
  );

  // Filter products for this category dynamically
  const categoryProducts = products.filter(
    (p) =>
      p.category?.toLowerCase() === slug?.toLowerCase() ||
      p.categorySlug?.toLowerCase() === slug?.toLowerCase()
  );

  const categoryNameBn =
    currentCategory?.nameBn || categoryProducts[0]?.categoryNameBn || slug;
  const categoryIcon =
    currentCategory?.icon || categoryProducts[0]?.categoryIcon || "🛒";

  return (
    <div className="bg-[#f6f8f6] min-h-screen pb-16 flex flex-col justify-between">
      <div>
        {/* Marquee Ticker */}
        <Marquee />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <CategoryView
            products={categoryProducts}
            categoryNameBn={categoryNameBn}
            categoryIcon={categoryIcon}
          />
        </main>
      </div>

      {/* Footer from Figma */}
      <footer className="mt-16 border-t border-gray-200/70 py-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}

