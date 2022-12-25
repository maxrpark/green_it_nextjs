import { ChangeEvent, useState, useEffect } from "react";
import { FormRow } from "../";
import { useCartContext } from "../../contexts/useCartContext";

const checkoutUserDetails = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  city: "",
  state: "",
  code: "",
};

const CheckoutForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState(checkoutUserDetails);
  const [canSubmit, setCanSubmit] = useState(false);
  const { toggleCheckOutButton, checkoutFormBtn } = useCartContext();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });

    // for (key in userDetails)
  };

  const canSubmitForm = () => {
    if (
      userDetails.firstName.length &&
      userDetails.lastName.length &&
      userDetails.address.length &&
      userDetails.email.length &&
      userDetails.city.length &&
      userDetails.state.length &&
      userDetails.code.length
    ) {
      toggleCheckOutButton(true);
    } else {
      if (checkoutFormBtn) {
        toggleCheckOutButton(false);
      }
    }
  };

  useEffect(() => {
    canSubmitForm();
  }, [userDetails]);

  return (
    <div className='flex flex-col gap-6 w-full'>
      <FormRow
        name={"firstName"}
        type={"text"}
        value={userDetails.firstName}
        formName={""}
        labelText='name'
        handleChange={handleFormChange}
      />
      <FormRow
        name={"lastName"}
        type={"text"}
        value={userDetails.lastName}
        formName={""}
        labelText='surname'
        handleChange={handleFormChange}
      />
      <FormRow
        name={"address"}
        type={"text"}
        value={userDetails.address}
        formName={""}
        handleChange={handleFormChange}
      />
      <FormRow
        name={"email"}
        type={"email"}
        value={userDetails.email}
        formName={""}
        handleChange={handleFormChange}
      />
      <div className='flex flex-wrap gap-4 w-full '>
        <FormRow
          name={"city"}
          type={"text"}
          value={userDetails.city}
          formName={""}
          handleChange={handleFormChange}
        />
        <FormRow
          name={"state"}
          type={"text"}
          value={userDetails.state}
          formName={""}
          handleChange={handleFormChange}
        />
        <FormRow
          name={"code"}
          type={"text"}
          value={userDetails.code}
          formName={""}
          handleChange={handleFormChange}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
