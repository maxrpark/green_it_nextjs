import ActionsTypes from "../actionsTypes";
import { ProductInterface } from "../../../../ts/";

export interface ProductsPagePayload {
  totalNumberOfPages: number;
  productsList: ProductInterface[];
}
export interface UpdateFilters {
  updateValue: any;
  products: ProductInterface[];
  numberOfPages: number;
}
export interface PaginationPayload {
  pageNumber: number;
  productsList: ProductInterface[];
}

interface PRODUCT_PAGE_DATA {
  type: ActionsTypes.PRODUCT_PAGE_DATA;
  payload: ProductsPagePayload;
}
interface PRODUCTS_PAGINATION {
  type: ActionsTypes.PRODUCTS_PAGINATION;
  payload: PaginationPayload;
}
interface UPDATE_PRODUCT_LIST {
  type: ActionsTypes.UPDATE_PRODUCT_LIST;
  payload: UpdateFilters;
}
interface UPDATE_FILTER_ON_LOAD {
  type: ActionsTypes.UPDATE_FILTER_ON_LOAD;
  payload: any;
}

type ProductsActions =
  | PRODUCT_PAGE_DATA
  | PRODUCTS_PAGINATION
  | UPDATE_PRODUCT_LIST
  | UPDATE_FILTER_ON_LOAD;

export default ProductsActions;
