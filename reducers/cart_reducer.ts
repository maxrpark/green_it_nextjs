import { SingleItemOrderInf } from "../ts/";
import { ActionsTypes, CartActions } from "../ts/interfaces/states";
import { CartInitialState } from "../ts/interfaces/states";

const cart_reducer = (
  state: CartInitialState,
  action: CartActions
): CartInitialState => {
  switch (action.type) {
    case ActionsTypes.ADD_TO_CART:
      const item = action.payload;
      const tempItem = state.cart.find(
        (product: SingleItemOrderInf) => product._id === item._id
      );

      if (tempItem) {
        const tempCart = state.cart.map((product: SingleItemOrderInf) => {
          if (product._id == item._id) {
            let newAmount = item.amount + product.amount;
            return { ...product, amount: newAmount };
          } else {
            return product;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        return { ...state, cart: [...state.cart, item] };
      }

    case ActionsTypes.TOGGLE_ITEM_AMOUNT:
      const { _id, type } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item._id === _id) {
          if (type == "inc") return { ...item, amount: item.amount + 1 };
          else {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });
      return { ...state, cart: updatedCart };

    case ActionsTypes.REMOVE_CART_ITEM:
      const newCartState = state.cart.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, cart: newCartState };

    case ActionsTypes.COUNT_CART_TOTALS:
      const { total_amount, total_items } = state.cart.reduce(
        (
          total: { total_amount: number; total_items: number },
          item: SingleItemOrderInf
        ) => {
          const { amount, price } = item;
          total.total_items += amount;
          total.total_amount += +price * amount;
          return total;
        },
        { total_amount: 0, total_items: 0 }
      );
      return { ...state, total_amount, total_items };
    case ActionsTypes.TOGGLE_CHECKOUT_BUTTON:
      return {
        ...state,
        checkoutFormBtn: action.payload,
      };
    case ActionsTypes.ORDER_COMPLETED:
      return {
        ...state,
        cart: [],
        discount: 0,
        shippingCost: 0,
        hasDiscount: false,
      };
    default:
      return state;
  }
};

export default cart_reducer;
