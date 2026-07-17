export interface ProductImage {
  src: string;
  alt: string;
  shadeName?: string;
  hex?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  skin?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: Review[];
  badge?: string;
  benefits: string[];
  description: string;
  longDescription: string;
  howToUse: string[];
  keyIngredients: { name: string; benefit: string }[];
  images: ProductImage[];
  theme: "rose" | "sage" | "cream";
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedImage?: ProductImage;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  date: string;
  image: string;
  author: { name: string; role: string };
  body: string;
}
