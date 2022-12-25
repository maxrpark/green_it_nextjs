import ActionsTypes from "../actionsTypes";
import { ProductInterface } from "../../../../ts/";

interface SET_SELECTED_PRODUCT {
  type: ActionsTypes.SET_SELECTED_PRODUCT;
  payload: ProductInterface;
}
interface UPDATE_PRODUCT_DETAILS {
  type: ActionsTypes.UPDATE_PRODUCT_DETAILS;
  payload: { name: string | string[]; value: string | number | boolean };
}
interface UPDATE_PRODUCT_IMAGE {
  type: ActionsTypes.UPDATE_PRODUCT_IMAGE;
  payload: string;
}

interface UPDATE_PRODUCT_IMAGE_STARTED {
  type: ActionsTypes.UPDATE_PRODUCT_IMAGE_STARTED;
}
interface UPDATING_PRODUCT_STARTED {
  type: ActionsTypes.UPDATING_PRODUCT_STARTED;
}
interface UPDATING_PRODUCT_END {
  type: ActionsTypes.UPDATING_PRODUCT_END;
}
interface DELETE_PRODUCT_START {
  type: ActionsTypes.DELETE_PRODUCT_START;
}
interface DELETE_PRODUCT_END {
  type: ActionsTypes.DELETE_PRODUCT_END;
}
interface DELETE_PRODUCT_ERROR {
  type: ActionsTypes.DELETE_PRODUCT_ERROR;
}

type AdminActions =
  | SET_SELECTED_PRODUCT
  | UPDATE_PRODUCT_DETAILS
  | UPDATE_PRODUCT_IMAGE
  | UPDATE_PRODUCT_IMAGE_STARTED
  | UPDATING_PRODUCT_STARTED
  | UPDATING_PRODUCT_END
  | DELETE_PRODUCT_START
  | DELETE_PRODUCT_END
  | DELETE_PRODUCT_ERROR;

export default AdminActions;
