"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import type { Shop } from "@/lib/type";
import { fetchShops } from "@/lib/supabase";

type SortOption = "rating" | "products" | "alphabetical" | "newest";

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    fetchShops()
      .then((data) => setShops(data))
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort shops
  const filteredAndSortedShops = useMemo(() => {
    const filtered = shops.filter(
      (shop) =>
        (shop.shop_name?.toLowerCase() ?? "").includes(
          searchQuery.toLowerCase()
        ) ||
        (shop.address?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
    );

    // Sort based on selected option
    switch (sortBy) {
      case "alphabetical":
        filtered.sort((a, b) =>
          (a.shop_name ?? "").localeCompare(b.shop_name ?? "")
        );
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      // يمكنك إضافة منطق rating/products إذا كان لديك هذه البيانات
    }

    return filtered;
  }, [shops, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedShops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShops = filteredAndSortedShops.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper to parse work_hours string[] to object and get today's work hours
  function getTodayWorkHours(work_hours?: string[]) {
    if (!work_hours || work_hours.length === 0) return null;
    const today = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const todayName = days[today.getDay()];
    for (const whStr of work_hours) {
      try {
        const wh = JSON.parse(whStr);
        if (wh.day === todayName) return wh;
      } catch {
        // ignore parse error
      }
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Discover Amazing Shops
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Find the best stores in your area
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for shops, categories, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <Select
                value={sortBy}
                onValueChange={(value: SortOption) => setSortBy(value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {/* يمكنك تفعيل الخيارات حسب بياناتك */}
                  {/* <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem> */}
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {paginatedShops.length} of {filteredAndSortedShops.length}{" "}
              shops
            </div>
          </div>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500">
            جاري التحميل...
          </div>
        ) : paginatedShops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No shops found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedShops.map((shop: Shop) => {
              const todayWork = getTodayWorkHours(shop.work_hours);
              return (
                <Card
                  key={shop.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    {/* Shop Cover Image */}
                    <div className="relative h-48 overflow-hidden flex items-center justify-center">
                      <Image
                        src={shop.cover_image_url || "/placeholder.svg"}
                        alt={shop.shop_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      {/* Logo في منتصف أسفل الغلاف */}
                      <div
                        className="absolute left-1/2"
                        style={{
                          bottom: "0px", // ينزل اللوجو ليكون نصفه في الغلاف ونصفه في التفاصيل
                          transform: "translateX(-50%)",
                          zIndex: 10,
                          pointerEvents: "none",
                        }}
                      >
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
                          <Image
                            src={shop.logo_url || "/placeholder.svg"}
                            alt={`${shop.shop_name} logo`}
                            width={96}
                            height={96}
                            className="object-cover w-24 h-24"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shop Info */}
                    <div className="p-6 pt-16">
                      <div className="mb-3 flex flex-col gap-1">
                        <div className="flex items-center gap-2 justify-between w-full">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                              {shop.shop_name}
                            </h3>
                            {/* دوام اليوم الحالي بجانب الاسم */}
                            {shop.work_hours && shop.work_hours.length > 0 ? (
                              todayWork ? (
                                <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-300">
                                  <Clock className="h-3 w-3" />
                                  {todayWork.open} - {todayWork.close}
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                  <Clock className="h-3 w-3" />
                                  لا يوجد دوام اليوم
                                </span>
                              )
                            ) : null}
                          </div>
                          {/* اسم المالك في أقصى الجهة */}
                          <span className="text-xs text-gray-400 break-all ms-auto">
                            {shop.profiles?.full_name ?? shop.owner}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {shop.shop_desc}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="h-4 w-4" />
                          {shop.address}
                          {/* التصنيف مقابل الموقع */}
                          <Badge variant="outline" className="ms-auto">
                            التصنيف رقم {shop.category_id ?? "غير محدد"}
                          </Badge>
                        </div>
                      </div>
                      {/* Visit Button */}
                      <Link href={`/shops/${shop.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          زيارة المتجر
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
