export interface CategoryPayload {
  name: string;
  image?: string;
  active?: boolean;
}

export interface Category extends CategoryPayload {
  _id: string;
  slug: string;
  products?: number;
}

export interface CategoryResponse {
  data: Category[];
  results: number;
  paginationResult: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next?: number;
    prev?: number;
  };
}