import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

function ProductItem({ product }) {
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const { id, email } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            console.error('Product ID is missing:', { id });
            return;
        }
        console.log({ id });

        const addToCart = async () => {
            console.log('Adding to cart...');
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
                    `https://anuj.freelogomaker.in/api/cart/${id}`,
                    {}, // Empty body since the data is in URL
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Send token in header
                            'Content-Type': 'application/json',
                        },
                    }
                );
        
                console.log('Response:', response);
        
                if (response.data.success) {
                    setLoading(true);
                    Swal.fire({
                        title: "Success",
                        text: "Item added to cart successfully!",
                        icon: "success",
                    });
        
                    setRedirect('/carttoshow'); // Redirect to shop page after success
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message || "Something went wrong.",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to add item to cart. Please try again.",
                    icon: "error",
                });
            }
        };
        

        addToCart();
    }, [id, email]);

    // Handle redirection
    useEffect(() => {
        if (redirect) {
            navigate(redirect);
        }
    }, [redirect, navigate]);

    return <div className="product-item">{loading && <p>Loading...</p>}</div>;
}

export default ProductItem;
