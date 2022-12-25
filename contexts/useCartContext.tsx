import React, {
  useContext,
  useReducer,
  useEffect,
  FC,
  createContext,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import cart_reducer from "../reducers/cart_reducer";
import axios from "axios";
import Cookies from "js-cookie";

import { ActionsTypes, CartInitialState } from "../ts/interfaces/states";
import { SingleItemOrderInf } from "../ts/";
import { OrderDetails } from "../ts/";
import { toastFunc } from "../utils/functions/ToastFunction";

const cart_name = "cart-green-it";
let getLocalStorage = () => {
  if (typeof window !== "undefined") {
    let cart = localStorage.getItem(cart_name);

    if (cart) {
      return JSON.parse(localStorage.getItem(cart_name) as string);
    } else {
      return [];
    }
  }
};

interface Props {
  children: ReactNode;
}

interface CartContext extends CartInitialState {
  addToCart: (item: SingleItemOrderInf) => void;
  removeCartItem: (_id: string) => void;
  toggleAmount: (_id: string, type: string) => void;
  createPaymentIntent: (cart: SingleItemOrderInf[]) => void;
  createOrder: (payload: OrderDetails) => void;
  removeCookie: (payload: string) => void;
  toggleCheckOutButton: (payload: boolean) => void;
}

const initialState: CartInitialState = {
  cart: getLocalStorage(),
  total_amount: 0,
  total_items: 0,
  discount: 0,
  shippingCost: 0,
  hasDiscount: false,
  checkoutFormBtn: false,
  isLoading: false,
};

const CartContext = createContext({} as CartContext);

export const CartProvider: FC<Props> = ({ children }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(
    cart_reducer,
    initialState as CartInitialState
  );

  const addToCart = (item: SingleItemOrderInf) => {
    dispatch({ type: ActionsTypes.ADD_TO_CART, payload: item });
    toastFunc({
      id: item._id!,
      message: `${item.amount} ${item.name} add to cart`,
    });
  };

  const removeCartItem = (_id: string) => {
    dispatch({ type: ActionsTypes.REMOVE_CART_ITEM, payload: _id });
    toastFunc({
      id: _id!,
      message: `Item removed`,
      type: "error",
    });
  };

  const toggleAmount = (_id: string, type: string) => {
    dispatch({ type: ActionsTypes.TOGGLE_ITEM_AMOUNT, payload: { _id, type } });
  };

  const toggleCheckOutButton = (payload: boolean) => {
    dispatch({ type: ActionsTypes.TOGGLE_CHECKOUT_BUTTON, payload });
  };

  const createPaymentIntent = async (cart: SingleItemOrderInf[]) => {
    dispatch({ type: ActionsTypes.TOGGLE_CART_LOADING });
    const productItems = cart.map((item) => {
      return {
        product: item._id,
        amount: item.amount,
      };
    });
    const payload = { productItems };
    Cookies.set("productItems", JSON.stringify(payload));
    dispatch({ type: ActionsTypes.TOGGLE_CART_LOADING });
    router.push("/checkout");
  };

  const createOrder = async (payload: OrderDetails) => {
    try {
      const { data } = await axios.post("api/orders/", payload);
      dispatch({ type: ActionsTypes.ORDER_COMPLETED });
      router.push(`/order-completed/${data._id}`);
      removeCookie("productItems");
    } catch (error) {
      console.log(error);
    }
  };

  const removeCookie = (cookieName: string) => {
    Cookies.remove(cookieName);
  };

  useEffect(() => {
    dispatch({ type: ActionsTypes.COUNT_CART_TOTALS });
    localStorage.setItem(cart_name, JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeCartItem,
        toggleAmount,
        createPaymentIntent,
        createOrder,
        removeCookie,
        toggleCheckOutButton,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
