import { useContext, useReducer, createContext, ReactNode } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import auth_reducer from "../reducers/auth_reducer";
import { ActionsTypes, UserInitialState } from "../ts/interfaces/states";
import { UserPayload } from "../ts/";
import { toastFunc } from "../utils/functions/ToastFunction";

interface Props {
  children: ReactNode;
}

interface UpdateNameAndNameInt {
  name: string;
  email: string;
}
interface UpdatePasswordInt {
  oldPassword: string;
  newPassword: string;
}
interface UpdateUserParams {
  data: UpdateNameAndNameInt | UpdatePasswordInt;
  endPoint: string;
}

interface FormParams {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormParams {
  authForm: FormParams;
  endPoint: string;
}
interface ResetPasswordParams {
  token: string;
  email: string;
  password: string;
}
interface ResetPasswordParams {
  token: string;
  email: string;
  password: string;
}

interface AuthContext extends UserInitialState {
  showMe: () => void;
  logout: () => void;
  handleLogInOrRegisterForm: (payload: AuthFormParams) => void; // TODO
  updateUser: (payload: UpdateUserParams) => void;
  showLogInOrRegisterForm: () => void;
  toggleShowForgotPasswordForm: () => void;
  backToRegisterForm: () => void;
  forgotPassword: (email: string) => void;
  resetPassword: ({ email, token, password }: ResetPasswordParams) => void;
  logInTestAccounts: (email: string) => void;
}

const AuthContext = createContext({} as AuthContext);

const initialState: UserInitialState = {
  user: {} as UserPayload,
  isUser: true,
  errorMessage: "",
  isLoading: false,
  registrationEmailSend: false,
  resetPasswordEmailSend: false,
  showResetPasswordForm: false,
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    auth_reducer,
    initialState as UserInitialState
  );

  const router = useRouter();

  const handleLogInOrRegisterForm = async (payload: AuthFormParams) => {
    const {
      authForm: { email, name, password },
      endPoint,
    } = payload;

    if (
      !password ||
      !email ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      alertMessage("All fields are required");
      return;
    }

    if (endPoint === "register" && name && name.trim().length > 0) {
      try {
        dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });

        const { data } = await axios.post(
          `/api/auth/register`,
          payload.authForm
        );
        console.log(data);

        dispatch({ type: ActionsTypes.REGISTRATION_SUCCESSES });
      } catch (error) {
        console.log(error);
        alertMessage(
          "Something went wrong, please reload the page and try again."
        );
        dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });
      }
      return;
    }

    try {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });

      const { data } = await axios.post(
        `api/auth/${payload.endPoint}`,
        payload.authForm
      );
      dispatch({ type: ActionsTypes.SET_USER, payload: data.user! });
      if (data.user?.role == "admin") return router.push("/dashboard");
      router.push("/my-profile");
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });
      alertMessage(error.response.data.msg);
    }
  };
  const logInTestAccounts = async (email: string) => {
    try {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });
      const { data } = await axios.post(`api/auth/login`, {
        email,
        password: "secret",
      });
      dispatch({ type: ActionsTypes.SET_USER, payload: data.user! });
      if (data.user?.role == "admin" || data.user?.role == "supervisor")
        return router.push("/dashboard");
      router.push("/my-profile");
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });
      alertMessage(error.response.data.msg);
    }
  };

  const showLogInOrRegisterForm = () => {
    dispatch({ type: ActionsTypes.TOGGLE_AUTH_FORM });
  };

  const showMe = async () => {
    try {
      const { data } = await axios("/api/users/show-me");
      dispatch({ type: ActionsTypes.SET_USER, payload: data.user });
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.delete("/api/auth/logout");
      dispatch({ type: ActionsTypes.USER_LOGGED_OUT });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const toggleShowForgotPasswordForm = () => {
    dispatch({ type: ActionsTypes.TOGGLE_SHOW_FORGOT_PASSWORD_FORM });
  };
  const backToRegisterForm = () => {
    dispatch({ type: ActionsTypes.SHOW_REGISTRATION_FORM });
  };

  const updateUser = async (payload: UpdateUserParams) => {
    try {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });

      const { data } = await axios.post(
        `/api/users${payload.endPoint}`,
        payload.data
      );

      if (data.user)
        dispatch({ type: ActionsTypes.SET_USER, payload: data.user });

      toastFunc({
        id: data.user!.userId!,
        message: `Updated!`,
      });
    } catch (error: any) {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });

      toastFunc({
        id: "error",
        message: error.response.data.msg,
        type: "error",
      });

      console.log(error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });
      const { data } = await axios.post(`/api/auth/forgot-password`, {
        email,
      });
      console.log(data.msg);
      dispatch({ type: ActionsTypes.SENT_PASSWORD_EMAIL });
    } catch (error: any) {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });
      console.log(error);
    }
  };
  const resetPassword = async ({
    email,
    token,
    password,
  }: ResetPasswordParams) => {
    try {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });

      const { data } = await axios.post(`/api/auth/reset-password`, {
        email,
        token,
        password,
      });
      console.log(data.msg);
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });
    } catch (error: any) {
      dispatch({ type: ActionsTypes.TOGGLE_IS_LOADING });

      console.log(error);
    }
  };

  const alertMessage = (message: string) => {
    dispatch({
      type: ActionsTypes.AUTH_ERROR_MESSAGE,
      payload: message,
    });
    setTimeout(() => {
      dispatch({
        type: ActionsTypes.AUTH_ERROR_MESSAGE,
        payload: "",
      });
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        showMe,
        logout,
        handleLogInOrRegisterForm,
        updateUser,
        toggleShowForgotPasswordForm,
        backToRegisterForm,
        showLogInOrRegisterForm,
        resetPassword,
        forgotPassword,
        logInTestAccounts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
