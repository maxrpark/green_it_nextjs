import { useState, useRef } from "react";
import { FormRow, Spinner } from "../";
import { useAuthContext } from "../../contexts";

const authFormData = {
  email: "",
};

const ForgotPasswordForm: React.FC = () => {
  const {
    toggleShowForgotPasswordForm,
    backToRegisterForm,
    forgotPassword,
    isLoading,
    resetPasswordEmailSend,
  } = useAuthContext();
  const [authForm, setAuthForm] = useState(authFormData);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setAuthForm({ email: value });
  };

  const submitAuthForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authForm.email) {
      setErrorMessage("Please enter an email");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }

    forgotPassword(authForm.email);
  };

  if (resetPasswordEmailSend) {
    return (
      <div className='flex flex-col gap-4 max-w-xs m-auto w-full'>
        <h2 className='text-center text-[36px] font-bold capitalize'>
          We had send you en email
        </h2>

        <p className='text-center'>
          Please check your email and follow the instructions to reset your
          password
        </p>
        <button
          onClick={toggleShowForgotPasswordForm}
          className='text-blue-700 cursor-pointer'
        >
          Return to sign in
        </button>
      </div>
    );
  }
  return (
    <div>
      <form className='flex flex-col gap-4 max-w-xs m-auto w-full'>
        <h2 className='text-center text-[36px] font-bold capitalize'>
          Reset your password
        </h2>

        <p>
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </p>

        <FormRow
          name={"email"}
          type={"text"}
          value={authForm.email}
          formName={""}
          handleChange={handleInputChange}
        />

        {errorMessage && (
          <div className='border p-1 text-center border-red-700 rounded-sm text-red-700'>
            <p>{errorMessage}</p>
          </div>
        )}
        <button onClick={submitAuthForm} className='btn-primary'>
          {isLoading ? <Spinner /> : "Continue"}
        </button>
      </form>
      <div className='flex justify-center flex-col gap-4 mt-4'>
        <button
          onClick={toggleShowForgotPasswordForm}
          className='text-blue-700 cursor-pointer'
        >
          Return to sign in
        </button>
        <button onClick={backToRegisterForm}>
          Don't have an account?
          <span className='text-blue-700 cursor-pointer'> Sign up</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
