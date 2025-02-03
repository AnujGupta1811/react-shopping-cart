import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ProductItem({ product, quantity }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For navigation

    const addToCart = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            Swal.fire({
                title: "Error",
                text: "You need to be logged in to add items to your cart.",
                icon: "error",
            });
            return;
        }

        try {
            const response = await axios.post(
                `https://anuj.freelogomaker.in/api/cart/${product.id}`,
                { quantity }, // Send both product ID and quantity to the backend
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                setLoading(true);
                Swal.fire({
                    title: "Success",
                    text: "Item added to cart successfully!",
                    icon: "success",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.data.message || "Something went wrong.",
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to add item to cart. Please try again.",
                icon: "error",
            });
        }
    };
    const goToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <button onClick={addToCart} disabled={loading} className="add-to-cart-btn">
                {loading ? 'Adding...' : 'Add to Cart'}
            </button>
            
        </div>
    );
}

export default ProductItem;
