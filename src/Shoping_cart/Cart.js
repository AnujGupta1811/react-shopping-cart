import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import './css/cartshow.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: ''
  });
  const navigate = useNavigate();

  // Fetch cart data from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://anuj.freelogomaker.in/api/cartshow?user_id=${user_id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        if (Array.isArray(data.products)) {
          setCartItems(data.products);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  // Handle quantity changes
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity <= 0) return;

    try {
      const response = await fetch(`https://anuj.freelogomaker.in/api/cart/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(prevItems => prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    try {
      const response = await fetch(`https://anuj.freelogomaker.in/api/cart/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(cartItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      const response = await fetch(`https://anuj.freelogomaker.in/api/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Open the checkout modal
  const openCheckoutModal = () => {
    setIsCheckoutModalOpen(true);
  };

  // Close the checkout modal
  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Prepare userDetails data
    const orderDetails = {
      name: userDetails.name,
      email: userDetails.email,
      address: userDetails.address,
      paymentMethod: 'card', 
      total: total.toFixed(2),
    };

    try {
      // Send the data to the backend using fetch
      const response = await fetch('https://anuj.freelogomaker.in/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // If token is required for authentication
        },
        body: JSON.stringify(orderDetails),  // Send the user details as JSON in the request body
      });

      // Handle response
      if (!response.ok) {
        throw new Error('Failed to submit checkout data');
      }

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Your order has been successfully placed.',
          showConfirmButton: false,
          timer: 1500, // Close after 1.5 seconds
        }).then(() => {
          // Redirect to the desired page after the alert is closed
          navigate('/');
        });
      } else {
        console.error('Checkout error:', data.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading cart items...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <a href='/'><button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Continue Shopping
          </button></a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">Price</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            src={item.pimage}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                        </div>
                      </td>
                      <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4">
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FaMinus /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FaPlus /></button>
                        </div>
                      </td>
                      <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4">
                        <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4">
                <button onClick={clearCart} className="text-red-600 hover:text-red-800">Clear Cart</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={openCheckoutModal} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 mt-6">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <button onClick={() => navigate('/')} className="back-to-home-btn" style={{ marginTop: 30 }}>
        Back to Home
      </button>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <button onClick={closeCheckoutModal} className="close-modal">X</button>
            <h2 className="text-xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={userDetails.address}
                onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                required
              />
              <button type="submit" className="submit-checkout">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
