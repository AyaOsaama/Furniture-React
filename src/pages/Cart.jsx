import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeCartItem,
  updateCartQuantity,
  clearCartItems,
} from "../redux/cartActions";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const userId = "681d0d6a477147ec0fc838cc";

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const total = items.reduce(
    (acc, item) => acc + item.priceAtAddition * item.quantity,
    0
  );

  const deliveryFee = 50;
  const discount = total * 0.1;
  const finalTotal = total - discount + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h2 className="text-3xl  mb-6 mt-8">Shopping Cart</h2>

      {loading && <div style={{ display:'flex',justifyContent:'center',alignItems:'center',minHeight:"40vh"}}><span className="loading loading-spinner text-secondary"></span>
</div>}
      {error && (
        <p className="text-red-500">
          {error.message || "Something went wrong!"}
        </p>
      )}

      {/* Cart Empty Section */}
      {!loading && items.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-xl mb-4 mt-8">Your cart is empty.</p>
          <Link
            to="/shop"
            className="inline-block bg-gray-400 text-white px-6 py-3 rounded-full mb-6 hover:bg-gray-500">
            Continue Shopping
          </Link>
        </div>
      )}

      {/* If there are items in the cart */}
      {items.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-2 sm:p-4 overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 whitespace-nowrap">Products</th>
                    <th className="whitespace-nowrap">Quantity</th>
                    <th className="whitespace-nowrap">Total</th>
                    <th className="whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <React.Fragment key={item._id}>
                      {/* 🌐 Row for md and above */}
                      <tr className="border-b hidden md:table-row">
                        <td className="py-4 min-w-[250px]">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.productId.variants[0].image}
                              alt={item.productId.variants[0].name.en}
                              className="w-20 h-20 object-contain rounded shrink-0"
                            />
                            <div className="flex flex-col overflow-hidden">
                              <h3 className="font-semibold text-lg truncate">
                                {item.productId.variants[0].name.en}
                              </h3>
                              <p className="text-sm text-gray-500 truncate">
                                Color: {item.productId.variants[0].color.en}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="min-w-[100px]">
                          <div className="flex items-center border rounded-full w-fit px-2 py-1">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    itemId: item._id,
                                    type: "dec",
                                    currentQuantity: item.quantity,
                                  })
                                )
                              }
                              className="px-2"
                            >
                              <FaMinus />
                            </button>
                            <span className="px-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartQuantity({
                                    itemId: item._id,
                                    type: "inc",
                                    currentQuantity: item.quantity,
                                  })
                                )
                              }
                              className="px-2"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td className="font-semibold whitespace-nowrap min-w-[90px]">
                          { (item.priceAtAddition * item.quantity).toFixed(2)} EGY
                        </td>
                        <td className="min-w-[60px]">
                          <button
                            onClick={() => dispatch(removeCartItem(item._id))}
                            className="text-black hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>

                      {/* 📱 Card for small screens */}
                      <tr className="md:hidden">
                        <td colSpan={4} className="py-3">
                          <div className="bg-gray-50 p-3 rounded-lg shadow-sm space-y-2">
                            <div className="flex gap-3">
                              <img
                                src={item.productId.variants[0].image}
                                alt={item.productId.variants[0].name.en}
                                className="w-16 h-16 object-contain rounded shrink-0"
                              />
                              <div className="flex flex-col justify-center overflow-hidden">
                                <h3 className="font-semibold text-base truncate">
                                  {item.productId.variants[0].name.en}
                                </h3>
                                <p className="text-sm text-gray-500 truncate">
                                  Color: {item.productId.variants[0].color.en}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Quantity:</span>
                              <div className="flex items-center border rounded-full px-2 py-1">
                                <button
                                  onClick={() =>
                                    dispatch(
                                      updateCartQuantity({
                                        itemId: item._id,
                                        type: "dec",
                                        currentQuantity: item.quantity,
                                      })
                                    )
                                  }
                                  className="px-2"
                                >
                                  <FaMinus />
                                </button>
                                <span className="px-2 font-medium">{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    dispatch(
                                      updateCartQuantity({
                                        itemId: item._id,
                                        type: "inc",
                                        currentQuantity: item.quantity,
                                      })
                                    )
                                  }
                                  className="px-2"
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Total:</span>
                              <span className="font-semibold">
                                {(item.priceAtAddition * item.quantity).toFixed(2)} EGY
                              </span>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => dispatch(removeCartItem(item._id))}
                                className="text-black hover:text-red-700 text-sm"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => dispatch(clearCartItems())}
                  className="px-6 py-2 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                  style={{ backgroundColor: "rgb(151, 158, 165)" }}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between h-120">
            <div>
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4 w-full">
                <input
                  type="text"
                  placeholder="Discount Voucher"
                  className="flex-grow border rounded px-3 py-2 w-full"
                />
                <button
                  className="px-4 py-2 text-white rounded w-full sm:w-auto transition-colors duration-200"
                  style={{ backgroundColor: "rgb(151, 158, 165)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(132, 139, 146)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(151, 158, 165)")
                  }
                >
                  Apply
                </button>
              </div>

              <div className="space-y-2 text-sm h-50 pt-5 pm-8 ">
                <div className="flex justify-between mb-3">
                  <span>Sub Total</span>
                  <span>{total.toFixed(2)} EGY</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span>Discount (10%)</span>
                  <span>-{discount.toFixed(2)} EGY</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee.toFixed(2)} EGY</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} EGY</span>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <label className="inline-flex items-start gap-1">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <span>
                    90 Day Limited Warranty against manufacturer’s defects
                    <a href="#" className="ml-1 text-blue-600 underline">
                      Details
                    </a>
                  </span>
                </label>
              </div>
            </div>

            <button
              className="mt-6 w-full py-3 text-white rounded-full text-lg font-semibold hover:bg-gray-600"
              style={{ backgroundColor: "rgb(132, 139, 146)" }}
              onClick={() => navigate("/checkout", { state: { finalTotal, items } })}
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
