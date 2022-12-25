import { useState } from "react";
import { FormRow } from "../";
import { useAuthContext } from "../../contexts";
import VerificationMessage from "./VerificationMessage";

const authFormData = {
  name: "",
  email: "",
  password: "",
};

const AuthForm: React.FC = () => {
  const {
    isUser,
    errorMessage,
    registrationEmailSend,
    handleLogInOrRegisterForm,
    showLogInOrRegisterForm,

    toggleShowForgotPasswordForm,
  } = useAuthContext();
  const [authForm, setAuthForm] = useState(authFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setAuthForm({ ...authForm, [name]: value });
  };

  const submitAuthForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (isUser) {
      handleLogInOrRegisterForm({
        authForm,
        endPoint: "login",
      });
    } else {
      handleLogInOrRegisterForm({
        authForm,
        endPoint: "register",
      });
    }
  };

  if (registrationEmailSend) return <VerificationMessage />;

  return (
    <form className='flex flex-col gap-4 max-w-xs m-auto w-full'>
      <h2 className='text-center text-[36px] font-bold capitalize'>
        {isUser ? "login" : "register"}
      </h2>
      {!isUser && (
        <FormRow
          name={"name"}
          type={"text"}
          value={authForm.name}
          formName={""}
          handleChange={handleInputChange}
        />
      )}
      <FormRow
        name={"email"}
        type={"text"}
        value={authForm.email}
        formName={""}
        handleChange={handleInputChange}
      />
      <div>
        <FormRow
          name={"password"}
          type={"password"}
          value={authForm.password}
          formName={""}
          handleChange={handleInputChange}
        />
        {isUser && (
          <button
            onClick={toggleShowForgotPasswordForm}
            className='text-blue-700 text-[14px] mt-2'
          >
            Forgot your password?
          </button>
        )}
      </div>
      {errorMessage && (
        <div className='border p-1 text-center border-red-700 rounded-sm text-red-700'>
          <p>{errorMessage}</p>
        </div>
      )}
      <button onClick={submitAuthForm} className='btn-primary cursor-pointer'>
        {!isUser ? "register" : "login"}
      </button>
      <button className='cursor-pointer'>
        {isUser ? "Don't have an account yet?" : "Already have an account"}
        {", "}
        <span onClick={showLogInOrRegisterForm} className='text-blue-700'>
          {isUser ? "register" : "login"}.
        </span>
      </button>
    </form>
  );
};

export default AuthForm;
