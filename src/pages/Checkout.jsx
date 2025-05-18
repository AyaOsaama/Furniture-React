import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../redux/cartActions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronDown } from "react-icons/fa";

const Checkout = () => {
  const { state } = useLocation();

  const [showMoreVisible, setShowMoreVisible] = useState(false);

  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const checkScrollable = () => {
      const scrollEl = scrollRef.current;
      if (scrollEl) {
        setShowMoreVisible(scrollEl.scrollHeight > scrollEl.clientHeight);
      }
    };

    checkScrollable();
  }, [state?.items]);

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    setScrolled(scrollTop > 0);
  };
  const handleShowMore = () => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const finalTotal = state?.finalTotal || 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    shipping: "standard",
    payment: "cash_on_delivery",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (val) => {
    setFormData({
      ...formData,
      country: val,
      state: "",
      city: "",
    });
  };

  const handleRegionChange = (val) => {
    setFormData({
      ...formData,
      state: val,
      city: "",
    });
  };

  const placeOrder = async (method, paypalOrderId = null) => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zip.trim() ||
      !formData.phone.trim() ||
      !formData.country.trim()
    ) {
      toast.error("Please fill in all required address fields.");
      return;
    }

    try {
      const userId = "681d0d6a477147ec0fc838cc";

      const shippingAddress = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        street: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        phone: formData.phone,
        country: formData.country,
      };

      const products = state.items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        priceAtPurchase: item.price,
      }));

      const totalPrice = products.reduce(
        (acc, p) => acc + p.quantity * p.priceAtPurchase,
        0
      );

      const token = localStorage.getItem("token");

      const body = {
        shippingAddress,
        paymentMethod: method,
      };

      if (method === "paypal" && paypalOrderId) {
        body.paypalOrderId = paypalOrderId;
      }

      await axios.post("http://localhost:3000/orders", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(clearCartItems());
      navigate("/orders");
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      toast.error("Failed to place order. Please try again.");
    }
  };
  console.log("finalTotal", finalTotal);
  console.log("shipping", formData?.shipping);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div
        className="flex flex-col md:flex-row justify-end"
        style={{ gap: "50px" }}
      >
        {/* Delivery Address */}
        <div className="px-8 mb-10">
          <div
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              width: "300px",
              height: "300px",
            }}
            className="mx-auto w-full max-w-[300px] aspect-square"
          >
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src="https://help.zazzle.com/hc/article_attachments/360010513393"
              alt="Image"
            />
          </div>

          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: "#4b4b4b" }}
          >
            Delivery Address
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-1/2 border rounded px-4 py-2"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-1/2 border rounded px-4 py-2"
              />
            </div>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter delivery address"
              className="w-full border rounded px-4 py-2"
            />

            {/* هنا خليت CountryDropdown و RegionDropdown */}
            <div className="flex gap-4">
              <CountryDropdown
                value={formData.country}
                onChange={handleCountryChange}
                classes="w-1/3 border rounded px-4 py-2"
                defaultOptionLabel="Select Country"
              />
              <RegionDropdown
                country={formData.country}
                value={formData.state}
                onChange={handleRegionChange}
                classes="w-1/3 border rounded px-4 py-2"
                blankOptionLabel="No State"
                defaultOptionLabel="Select State"
              />
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-1/3 border rounded px-4 py-2"
              />
            </div>

            <input
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip code"
              className="w-full border rounded px-4 py-2"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {/* Shipping Method */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Shipping method</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between border rounded px-4 py-2">
                <div>
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={formData.shipping === "standard"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Standard shipping (3-5 days)
                </div>
                <span>$7.00</span>
              </label>
              <label className="flex items-center justify-between border rounded px-4 py-2">
                <div>
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={formData.shipping === "express"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Expedited shipping (1-2 days)
                </div>
                <span>$10.00</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Payment</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="cash_on_delivery"
                  checked={formData.payment === "cash_on_delivery"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Cash On Delivery
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={formData.payment === "paypal"}
                  onChange={handleChange}
                  className="mr-2"
                />
                PayPal
              </label>
            </div>

            {formData.payment === "paypal" ? (
              <div className="mt-4">
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AQVBWA96vQKJBbds8eSIiSe1RUvs_VezGTW_f1JU2nYNKNm7IIMYnblA8g_ujmdKDIf-TJNohAOgDvG1",
                    currency: "USD",
                  }}
                  deferLoading={false}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
  const shippingCost = formData.shipping === "standard" ? 7 : 10;
  const total = (finalTotal + shippingCost).toFixed(2); 

  console.log("PayPal total:", total); 

  return actions.order.create({
    purchase_units: [
      {
        amount: {
          value: total.toString(),
        },
      },
    ],
  });
}}

                    onApprove={async (data, actions) => {
                      try {
                        const details = await actions.order.capture();
                        toast.success(
                          `Transaction completed by ${details.payer.name.given_name}`
                        );
                        await placeOrder("paypal", data.orderID);
                        navigate("/orders");
                      } catch (err) {
                        console.error("PayPal capture error:", err);
                        toast.error("An error occurred with PayPal payment.");
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      toast.error("An error occurred with PayPal payment.");
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button
                onClick={() => placeOrder("cash_on_delivery")}
                className="mt-4 w-full  text-white py-2 rounded hover:bg-gray-800"
                style={{ backgroundColor: "rgb(151, 158, 165)" }}
              >
                Pay now
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div
          className="p-6 bg-gray-200  sticky"
          style={{ minWidth: "500px", height: "100vh", width: "25%", top: "0" }}
        >
          <h2 className="text-xl font-semibold mb-4">Furniture</h2>

          <div className="relative">
            {/* خط علوي يظهر فقط عندما يتم التمرير */}
            {scrolled && (
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-300 z-10" />
            )}

            {/* Scrollable content */}
            <div
              className="space-y-4 overflow-y-auto p-5"
              style={{ height: "30vh" }}
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {state?.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.productId.variants[0].image}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <p
                        style={{
                          width: "20px",
                          position: "absolute",
                          borderRadius: "50%",
                          backgroundColor: "rgba(109, 107, 105, 0.8)",
                          right: "-10px",
                          top: "-10px",
                          color: "white",
                          textAlign: "center",
                          fontSize: "0.8rem",
                        }}
                      >
                        {item.quantity}
                      </p>
                    </div>

                    <div>
                      <p>{item.productId.variants[0].name.en}</p>
                      <p className="text-gray-500 text-sm">
                        ${(item.priceAtAddition * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* زر Show More يظهر فقط إذا لم يتم التمرير */}
            {showMoreVisible && !scrolled && (
              <button
                onClick={handleShowMore}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white text-sm flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "rgb(109, 107, 105,90%)",
                  width: "120px",
                  height: "35px",
                  borderRadius: "20px",
                }}
              >
                Show More <FaChevronDown size={12} />
              </button>
            )}
          </div>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="w-full border rounded px-4 py-2 mb-2"
            />
            <button
              className="w-full text-white py-2 rounded"
              style={{ backgroundColor: "#cccccc" }}
            >
              Apply
            </button>
          </div>

          <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {formData.shipping === "standard" ? "$7.00" : "$10.00"}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>
                $
                {(
                  finalTotal + (formData.shipping === "standard" ? 7 : 10)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
