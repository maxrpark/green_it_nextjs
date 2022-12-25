import ActionsTypes from "../actionsTypes";
import { UserPayload } from "../../../../ts/";

interface SET_USER {
  type: ActionsTypes.SET_USER;
  payload: UserPayload;
}

interface USER_LOGGED_OUT {
  type: ActionsTypes.USER_LOGGED_OUT;
}

interface AUTH_ERROR_MESSAGE {
  type: ActionsTypes.AUTH_ERROR_MESSAGE;
  payload: string;
}
interface REGISTRATION_SUCCESSES {
  type: ActionsTypes.REGISTRATION_SUCCESSES;
}

interface TOGGLE_SHOW_FORGOT_PASSWORD_FORM {
  type: ActionsTypes.TOGGLE_SHOW_FORGOT_PASSWORD_FORM;
}
interface SHOW_REGISTRATION_FORM {
  type: ActionsTypes.SHOW_REGISTRATION_FORM;
}
interface TOGGLE_AUTH_FORM {
  type: ActionsTypes.TOGGLE_AUTH_FORM;
}
interface TOGGLE_IS_LOADING {
  type: ActionsTypes.TOGGLE_IS_LOADING;
}
interface SENT_PASSWORD_EMAIL {
  type: ActionsTypes.SENT_PASSWORD_EMAIL;
}

type AuthActions =
  | SET_USER
  | USER_LOGGED_OUT
  | AUTH_ERROR_MESSAGE
  | REGISTRATION_SUCCESSES
  | TOGGLE_SHOW_FORGOT_PASSWORD_FORM
  | SHOW_REGISTRATION_FORM
  | TOGGLE_AUTH_FORM
  | TOGGLE_IS_LOADING
  | SENT_PASSWORD_EMAIL;

export default AuthActions;
