"use client";

const categories = [
  { label: "الرئيسية", icon: () => <span className="text-lg">🏠</span> },
  { label: "عطور", icon: () => <span className="text-lg">🌿</span> },
  { label: "أجهزة إلكترونية", icon: () => <span className="text-lg">📱</span> },
  { label: "آلات صنع القهوة", icon: () => <span className="text-lg">☕</span> },
  {
    label: "ملابس رجالي/نسائي",
    icon: () => <span className="text-lg">👕</span>,
  },
  { label: "حقائب", icon: () => <span className="text-lg">👜</span> },
  { label: "أحذية رياضية", icon: () => <span className="text-lg">👟</span> },
];

export default function CategoryMenu() {
  return (
    <>
      {/* موبايل - شريط أفقي داخل الهيدر أو تحته */}
      <div className="lg:hidden overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-4 px-4 py-2">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex flex-row-reverse items-center gap-1 text-sm whitespace-nowrap px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ديسكتوب - عمودي مثل BrandList */}
      <div className="hidden lg:flex flex-col gap-2">
        {categories.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex flex-row-reverse items-center gap-2 text-sm px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon />
            <span className="text-left">{label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
