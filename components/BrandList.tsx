"use client";

const brands = [
  { name: "Chanel", icon: () => <span className="text-lg">👗</span> },
  { name: "Huawei", icon: () => <span className="text-lg">📱</span> },
  { name: "Apple", icon: () => <span className="text-lg">🍎</span> },
  { name: "Samsung", icon: () => <span className="text-lg">📺</span> },
  // أضف المزيد حسب الحاجة
];

export default function BrandList() {
  return (
    <>
      {/* العنوان */}
      <div className="lg:flex mb-2 px-3 py-1 border border-blue-500 rounded-full text-blue-600 dark:text-white bg-blue-50 dark:bg-blue-900 font-semibold flex items-center justify-center">
        العلامات التجارية
      </div>

      {/* ديسكتوب - قائمة عمودية بدون شريط جانبي عريض */}
      <div className="hidden lg:flex flex-col gap-2">
        {brands.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className="flex flex-row-reverse items-center gap-2 text-sm px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon />
            <span className="text-left">{name}</span>
          </button>
        ))}
      </div>

      {/* موبايل */}
      <div className="lg:hidden mt-4 overflow-x-auto border-t border-gray-200 dark:border-gray-700 pt-2">
        <div className="flex gap-4 px-4 pb-2">
          {brands.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="flex flex-row-reverse items-center gap-1 text-sm whitespace-nowrap px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Icon />
              {name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
