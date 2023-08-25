import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { consoleShow } from "../../../../commonFunction/console";

const inputStyle = {
  // iconColor: "#c4f0ff",
  color: "black",
  fontWeight: "500",
  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
  fontSize: "16px",
  border: "1px solid #ced4da",
  fontSmoothing: "antialiased",
  ":-webkit-autofill": {
    color: "#fce883",
  },
  "::placeholder": {
    color: "#ced4da",
  },
};

export default function PaymentForm({ selectPlan, countryCode }: any) {
  consoleShow("selectPaln: ", selectPlan);
  const uId = localStorage.getItem("userProfile");
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const location = window.location;
  const domain = `${protocol}//${hostname}${
    location.port ? ":" + location.port : ""
  }`;

  const currentUrl = window.location.href;
  const returnUrl = `${domain}/payment/success/done?return_url=${currentUrl}`;

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const { error, paymentMethod }: any = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardNumberElement),
    } as any);

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response: any = await axios.post(
          "https://story.craftyartapp.com/payments/stripe",
          {
            amount: selectPlan?.price * 100,
            id,
            currency: countryCode === "IN" ? "INR" : "USD",
            userId: uId,
            packageId: selectPlan?.id,
            pay_mode: "subs",
            packageName: selectPlan?.package_name,
            returnUrl: returnUrl,
          }
        );

        if (response?.data?.next_action?.redirect_to_url?.url) {
          window.location.href =
            response?.data?.next_action?.redirect_to_url?.url;
          setIsLoading(false);
        }

        if (response.data.success) {
          toast.success("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        consoleShow("Error", error);
      }
    } else {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form>
        <fieldset className="FormGroup">
          <div className="FormRow">
            {/* <CardElement options={CARD_OPTIONS as any} /> */}
            <div className="payment-from mb-5">
              <div className="row">
                <div className="col-12 mb-4">
                  <div className="form-group position-relative">
                    <label htmlFor="" className="form-label">
                      Card number
                    </label>
                    <div
                      style={{
                        border: "1px solid  #ced4da",
                        padding: "10px",
                        borderRadius: ".375rem",
                        height: "44px",
                      }}
                    >
                      <CardNumberElement
                        options={{
                          style: {
                            base: inputStyle,
                          },
                        }}
                      />
                    </div>
                    <div className="cart-img" style={{ top: "38px" }}>
                      <img
                        src="assets/images/payment-img/cart-img-1.png"
                        alt="cardimg"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Expiry date
                    </label>
                    <div
                      style={{
                        border: "1px solid  #ced4da",
                        padding: "10px",
                        borderRadius: ".375rem",
                        height: "44px",
                      }}
                    >
                      <CardExpiryElement
                        options={{
                          style: {
                            base: inputStyle,
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6  mb-4">
                  <div className="form-group position-relative">
                    <label htmlFor="" className="form-label">
                      CVV/CVC
                    </label>
                    <div
                      style={{
                        border: "1px solid  #ced4da",
                        padding: "10px",
                        borderRadius: ".375rem",
                        height: "44px",
                      }}
                    >
                      <CardCvcElement
                        options={{
                          style: {
                            base: inputStyle,
                          },
                        }}
                      />
                    </div>

                    <div className="cart-img" style={{ top: "38px" }}>
                      <img
                        src="assets/images/payment-img/cart-img-2.png"
                        alt="cardimg"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="payment-text d-flex">
                <i className="fa-solid fa-unlock-keyhole" />
                <p className="mb-0 ps-2">
                  This transaction is secured with SSL encryption and protected
                  by reCAPTCHA.Privacy and Cookie Policy and Terms of Service
                  apply.
                </p>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="paynow_button">
          <a
            className="btn paynow my-3"
            data-bs-toggle="offcanvas"
            role="button"
            onClick={handleSubmit}
          >
            Pay Now
          </a>
        </div>
      </form>

      {isLoading && (
        <main className="main">
          <span className="loader"></span>
        </main>
      )}
    </>
  );
}
