"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";
import SocialLogin from "@/component/SocialLogin";

export default function SignupPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    if (!name || name.length < 3) {
      const msg = "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
      setErrorMessage(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    if (!email) {
      const msg = "একটি সঠিক ইমেইল অ্যাড্রেস প্রদান করুন।";
      setErrorMessage(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      const msg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
      setErrorMessage(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        const msg = error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
        setErrorMessage(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      toast.success("রেজিস্ট্রেশন সফল হয়েছে! অনুগ্রহ করে লগইন করুন।");
      router.push("/signin");
    } catch (err) {
      console.error("Signup exception:", err);
      const msg = "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMessage(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#f6f8f6]">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-xs">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            রেজিস্ট্রেশন করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            বাজার দর একাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-5 p-3.5 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পুরো নাম
            </label>
            <input
              type="text"
              name="name"
              required
              minLength={3}
              placeholder="যেমন: রেজওয়ান আহমেদ"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@mail.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm py-2.5 rounded-xl shadow-xs transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>রেজিস্ট্রেশন হচ্ছে...</span>
              </>
            ) : (
              <span>রেজিস্ট্রেশন</span>
            )}
          </button>
        </form>

        {/* Social Registration (Google & GitHub) */}
        <SocialLogin callbackURL="/" />

        {/* Link to Login */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            ইতোমধ্যে একাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-emerald-700 hover:text-emerald-800 transition-colors ml-1"
            >
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
