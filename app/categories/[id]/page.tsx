"use client";
import { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Grid,
  List,
  Star,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "../../../components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import type { Product, Shop } from "@/lib/type";

type SortOption = "name" | "price-low" | "price-high" | "rating" | "newest";
type ViewMode = "grid" | "list";

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = Number(params?.id as string);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"products" | "shops">("products");

  const itemsPerPage = 12;

  // جلب بيانات الكاتيجوري من قاعدة البيانات
  const [category, setCategory] = useState<{
    id: number;
    title: string;
    desc: string;
  } | null>(null);
  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single()
      .then(({ data }) => {
        setCategory(data);
      });
  }, [categoryId]);

  // جلب المنتجات المرتبطة بالكاتيجوري مع بيانات الشوب
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    supabase
      .from("products")
      .select("*, shops:shops(id,shop_name,logo_url,address)")
      .eq("category", categoryId)
      .then(({ data }) => {
        setProducts(data || []);
      });
  }, [categoryId]);

  // استخراج الشوبس الفريدة المرتبطة بالكاتيجوري
  const shops: Shop[] = useMemo(() => {
    const unique: Record<number, Shop> = {};
    products.forEach((p) => {
      if (
        p.shops &&
        typeof p.shops === "object" &&
        "id" in p.shops &&
        typeof (p.shops as any).id === "number"
      ) {
        unique[(p.shops as any).id] = p.shops as Shop;
      }
    });
    return Object.values(unique);
  }, [products]);

  // استخراج الساب كاتيجوري (إذا كان لديك)
  const subcategories = [...new Set(products.map((p) => p.desc))];

  // فلترة وفرز المنتجات
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.shops?.shop_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ??
          false);

      const price = Number(product.sale_price ?? product.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(product.rating ?? 0);

      // إذا كان لديك subcategory حقيقي غيّر هذا السطر
      const matchesSubcategory =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(product.desc);

      return (
        matchesSearch && matchesPrice && matchesRating && matchesSubcategory
      );
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            Number(a.sale_price ?? a.price) - Number(b.sale_price ?? b.price)
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            Number(b.sale_price ?? b.price) - Number(a.sale_price ?? a.price)
        );
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "name":
      default:
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [
    products,
    searchQuery,
    sortBy,
    priceRange,
    selectedRatings,
    selectedSubcategories,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRatingFilter = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleSubcategoryFilter = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1500]);
    setSelectedRatings([]);
    setSelectedSubcategories([]);
  };

  // Filters Component
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="font-medium mb-3">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingFilter(rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="flex items-center gap-1 text-sm"
              >
                {[...Array(rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategory Filter */}
      <div>
        <h4 className="font-medium mb-3">Subcategories</h4>
        <div className="space-y-2">
          {subcategories.map((subcategory) => (
            <div key={subcategory} className="flex items-center space-x-2">
              <Checkbox
                id={`sub-${subcategory}`}
                checked={selectedSubcategories.includes(subcategory)}
                onCheckedChange={() => handleSubcategoryFilter(subcategory)}
              />
              <label htmlFor={`sub-${subcategory}`} className="text-sm">
                {subcategory}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearAllFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The category you're looking for doesn't exist.
          </p>
          <Link href="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Category Header */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-80" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 sm:gap-4 mb-4">
              <Link href="/categories">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {category.title}
                </h1>
                <p className="text-white/90 text-sm sm:text-lg hidden sm:block">
                  {category.desc}
                </p>
                <Badge className="mt-1 sm:mt-2 bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                  {products.length} Products Available
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs directly under category image */}
      <div className="container mx-auto px-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "products" | "shops")}
          className="w-full mb-8 mt-4"
        >
          <TabsList className="mb-6 flex items-center gap-0 relative">
            {/* Products Tab with Icon */}
            <TabsTrigger
              value="products"
              className="flex items-center gap-2 px-4 py-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Products
            </TabsTrigger>

            {/* Vertical Divider */}
            <span className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2" />

            {/* Shops Tab with Icon */}
            <TabsTrigger
              value="shops"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Store className="h-5 w-5" />
              Shops
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex gap-4 lg:gap-8">
              {/* Desktop Filters Sidebar */}
              <div className="hidden lg:block w-80 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FiltersContent />
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Search and Controls */}
                <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base"
                    />
                  </div>

                  {/* Controls - Mobile Optimized */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
                      {/* Mobile Filters Sheet */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="lg:hidden flex items-center gap-2 whitespace-nowrap"
                          >
                            <Filter className="h-4 w-4" />
                            Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80">
                          <SheetHeader>
                            <SheetTitle className="flex items-center gap-2">
                              <SlidersHorizontal className="h-5 w-5" />
                              Filters
                            </SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <FiltersContent />
                          </div>
                        </SheetContent>
                      </Sheet>

                      <Select
                        value={sortBy}
                        onValueChange={(value: SortOption) => setSortBy(value)}
                      >
                        <SelectTrigger className="w-36 sm:w-48 text-xs sm:text-sm">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name A-Z</SelectItem>
                          <SelectItem value="price-low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high">
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex border rounded-lg">
                        <Button
                          variant={viewMode === "grid" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className="px-2 sm:px-3"
                        >
                          <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className="px-2 sm:px-3"
                        >
                          <List className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-right">
                      Showing {paginatedProducts.length} of{" "}
                      {filteredAndSortedProducts.length} products
                    </div>
                  </div>
                </div>

                {/* Products Grid/List */}
                {paginatedProducts.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No products found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  <div
                    className={`grid gap-3 sm:gap-6 ${
                      viewMode === "grid"
                        ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    }`}
                  >
                    {paginatedProducts.map((product) => {
                      // Omit or properly map the 'categories' property to match the expected type
                      const { categories, ...restProduct } = product;
                      return (
                        <ProductCard
                          key={Number(product.id)}
                          product={{
                            ...restProduct,
                            id: Number(product.id),
                            price: Number(product.price),
                            shop:
                              typeof product.shop === "string"
                                ? Number(product.shop)
                                : product.shop,
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 sm:mt-12">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      size="sm"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>

                    <div className="flex gap-1 sm:gap-2">
                      {Array.from(
                        { length: Math.min(3, totalPages) },
                        (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              onClick={() => handlePageChange(page)}
                              size="sm"
                              className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                            >
                              {page}
                            </Button>
                          );
                        }
                      )}
                      {totalPages > 3 && (
                        <>
                          <span className="flex items-center px-2 text-gray-500">
                            ...
                          </span>
                          <Button
                            variant={
                              currentPage === totalPages ? "default" : "outline"
                            }
                            onClick={() => handlePageChange(totalPages)}
                            size="sm"
                            className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      size="sm"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Shops Tab */}
          <TabsContent value="shops">
            <div className="flex flex-col gap-4">
              {/* Search and Controls for shops */}
              <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search shops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-4">
                    {/* Sort By for shops */}
                    <Select
                      value={sortBy}
                      onValueChange={(value: SortOption) => setSortBy(value)}
                    >
                      <SelectTrigger className="w-36 sm:w-48 text-xs sm:text-sm">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-right">
                    Showing{" "}
                    {
                      shops.filter((shop) =>
                        shop.shop_name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      ).length
                    }{" "}
                    of {shops.length} shops
                  </div>
                </div>
              </div>
              {/* Shops Grid */}
              {shops.length === 0 ? (
                <div className="text-gray-500">
                  No shops found for this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {shops
                    .filter((shop) =>
                      shop.shop_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((shop) => {
                      // حساب عدد المنتجات لكل متجر
                      const shopProductsCount = products.filter(
                        (p) => p.shops && (p.shops as any).id === shop.id
                      ).length;
                      return (
                        <Card
                          key={shop.id}
                          className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-900"
                        >
                          <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border border-gray-300 dark:border-gray-700 bg-gray-100 flex items-center justify-center">
                            <Image
                              src={shop.logo_url || "/placeholder.svg"}
                              alt={shop.shop_name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </div>
                          <div className="font-semibold text-lg text-center">
                            {shop.shop_name}
                          </div>
                          {shop.address && (
                            <div className="text-xs text-gray-500 mt-1 text-center">
                              {shop.address}
                            </div>
                          )}
                          <div className="mt-2 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                            <ShoppingBag className="h-4 w-4" />
                            {shopProductsCount} Products
                          </div>
                          <Link
                            href={`/shops/${shop.id}`}
                            className="mt-3 text-blue-600 hover:underline text-sm font-medium"
                          >
                            View Shop
                          </Link>
                        </Card>
                      );
                    })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
