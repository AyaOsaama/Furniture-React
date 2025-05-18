import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderItems = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = new URLSearchParams(location.search).get('orderId');

 useEffect(() => {
  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`http://localhost:3000/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(data.order);
      console.log(data.order);
    } catch (error) {
      console.error("Error fetching order", error);
    }
  };

  if (orderId) fetchOrder();
}, [orderId]);


  if (!order) return <div>Loading...</div>;

  const address = order.shippingAddress;
  const products = order.products;

  return (
    <div className='mt-10 p-10'  style={{height:"70vh"}}>
    <div className=" flex flex-wrap justify-center gap-4 mt-10 p-10">
  <div className="bg-white rounded-xl shadow-md p-6 w-96 border border-gray-200">
  <p className="mb-2"><span className="font-semibold">Name :</span> {address.fullName}</p>
  <p className="mb-2"><span className="font-semibold">Address :</span> {address.street}</p>
  <p className="mb-2"><span className="font-semibold">PostalCode :</span> {address.postalCode}</p>
  <p className="mb-2"><span className="font-semibold">Country :</span> {address.country}</p>
  <p className="mb-2"><span className="font-semibold">State :</span> {address.state}</p>
  <p><span className="font-semibold">City :</span> {address.city}</p>
</div>


      {/* Order Items Table */}
      <div className="flex-1 max-w-4xl bg-white rounded-lg shadow-md overflow-x-auto p-8">
        <div className="flex items-center justify-between p-4 border-b">
          <button
            className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h2 className="text-lg font-semibold text-center w-full -ml-5">ORDER ITEMS</h2>
        </div>

        <table className="w-full text-left ">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-2">ID</th>
      <th className="p-2">Image</th>
      <th className="p-2">Name</th>
      <th className="p-2">Date</th>
      <th className="p-2">Price</th>
      <th className="p-2">Quantity</th> 
    </tr>
  </thead>
  <tbody>
    {products.map((item, index) => {
      const variant = item.productId?.variants?.[0];
      return (
        <tr key={item._id} className="border-t">
          <td className="p-2">{index + 1}</td>
          <td className="p-2">
            <img
              src={variant?.image}
              alt={variant?.name.en}
              className="w-10 h-10 object-cover"
            />
          </td>
          <td className="p-2">{variant?.name.en}</td>
          <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
          <td className="p-2">${item.priceAtPurchase}</td>
          <td className="p-2">{item.quantity}</td> 
        </tr>
      );
    })}
  </tbody>
</table>

      </div>
    </div>
    </div>
  );
};

export default OrderItems;
