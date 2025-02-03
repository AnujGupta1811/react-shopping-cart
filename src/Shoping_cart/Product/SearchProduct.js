import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchResults() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    // Extract search query from URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (query) {
            fetch(`https://anuj.freelogomaker.in/api/search-cart?query=${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Search Results:", data);
                    setProducts(data.products || []);
                })
                .catch((error) => console.error("Error fetching search results:", error));
            console.log("error occurs");
        }
    }, [query]);

    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-9 col-md-12">
                    <h3 className="mb-4">Search Results for: "{query}"</h3>
                    <div className="row pb-3">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                    <div className="card product-item border-0 mb-4">
                                        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                            <Link to={`/product/${product.id}`}>
                                                <img
                                                    className="img-fluid w-100"
                                                    src={`/${product.pimage}`}
                                                    alt={product.pname}
                                                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                            <h6 className="text-truncate mb-3">{product.pname}</h6>
                                            <div className="d-flex justify-content-center">
                                                <h6>${product.price}</h6>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between bg-light border">
                                            <Link to={`/cart/${product.id}`} className="btn btn-sm text-dark p-0">
                                                <i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                    {/* Back to Home Button */}
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', border: 'none', color: 'white', textDecoration: 'none' }}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
