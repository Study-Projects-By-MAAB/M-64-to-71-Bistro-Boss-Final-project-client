import React from "react"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import SSLCheckout from "./SSLCheckout"

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Payment to eat"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-semibold mb-4">SSL Payment</h1>
                <SSLCheckout></SSLCheckout>
            </div>
        </div>
    )
}

export default Payment
