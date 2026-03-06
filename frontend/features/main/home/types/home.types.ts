import { Product } from "../../shop/types/product.types";
export type { Product };
export interface Category {
  _id: string;
  name: string;
  image: string;
}
export interface HomeResponse {
  shopByCategory: Category[];
  newCollections: Product[];
  trendingNow: Product[];
}
