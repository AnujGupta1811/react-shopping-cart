import React, { useState, useEffect } from 'react';
import ImageSlide from './Imageslide';
import { Link } from 'react-router-dom';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState(false); // Manage authentication status

  useEffect(() => {
  fetch('https://anuj.freelogomaker.in/api/category')
    .then((response) => response.json())
    .then((data) => {
      console.log('Fetched categories:', data.categories);  // Log to inspect the response
      setCategories(data.categories);
    })
    .catch((error) => console.error('Error fetching categories:', error));

  const token = localStorage.getItem("token");
  if (token) {
    setAuth(true); // If token exists, set isAuthenticated to true
  }
}, []);


  return (
    <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a
            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
            data-toggle="collapse"
            href="#navbar-vertical"
            style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}
          >
            <h6 className="m-0">Categories</h6>
          </a>
          <nav
            className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
            id="navbar-vertical"
          >
            <div className="navbar-nav w-100 overflow-hidden" style={{ height: '410px' }}>
              {categories.length === 0 ? (
                <p>No categories available.</p>
              ) : (
                categories.map((category) => (
                  <Link key={category.id} to={`/shop?category=${category.id}`} className="nav-item nav-link">
                    {category.category_name}
                  </Link>
                ))
              )}

            </div>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <Link to="/" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
              </h1>
            </Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div className="navbar-nav mr-auto py-0">
                <Link to="/" className="nav-item nav-link active">Home</Link>
                <Link to="/shop" className="nav-item nav-link">Shop</Link>
                <div className="nav-item dropdown">
                  <a href="/carttoshow" className="nav-item nav-link" >Cart</a>
                  
                </div>
                <Link to="/contact" className="nav-item nav-link">Contact</Link>
              </div>
              <div className="navbar-nav ml-auto py-0">
                {auth ? (<Link to="/logout" className="nav-item nav-link">Logout</Link>) :
                  (<>  <Link to="/login" className="nav-item nav-link">Login</Link>
                    <Link to="/register" className="nav-item nav-link">Register</Link></>
                  )}
              </div>
            </div>
          </nav>
          <ImageSlide />
        </div>
      </div>
    </div>
  );
}
export default Navbar;