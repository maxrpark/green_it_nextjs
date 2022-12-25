import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { OrderDetails } from "../../ts/interfaces/globalInterfaces";
import CheckoutItems from "./CheckoutItems";
import OrderTotalsDetail from "./OrderTotalsDetail";
import StripeCheckout from "./StripeCheckout";

import { loadStripe } from "@stripe/stripe-js";

let stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Props {
  orderDetails: OrderDetails;
}

const CheckoutDetails: React.FC<Props> = ({ orderDetails }) => {
  return (
    <div className='bg-white p-2 w-full lg:max-w-[358px] h-fit'>
      <CheckoutItems orderItems={orderDetails.orderItems} />
      <OrderTotalsDetail
        total={orderDetails.total}
        subtotal={orderDetails.subtotal}
      />
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: orderDetails.clientSecret }}
      >
        <StripeCheckout orderDetails={orderDetails} />
      </Elements>
    </div>
  );
};

export default CheckoutDetails;
