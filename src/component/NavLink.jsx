import CategoryNavList from "./CategoryNavList";

const NavLink = async () => {
  let categories = [];

  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      next: { revalidate: 3600 },
    });
    const resdata = await res.json();

    if (Array.isArray(resdata)) {
      categories = resdata;
    } else if (Array.isArray(resdata?.data)) {
      categories = resdata.data;
    } else if (Array.isArray(resdata?.categories)) {
      categories = resdata.categories;
    } else if (Array.isArray(resdata?.resdata)) {
      categories = resdata.resdata;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="w-full border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CategoryNavList categories={categories} />
      </div>
    </div>
  );
};

export default NavLink;
