import { useState, FormEvent } from "react";
import { FormRow } from "..";
import { UserInterface } from "../../ts/";
import { useAuthContext } from "../../contexts/useAuthContext";
import { toastFunc } from "../../utils/functions/ToastFunction";

const formTemplate = {
  name: "",
  email: "",
  oldPassword: "",
  newPassword: "",
};

interface Props {
  user: UserInterface;
  isEditingPassword?: boolean;
  title: String;
}

const UpdateUserDetailsForm: React.FC<Props> = ({
  user,
  title,
  isEditingPassword = false,
}) => {
  const { updateUser } = useAuthContext();
  const [formData, setFormData] = useState(Object.assign(formTemplate, user));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    let data;
    if (!isEditingPassword) {
      if (
        !formData.name ||
        formData.name.trim().length === 0 ||
        !formData.email ||
        formData.email.trim().length === 0
      ) {
        toastFunc({
          id: "error",
          message: `Please provide name and email.`,
          type: "error",
        });
        return;
      }
      data = {
        name: formData.name,
        email: formData.email,
      };
      updateUser({ data, endPoint: "/update-user" });
    } else {
      if (
        !formData.oldPassword ||
        formData.oldPassword.trim().length === 0 ||
        !formData.newPassword ||
        formData.newPassword.trim().length === 0
      ) {
        toastFunc({
          id: "error",
          message: `Please provide old email and new email.`,
          type: "error",
        });
        return;
      }
      data = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      updateUser({ data, endPoint: "/update-user-password" });
    }
  };
  return (
    <div className='max-w-xl m-auto'>
      <h2 className='mt-9 mb-3 px-2 text-[24px] font-semibold capitalize'>
        {title}
      </h2>
      <form className='flex flex-col gap-3 max-w-xl'>
        {!isEditingPassword ? (
          <>
            <FormRow
              name={"name"}
              type={"text"}
              value={formData.name}
              formName={""}
              handleChange={handleInputChange}
            />

            <FormRow
              name={"email"}
              type={"text"}
              value={formData.email}
              formName={""}
              handleChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <FormRow
              name={"oldPassword"}
              type={"password"}
              value={formData.oldPassword}
              formName={""}
              handleChange={handleInputChange}
            />
            <FormRow
              name={"newPassword"}
              type={"password"}
              value={formData.newPassword}
              formName={""}
              handleChange={handleInputChange}
            />
          </>
        )}
        <button onClick={handleFormSubmit} className='btn-primary'>
          {!isEditingPassword ? "Update details" : "Update password"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserDetailsForm;
