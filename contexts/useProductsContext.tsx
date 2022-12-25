import {
  useContext,
  useReducer,
  ReactNode,
  createContext,
  FC,
  useEffect,
} from "react";
import products_reducer from "../reducers/products_reducer";
import { ActionsTypes, ProductsInitialState } from "../ts/interfaces/states";
import { ProductsPagePayload } from "../ts/interfaces/states/actions/productsActions";
import { productsFetch } from "../axios";
interface Props {
  children: ReactNode;
}
interface UpdateFiltersParams {
  name: string;
  value: string;
}

interface ProductContext extends ProductsInitialState {
  productsPageInitialData: ({
    totalNumberOfPages,
    productsList,
  }: ProductsPagePayload) => void;
  productsPagination: (pageNumber: number) => void;
  setFilterOnLoad: ({ name, value }: UpdateFiltersParams) => void;
  updateFilters: ({ name, value }: UpdateFiltersParams) => void;
}

const InitialState: ProductsInitialState = {
  totalProducts: 12,
  numberOfPages: 1,
  currentPage: 1,
  products: [],
  filters: {
    category: "all",
    type: "all",
    name: "",
  },
  categories: [
    "all",
    "plants",
    "decoration",
    "tools",
    "care",
    "seeds",
    "pots",
    "more",
  ],
  types: ["all", "indoor", "bushes", "flowers", "trees", "cactus", "outdoor"],
};

const ProductsContext = createContext({} as ProductContext);

export const ProductsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, InitialState);

  const productsPageInitialData = ({
    totalNumberOfPages,
    productsList,
  }: ProductsPagePayload) => {
    dispatch({
      type: ActionsTypes.PRODUCT_PAGE_DATA,
      payload: { totalNumberOfPages, productsList },
    });
  };

  const productsPagination = async (pageNumber: number) => {
    try {
      const res = await productsFetch(
        `/?type=${state.filters.type}&category=${state.filters.category}&page=${pageNumber}&limit=12`
      );
      const productsList = await res.data.products;
      dispatch({
        type: ActionsTypes.PRODUCTS_PAGINATION,
        payload: { pageNumber, productsList },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const setFilterOnLoad = ({ name, value }: UpdateFiltersParams) => {
    let updateValue = {
      [name]: value,
    };
    dispatch({
      type: ActionsTypes.UPDATE_FILTER_ON_LOAD,
      payload: updateValue,
    });
  };

  const updateFilters = async ({ name, value }: UpdateFiltersParams) => {
    let category = state.filters.category;
    let type = state.filters.type;
    let query = state.filters.name;

    if (name === "category") {
      category = value;
    }
    if (name === "type") {
      type = value;
    }
    if (name == "name") {
      query = value;
    }

    let updateValue = {
      [name]: value,
    };

    try {
      let url = `/?category=${category}&type=${type}&page=1&limit=12`;
      if (query) {
        console.log(query);

        url = `/?category=${category}&type=${type}&name=${query}&page=1&limit=12`;
      }

      const res = await productsFetch(url);
      const data = await res.data;

      dispatch({
        type: ActionsTypes.UPDATE_PRODUCT_LIST,
        payload: {
          products: data.products,
          numberOfPages: data.numberOfPages,
          updateValue,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        productsPageInitialData,
        productsPagination,
        updateFilters,
        setFilterOnLoad,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
