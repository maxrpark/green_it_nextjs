import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useCartContext } from "../../contexts";
import { OrderDetails } from "../../ts";

import Spinner from "../ui/Spinner";

interface Props {
  orderDetails: OrderDetails;
}

const CheckoutForm: React.FC<Props> = ({ orderDetails }) => {
  const { createOrder, checkoutFormBtn } = useCartContext();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setIsError(false);
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { paymentIntent } = await stripe.confirmCardPayment(
        orderDetails.clientSecret!,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );
      try {
      } catch (error) {}
      switch (paymentIntent?.status) {
        case "succeeded":
          setIsSuccess(true);
          createOrder(orderDetails);
          setMessage("Payment succeeded! Soon you will be redirected");

          break;
        case "processing":
          setMessage("Your payment is processing.");
          setIsError(true);
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setIsError(true);
          break;
        default:
          setMessage("Something went wrong. Check all values and try again.");
          setIsError(true);
          break;
      }
    } else {
      setMessage("All fields are required");
      setIsError(true);
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
    setIsLoading(false);
  };

  return (
    <>
      <CardElement className='border border-black rounded py-4 px-2' />
      <button
        className={` w-full btn-primary disabled:bg-light-gray my-2 !rounded`}
        disabled={
          isLoading || !stripe || !elements || isSuccess || !checkoutFormBtn
        }
        id='submit'
        onClick={handleSubmit}
      >
        <span id='button-text'>{isLoading ? <Spinner /> : "Pay now"}</span>
      </button>
      {message && (
        <div
          className={`${
            isError ? " text-red-400 " : "text-green-900"
          }flex justify-center items-center text-center`}
          id='payment-message'
        >
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
