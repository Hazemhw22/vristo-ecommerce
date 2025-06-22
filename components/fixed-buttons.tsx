// components/fixed-buttons.tsx
"use client";

import { Download, History, User } from "lucide-react";

export default function FixedButtons() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-md flex justify-around items-center py-2 md:hidden">
      <button className="flex flex-col items-center text-xs">
        <Download className="w-5 h-5 mb-1" />
        تثبيت التطبيق
      </button>
      <button className="flex flex-col items-center text-xs">
        <History className="w-5 h-5 mb-1" />
        طلباتي السابقة
      </button>
      <button className="flex flex-col items-center text-xs">
        <User className="w-5 h-5 mb-1" />
        تسجيل دخول
      </button>
    </div>
  );
}
