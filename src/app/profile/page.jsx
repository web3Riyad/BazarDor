"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const toast = useToast();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin?callbackURL=/profile");
    }
  }, [isPending, user, router]);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
      toast.info("সাইন আউট সফল হয়েছে।");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
      setSigningOut(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না!");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
      });

      setLoading(false);

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      router.refresh();
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("তথ্য আপডেট করার সময় ত্রুটি হয়েছে।");
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="bg-[#f6f8f6] min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#f6f8f6] min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Header Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Top Card: User Info & Sign Out */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-14 h-14 rounded-full object-cover border border-gray-200 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center border border-emerald-200 shrink-0">
                {(user.name?.[0] || "U").toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer self-end sm:self-auto"
          >
            <span>↪</span>
            <span>{signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>
          </button>
        </div>

        {/* Bottom Card: Update Information Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs mt-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={3}
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || name.trim() === user.name}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm py-2.5 rounded-xl shadow-xs transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>আপডেট হচ্ছে...</span>
                </>
              ) : (
                <span>আপডেট</span>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

