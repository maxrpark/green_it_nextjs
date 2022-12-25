import { useContext, createContext, useReducer, FC, ReactNode } from "react";
import axios from "axios";
import { ProductInterface } from "../ts";
import admin_reducer from "../reducers/admin_reducer";
import ActionsTypes from "../ts/interfaces/states/actionsTypes";
import { AdminInitialState } from "../ts/interfaces/states/";
import { toastFunc } from "../utils/functions/ToastFunction";
import { UpdateProductPayload } from "../ts";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

interface AdminContext extends AdminInitialState {
  updateProduct({ id, createNew }: UpdateProductPayload): void;
  setSelectedProduct(data: ProductInterface): void;
  updateProductDetails(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void;
  onUpLoadImg(e: React.ChangeEvent<HTMLInputElement>): void;
  deleteProduct(id: string): void;
}

const AdminContext = createContext({} as AdminContext);

const initialState: AdminInitialState = {
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
  prevImagID: "",
  isUploading: false,
  categories: [
    "plants",
    "decoration",
    "tools",
    "care",
    "seeds",
    "pots",
    "more",
  ],
  types: ["indoor", "bushes", "flowers", "trees", "cactus", "outdoor"],
};

export const AdminProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(admin_reducer, initialState);
  const router = useRouter();
  const setSelectedProduct = (data: ProductInterface) => {
    dispatch({
      type: ActionsTypes.SET_SELECTED_PRODUCT,
      payload: data,
    });
  };

  const updateProductDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let name = e.target.name;
    let value: string | boolean | number = e.target.value;

    if (name === "available" || name === "featured") {
      let checked = (e.target as HTMLInputElement).checked;
      value = checked;
    }
    if (name === "stock" || name === "price") {
      value = Number(value);
      console.log(value);
    }
    dispatch({
      type: ActionsTypes.UPDATE_PRODUCT_DETAILS,
      payload: { name: [name], value },
    });
  };

  const updateProduct = async ({ id, createNew }: UpdateProductPayload) => {
    if (
      !state.selectedProduct.image ||
      !state.selectedProduct.short_desc ||
      !state.selectedProduct.long_description ||
      !state.selectedProduct.price ||
      !state.selectedProduct.category ||
      !state.selectedProduct.type ||
      !state.selectedProduct.stock
    ) {
      toastFunc({
        id,
        message: `All fields are required`,
        type: "error",
      });
      return;
    }
    if (!createNew) {
      try {
        dispatch({
          type: ActionsTypes.UPDATING_PRODUCT_STARTED,
        });
        const { data } = await axios.patch(
          `/api/products/${id}`,
          state.selectedProduct
        );

        toastFunc({
          id,
          message: `${state.selectedProduct.name} updated`,
        });

        dispatch({
          type: ActionsTypes.UPDATING_PRODUCT_END,
        });
      } catch (error: any) {
        dispatch({
          type: ActionsTypes.UPDATING_PRODUCT_END,
        });
        console.log(error);
        toastFunc({
          id,
          message: error.response.data.msg,
          type: "error",
        });
      }
    } else {
      try {
        dispatch({
          type: ActionsTypes.UPDATING_PRODUCT_STARTED,
        });
        const { data } = await axios.post(
          `/api/products/`,
          state.selectedProduct
        );

        dispatch({
          type: ActionsTypes.UPDATING_PRODUCT_END,
        });

        toastFunc({
          id,
          message: `${state.selectedProduct.name} created`,
        });
      } catch (error) {
        toastFunc({
          id,
          message: `Something when wrong please try again later`,
          type: "error",
        });
        dispatch({
          type: ActionsTypes.UPDATING_PRODUCT_END,
        });
      }
    }
  };

  const onUpLoadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let prevImg = state.selectedProduct.image;
    let prevImagID = prevImg
      .substring(prevImg.lastIndexOf("/") + 1)
      .split(".")[0];

    dispatch({
      type: ActionsTypes.UPDATE_PRODUCT_IMAGE_STARTED,
    });

    let imageValue;
    const imageFile = e.target.files![0];
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post(`/api/products/upload-img`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      imageValue = src;

      dispatch({
        type: ActionsTypes.UPDATE_PRODUCT_IMAGE,
        payload: imageValue,
      });

      toastFunc({
        id: "imageSuccess",
        message: "Image updated",
      });
      deletedImage(prevImagID);

      dispatch({
        type: ActionsTypes.UPDATING_PRODUCT_END,
      });
    } catch (error: any) {
      imageValue = null;

      toastFunc({
        id: "error",
        message: error.response.data.msg,
        type: "error",
      });
      dispatch({
        type: ActionsTypes.UPDATING_PRODUCT_END,
      });
    }
  };
  const deletedImage = async (id: string) => {
    try {
      await axios.delete(`/api/products/delete-image/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      dispatch({
        type: ActionsTypes.DELETE_PRODUCT_START,
      });
      await axios.delete(`/api/products/${id}`);
      router.push("/dashboard/products");
      dispatch({
        type: ActionsTypes.DELETE_PRODUCT_END,
      });
      toastFunc({
        id: "deleted",
        message: "Product Deleted",
        type: "success",
      });
    } catch (error: any) {
      dispatch({
        type: ActionsTypes.DELETE_PRODUCT_ERROR,
      });
      toastFunc({
        id: "error",
        message: error.response.data.msg,
        type: "error",
      });
    }
  };
  return (
    <AdminContext.Provider
      value={{
        ...state,
        updateProduct,
        setSelectedProduct,
        updateProductDetails,
        onUpLoadImg,
        deleteProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
