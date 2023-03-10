import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JHucUDiAllCcvOroF7e5ZIpHqOvxHIpbni3clXYK81SpQXBJfKTLhzH77amZLPAjxJEk23LaIbobBkKWwWbP9S700mV9qZdFN"
);

const Payment = () => {
  const { id } = useParams();
  const url = `https://manufacturer-website-indus-server.onrender.com/orders/${id}`;

  const { data: order, isLoading } = useQuery(["orders", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="container mx-auto">
      <div class="card flex-shrink-0 w-50 max-w-md bg-base-100 shadow-xl">
        <figure>
          <img src={order.image} alt="Shoes" className="w-80" />
        </figure>
        <div class="card-body">
          <h2 class="card-title font-saira text-2xl text-accent">
            {order.name}
          </h2>
          <p className="font-roboto text-neutral">
            <span className="font-bold text-accent">Order Quantity:</span>
            {order.quantity}
          </p>
          <p className="font-roboto text-neutral">
            <span className="font-bold text-accent">Price:</span> ${order.price}
          </p>
        </div>
      </div>
      <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100 mt-4">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
