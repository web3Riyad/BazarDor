import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import AuthButton from "./AuthButton";

const Navbar = () => {
  let banglaDate = "মঙ্গলবার, ৬ অক্টোবর, ২০২৬";
  try {
    banglaDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    // fallback date if locale is unavailable
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-xs sticky top-0 z-40">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          
          {/* Left: Brand Logo & Subtitle */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-700 rounded-2xl flex items-center justify-center p-2 shadow-xs group-hover:bg-emerald-800 transition-colors">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {banglaDate}
              </p>
            </div>
          </Link>

          {/* Right: Auth User Profile OR Sign In / Sign Up */}
          <AuthButton />

        </div>
      </div>

      {/* Bottom Row: Dynamic Category Links from API */}
      <NavLink />
    </header>
  );
};

export default Navbar;
