export interface Category {
  id: number;
  title: string;
  desc: string;
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

export interface Shop {
  id: number;
  created_at: string;
  owner: string; // This is a UUID string
  shop_name: string;
  shop_desc: string;
  logo_url: string | null;
  cover_image_url: string | null;
  public: boolean;
  status: string;
  statusDropdownOpen?: boolean;
  address?: string;
  work_hours?: string[];
  phone_numbers?: string[];
  category_id?: number | null;
  gallery?: string[];
  latitude?: number | null;
  longitude?: number | null;
  profiles?: {
    full_name: string;
    email?: string;
  };
}
