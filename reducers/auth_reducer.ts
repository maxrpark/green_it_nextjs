import {
  ActionsTypes,
  AuthActions,
  UserInitialState,
} from "../ts/interfaces/states";
const auth_reducer = (
  state: UserInitialState,
  action: AuthActions
): UserInitialState => {
  switch (action.type) {
    case ActionsTypes.SET_USER:
      return { ...state, user: action.payload, isLoading: false };

    case ActionsTypes.TOGGLE_IS_LOADING:
      return { ...state, isLoading: !state.isLoading };

    case ActionsTypes.SENT_PASSWORD_EMAIL:
      return {
        ...state,
        resetPasswordEmailSend: !state.resetPasswordEmailSend,
        isLoading: false,
      };

    case ActionsTypes.TOGGLE_AUTH_FORM:
      return { ...state, isUser: !state.isUser };

    case ActionsTypes.USER_LOGGED_OUT:
      return { ...state, user: null };

    case ActionsTypes.REGISTRATION_SUCCESSES:
      return { ...state, registrationEmailSend: true, isLoading: false };

    case ActionsTypes.TOGGLE_SHOW_FORGOT_PASSWORD_FORM:
      return { ...state, showResetPasswordForm: !state.showResetPasswordForm };

    case ActionsTypes.SHOW_REGISTRATION_FORM:
      return { ...state, showResetPasswordForm: false, isUser: false };

    case ActionsTypes.AUTH_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export default auth_reducer;
