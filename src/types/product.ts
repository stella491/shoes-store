export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: "men" | "women";
  price: number;
  description: string;
  images: string[];
}

export interface ProductDraft {
  name: string;
  brand: string;
  category: "men" | "women";
  price: string;
  description: string;
  images: string[];
}
