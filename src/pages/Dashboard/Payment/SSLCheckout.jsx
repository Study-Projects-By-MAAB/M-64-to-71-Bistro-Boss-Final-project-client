import React from "react"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from "../../../hooks/useAuth"

const SSLCheckout = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const handleCreatePayment = () => {
        axiosSecure
            .post("/create-payment", {
                amount: 1000,
                currency: "USD",
                email: user.email,
            })
            .then((res) => {
                console.log(res.data)
                const redirect_url = res.data.paymentUrl
                if (redirect_url) {
                    window.location.replace(redirect_url)
                }
            })
    }
    return (
        <div>
            <button className="btn btn-success text-white font-medium" onClick={handleCreatePayment}>
                Create Payment
            </button>
        </div>
    )
}

export default SSLCheckout
