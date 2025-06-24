"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  Heart,
  Share2,
  Star,
  Clock,
  MapPin,
  Filter,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchShops, supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import type { Shop } from "@/lib/type";
import { ProductCard } from "../../../components/ProductCard";

export default function ShopDetailPage() {
  const params = useParams();
  const shopId = params?.id as string;
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");

  // جلب المنتجات حسب اسم المتجر
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", shop?.id],
    enabled: !!shop?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("shop", shop?.id); // استخدم id وليس shop_name
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    setLoading(true);
    fetchShops()
      .then((shops) => {
        const found = shops.find((s) => String(s.id) === shopId);
        setShop(found ?? null);
      })
      .finally(() => setLoading(false));
  }, [shopId]);

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // استخراج دوام اليوم الحالي إذا كان work_hours عبارة عن string[]
  let todayWork: { day: string; open: string; close: string } | null = null;
  if (shop?.work_hours && shop.work_hours.length > 0) {
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
    for (const whStr of shop.work_hours) {
      try {
        const wh = JSON.parse(whStr);
        if (wh.day === todayName) {
          todayWork = wh;
          break;
        }
      } catch {}
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-lg">
        جاري تحميل بيانات المتجر...
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-lg text-red-500">
        لم يتم العثور على المتجر
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Cover Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={shop.cover_image_url || "/placeholder.svg"}
          alt={shop.shop_name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Link href="/shops">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200 z-10" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-full text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:shadow-lg transition-all duration-300 transform focus:scale-105"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Shop Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{shop.shop_name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-lg">{shop.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    todayWork ? "bg-green-500" : "bg-red-500"
                  } animate-pulse`}
                />
                <span className="text-lg font-medium">
                  {todayWork ? `Open until ${todayWork.close}` : "Closed"}
                </span>
              </div>
            </div>

            {/* Shop Logo */}
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white ml-4">
              <Image
                src={shop.logo_url || "/placeholder.svg"}
                alt={`${shop.shop_name} logo`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shop Stats */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {/* Status */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                <Badge
                  className={`mt-2 ${
                    shop.status === "Approved"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  } text-white`}
                >
                  {shop.status}
                </Badge>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Status
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {shop.public ? "Public" : "Private"}
              </span>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {
                    // اسم اليوم الحالي دائماً
                    (() => {
                      const days = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ];
                      const today = new Date();
                      return days[today.getDay()];
                    })()
                  }
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {todayWork
                  ? todayWork.open &&
                    todayWork.close &&
                    todayWork.open !== todayWork.close
                    ? `${todayWork.open} - ${todayWork.close}`
                    : "Closed"
                  : "--"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Now {currentTime}
              </span>
            </div>

            {/* Owner */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {shop.profiles?.full_name ?? shop.owner}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Shop Owner
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {shop.created_at?.slice(0, 10).split("-").reverse().join(".")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex items-center gap-0 mb-6">
            {/* Categories Tab with Icon */}
            <TabsTrigger value="categories" className="flex items-center gap-2 px-4 py-2">
              <LayoutGrid className="h-5 w-5" />
              Available Categories
            </TabsTrigger>

            {/* Vertical Divider */}
            <span className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

            {/* Products Tab with Icon */}
            <TabsTrigger value="products" className="flex items-center gap-2 px-4 py-2">
              <ShoppingBag className="h-5 w-5" />
              All Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-8">
            {/* يمكنك هنا عرض التصنيفات الحقيقية للمتجر إذا كانت متوفرة */}
            <div className="text-center text-gray-400">
              لا توجد بيانات تصنيفات حقيقية
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                All Products
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsLoading ? (
                <div className="text-center text-gray-400 col-span-full">
                  جاري تحميل المنتجات...
                </div>
              ) : productsError ? (
                <div className="text-center text-red-500 col-span-full">
                  حدث خطأ أثناء جلب المنتجات: {productsError.message}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center text-gray-400 col-span-full">
                  لا توجد منتجات لهذا المتجر
                </div>
              ) : (
                products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
