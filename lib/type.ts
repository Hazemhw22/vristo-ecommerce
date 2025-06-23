interface Category {
  id: number;
  desc: string;
  title: string;
  created_at: string;
}

interface Shop {
  shop_name: string;
}

interface Product {
  id: number;
  created_at: string;
  shop: number;
  title: string;
  desc: string;
  price: number;
  images: string[];
  category: number | null;
  sale_price?: number | null;
  discount_type?: "percentage" | "fixed" | null;
  discount_value?: number | null;
  discount_start?: string | null;
  discount_end?: string | null;
  active: boolean;
  shops?: {
    shop_name: string;
  };
  categories?: Category;
}
