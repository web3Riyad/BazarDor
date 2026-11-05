import Image from "next/image";

const Hero = () => {
  let banglaDate = "মঙ্গলবার, ৬ অক্টোবর, ২০২৬";
  try {
    banglaDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    // fallback
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-6 sm:my-8">
      <div className="bg-[#f9fbf9] border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 shadow-xs">
        {/* Left Content */}
        <div className="flex flex-col items-start gap-3.5 sm:gap-4 max-w-xl">
          {/* Eyebrow / Small text */}
          <span className="inline-block bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium px-3.5 py-1 rounded-full border border-emerald-100">
            {banglaDate}
          </span>

          {/* Main heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Primary CTA button */}
          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm sm:text-base px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Right Banner/Hero Image */}
        <div className="flex justify-center items-center shrink-0 w-full md:w-auto">
          <Image
            src="/bazar-hero.png"
            alt="আজকের বাজারের পণ্য"
            width={420}
            height={360}
            className="w-62 sm:w-64 md:w-80 h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
