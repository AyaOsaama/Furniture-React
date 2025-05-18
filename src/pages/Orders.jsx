import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Orders() {
  const userId = "681d0d6a477147ec0fc838cc";
  const navigate = useNavigate(); 

  const [groupedOrders, setGroupedOrders] = useState({
    pending: [],
    shipped: [],
    delivered: [],
    cancelled: []
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get('http://localhost:3000/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }, 
        });
        console.log(res.data);
        setGroupedOrders(res.data.groupedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/orderitems?orderId=${orderId}`);
  };

  const renderTable = (orders, title) => {
    if (orders.length === 0) return null;

    return (
      <div className="mb-10 mt-10 p-12">
        <h2 className="text-2xl mb-4">{title} Orders</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover">
                  <th>{index + 1}</th>
                  <td className="truncate max-w-[100px]">{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.products.reduce((acc, item) => acc + item.quantity, 0)}</td>
                  <td>
                    <span className={` ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <span className={`text ${order.paymentStatus === 'paid' ? 'text-success' : 'text-error'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {/* ✅ step 4 */}
                    <button 
                      className="btn btn-sm bg-gray-300 hover:bg-gray-400 transition-all duration-200"
                      onClick={() => handleViewOrder(order._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning';
      case 'shipped':
        return 'text-info';
      case 'delivered':
        return 'text-success';
      case 'cancelled':
        return 'text-error';
      default:
        return 'text-ghost';
    }
  };

  return (
    <div className="p-6">
      {renderTable(groupedOrders.pending, 'Pending')}
      {renderTable(groupedOrders.shipped, 'Shipped')}
      {renderTable(groupedOrders.delivered, 'Delivered')}
      {renderTable(groupedOrders.cancelled, 'Cancelled')}
    </div>
  );
}

export default Orders;
