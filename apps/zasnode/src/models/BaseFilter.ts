export interface BaseFilter {
  
  pageNumber?: number;
  pageSize?: number;
  orderBy?: "asc" | "desc";
  search?: string;
  
}