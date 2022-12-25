import {
  ProductInterface,
  SingleItemOrderInf,
  UserPayload,
} from "../../../ts/";

export interface Filters {
  category: string;
  type: string;
  name: string;
}

export interface ProductsInitialState {
  totalProducts: number;
  numberOfPages: number;
  currentPage: number;
  products: ProductInterface[];
  filters: Filters;
  categories: string[];
  types: string[];
}

export interface CartInitialState {
  cart: SingleItemOrderInf[];
  total_amount: number;
  total_items: number;
  discount: number;
  shippingCost: number;
  hasDiscount: boolean;
  checkoutFormBtn: boolean;
  isLoading: boolean;
}

export interface UserInitialState {
  user: UserPayload | null;
  isUser: boolean;
  errorMessage: string;
  registrationEmailSend: boolean;
  resetPasswordEmailSend: boolean;
  isLoading: boolean;
  showResetPasswordForm: boolean;
}

export interface AdminInitialState {
  selectedProduct: ProductInterface;
  prevImagID: string;
  isUploading: boolean;
  categories: string[];
  types: string[];
}

export interface GlobalInitialState {
  showSidebar: boolean;
  showMobileNavBar: boolean;
}
