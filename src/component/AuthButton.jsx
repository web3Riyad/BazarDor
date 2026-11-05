"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useToast } from "@/context/ToastContext";

export default function AuthButton() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toast = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.info("সাইন আউট সফল হয়েছে।");
      setDropdownOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.reload();
    }
  };

  if (isPending) {
    return <div className="w-24 h-9 bg-gray-100 rounded-full animate-pulse" />;
  }

  if (user) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 py-1 px-2 rounded-full hover:bg-gray-100 transition-all cursor-pointer select-none"
        >
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-sm flex items-center justify-center border border-emerald-200">
              {(user.name?.[0] || "U").toUpperCase()}
            </div>
          )}
          <span className="text-sm font-medium text-gray-800">
            {user.name || "User"}
          </span>
          <span className="text-xs text-gray-500">▾</span>
        </button>

        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-20">
              {/* User Header */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user.email}
                </p>
              </div>

              {/* Menu Items matching Figma */}
              <div className="pt-1">
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
                >
                  <span className="text-base text-gray-400">👤</span>
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer"
                >
                  <span className="text-base">↪</span>
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/signin"
        className="text-sm font-medium text-gray-700 hover:text-emerald-700 px-3.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-1.5 rounded-lg shadow-xs transition-colors"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
