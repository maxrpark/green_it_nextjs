import ActionsTypes from "../actionsTypes";
import { SingleItemOrderInf } from "../../../../ts/";

interface ToggleAmountPayload {
  type: string;
  _id: string;
}

interface ADD_TO_CART {
  type: ActionsTypes.ADD_TO_CART;
  payload: SingleItemOrderInf;
}
interface COUNT_CART_TOTALS {
  type: ActionsTypes.COUNT_CART_TOTALS;
}
interface REMOVE_CART_ITEM {
  type: ActionsTypes.REMOVE_CART_ITEM;
  payload: string;
}
interface TOGGLE_ITEM_AMOUNT {
  type: ActionsTypes.TOGGLE_ITEM_AMOUNT;
  payload: ToggleAmountPayload;
}
interface ORDER_COMPLETED {
  type: ActionsTypes.ORDER_COMPLETED;
}
interface TOGGLE_CHECKOUT_BUTTON {
  type: ActionsTypes.TOGGLE_CHECKOUT_BUTTON;
  payload: boolean;
}
type CartActions =
  | ADD_TO_CART
  | COUNT_CART_TOTALS
  | REMOVE_CART_ITEM
  | TOGGLE_ITEM_AMOUNT
  | ORDER_COMPLETED
  | TOGGLE_CHECKOUT_BUTTON;

export default CartActions;
