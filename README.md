## **For verifyAdmin**

1.  do not show the link to those user sho should not see the link
2.  even if they gets the link, do not allow them to visit the link
3.  do not allow user to access the api. check admin in the server as well (verifyAdmin)

## **For SSLCOMMERZ(frontend)**

```javascript
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
```

## **For SSLCOMMERZ(backend)**

```javascript
const axios = require("axios")
app.use(express.urlencoded()) // for SSLCOMMERZ

// SSLCOMMERZ payment
app.post("/create-payment", verifyToken, async (req, res) => {
    const paymentInfo = req.body
    // all calculations are here ...

    const trxId = new ObjectId().toString() // we can also generate id with another any process.
    console.log(trxId)

    // this initiateData will be dynamic.
    const initiateData = {
        store_id: "testd666859d69a4a5", // store id from SSLCOMMERZ Website
        store_passwd: "testd666859d69a4a5@ssl", // store passwd from SSLCOMMERZ Website
        total_amount: paymentInfo.amount, // total amount
        currency: "EUR",
        tran_id: trxId,
        success_url: "https://bistro-boss-server-opal-alpha.vercel.app/success-payment", // server post link
        fail_url: "https://bistro-boss-server-opal-alpha.vercel.app/fail", // server post link
        cancel_url: "https://bistro-boss-server-opal-alpha.vercel.app/cancel", // server post link
        cus_name: "Customer Name",
        cus_email: "cust@yahoo.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: 1000,
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        shipping_method: "NO",
        product_name: "Laptop",
        product_category: "Laptop",
        product_profile: "general",
        multi_card_name: "mastercard,visacard,amexcard",
        value_a: "ref001_A",
        value_b: "ref002_B",
        value_c: "ref003_C",
        value_d: "ref004_D",
    }

    const response = await axios({
        method: "POST",
        url: "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        data: initiateData,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    // console.log(response)

    const saveData = {
        customer_name: "Dummy",
        paymentId: trxId,
        email: paymentInfo.email,
        amount: paymentInfo.amount,
        date: new Date(),
        status: "pending",
    }

    const save = await paymentCollection.insertOne(saveData)
    if (save) {
        res.send({ paymentUrl: response.data.GatewayPageURL })
    }
})

app.post("/success-payment", async (req, res) => {
    const successData = req.body
    if (successData.status !== "VALID") {
        throw new Error("Unauthorized payment", "Invalid payment")
    }
    // update the database on the paymentCollection
    const query = {
        paymentId: successData.tran_id,
    }
    const update = {
        $set: {
            status: "Success",
        },
    }
    const updateData = await paymentCollection.updateOne(query, update)

    console.log("successData", successData)
    console.log("updateData", updateData)

    res.redirect("https://bistro-boss-client-blond.vercel.app/success")
})

app.post("/fail", async (req, res) => {
    res.redirect("https://bistro-boss-client-blond.vercel.app/fail")
})
app.post("/cancel", async (req, res) => {
    res.redirect("https://bistro-boss-client-blond.vercel.app/cancel")
})
```
