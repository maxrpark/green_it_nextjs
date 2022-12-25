import {
  ActionsTypes,
  ProductsInitialState,
  ProductsActions,
} from "../ts/interfaces/states";

const products_reducer = (
  state: ProductsInitialState,
  action: ProductsActions
): ProductsInitialState => {
  switch (action.type) {
    case ActionsTypes.PRODUCT_PAGE_DATA:
      const { totalNumberOfPages, productsList } = action.payload;
      return {
        ...state,
        currentPage: 1,
        numberOfPages: totalNumberOfPages,
        products: productsList,
        filters: {
          category: "all",
          type: "all",
          name: "",
        },
      };
    case ActionsTypes.PRODUCTS_PAGINATION:
      const { pageNumber, productsList: productsPage } = action.payload;
      return {
        ...state,
        currentPage: pageNumber,
        products: productsPage,
      };
    case ActionsTypes.UPDATE_FILTER_ON_LOAD:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case ActionsTypes.UPDATE_PRODUCT_LIST:
      const { products } = action.payload;

      return {
        ...state,
        products,
        currentPage: 1,
        filters: { ...state.filters, ...action.payload.updateValue },
        numberOfPages: action.payload.numberOfPages,
      };
    default:
      return state;
  }
};

export default products_reducer;
