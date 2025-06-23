interface Category {
  id: number;
  desc: string;
  title: string;
  created_at: string;
}

export interface Product {
  id: string;
  created_at: string;
  shop: string;
  title: string;
  desc: string;
  price: string;
  images: string[];
  category: number | null;
  shops?: { shop_name: string };
  categories?: Category;
  sale_price?: number | null;
  discount_type?: "percentage" | "fixed" | null;
  discount_value?: number | null;
  discount_start?: string | null;
  discount_end?: string | null;
  active: boolean;
  rating?: number;
  reviews?: number;
}
