import {
  AdminInitialState,
  AdminActions,
  ActionsTypes,
} from "../ts/interfaces/states/";
const admin_reducer = (
  state: AdminInitialState,
  action: AdminActions
): AdminInitialState => {
  switch (action.type) {
    case ActionsTypes.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };

    case ActionsTypes.UPDATE_PRODUCT_DETAILS:
      const { name, value } = action.payload;

      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          // @ts-ignore
          [name]: value,
        },
      };
    case ActionsTypes.UPDATE_PRODUCT_IMAGE_STARTED:
      return {
        ...state,
        isUploading: true,
      };
    case ActionsTypes.UPDATE_PRODUCT_IMAGE:
      return {
        ...state,
        selectedProduct: { ...state.selectedProduct, image: action.payload },
        isUploading: false,
      };
    case ActionsTypes.UPDATING_PRODUCT_STARTED:
      return {
        ...state,
        isUploading: true,
      };
    case ActionsTypes.UPDATING_PRODUCT_END:
      return {
        ...state,
        isUploading: false,
      };

    case ActionsTypes.DELETE_PRODUCT_START:
      return { ...state, isUploading: true };

    case ActionsTypes.DELETE_PRODUCT_END:
      return {
        ...state,
        isUploading: false,
        selectedProduct: {
          _id: "",
          name: "",
          image: "",
          short_desc: "",
          long_description: "",
          price: 0,
          stock: 0,
          type: "",
          category: "",
          available: false,
          featured: false,
        },
      };

    case ActionsTypes.DELETE_PRODUCT_ERROR:
      return { ...state, isUploading: false };

    default:
      return state;
  }
};

export default admin_reducer;
