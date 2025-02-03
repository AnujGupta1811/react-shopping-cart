import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import ProductItem from './AddToCartProduct'; // Import the ProductItem component

const ProductDetail = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = localStorage.getItem('token');
            const url = `https://anuj.freelogomaker.in/api/product/${id}`;

            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }

                const data = await response.json();
                console.log(data); // Log the response data
                setProduct(data.product); // Set the product in state
                setQuantity(1); // Reset quantity when product details are fetched
            } catch (error) {
                console.error("Error fetching product:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to load product details.",
                    icon: "error",
                });
            }
        };

        fetchProductDetails();
    }, [id]);

    // Increase quantity with stock limit
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    // Decrease quantity with minimum limit of 1
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Navigate back to home
    const goToHome = () => {
        window.location.href = '/'; // Redirect to the home page
    };

    return (
        <div className="container-fluid py-5">
            <div className="row px-xl-5">
                {/* Product Image Section */}
                <div className="col-lg-5 pb-5">
                    <div id="product-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner border">
                            <div className="carousel-item active">
                                <img
                                    className="img-fluid w-100"
                                    src={`/${product?.pimage}`}
                                    alt={product?.pname}
                                    style={{ width: '100%', height: '300px', objectFit: 'fill' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="col-lg-7 pb-5">
                    <h3 className="font-weight-semi-bold">{product?.pname}</h3>

                    {/* Product Reviews */}
                    <div className="d-flex mb-3">
                        <small className="pt-1">({product?.reviews_count} Reviews)</small>
                    </div>

                    {/* Product Description */}
                    <p className="mb-4">{product?.pdescription}</p>

                    {/* Product Stock */}
                    <div className="d-flex mb-4">
                        <p className="text-dark font-weight-medium mb-0 mr-3">Title: {product?.title}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-minus" onClick={handleDecrease}>
                                    <i className="fa fa-minus"></i>
                                </button>
                            </div>
                            <input
                                type="text"
                                id="quantity"
                                className="form-control bg-secondary text-center"
                                value={quantity}
                                readOnly
                            />
                            <div className="input-group-btn">
                                <button className="btn btn-primary btn-plus" onClick={handleIncrease}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    {/* Pass quantity to ProductItem */}
                    <ProductItem product={product} quantity={quantity} />
                </div>
            </div>

            {/* Back to Home Button */}
            <button 
                onClick={goToHome} 
                className="back-to-home-btn"
                style={{
                    position: 'fixed',
                    bottom: '200px', 
                    left: '50%', 
                    width:"30%",
                    transform: 'translateX(-50%)',
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    fontSize: '16px', 
                    zIndex: 10
                }}
            >
                Back to Home
            </button>
        </div>
    );
};

export default ProductDetail;
