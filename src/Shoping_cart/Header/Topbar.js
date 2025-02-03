import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function TopBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);


  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?query=${query}`);
    }
  };
  return (
    <div className="container-fluid">
      {/* Top Links */}
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark" href="">FAQs</a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="">Help</a>
            <span className="text-muted px-2">|</span>
            <a className="text-dark" href="">Support</a>
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark px-2" href=""><i className="fab fa-facebook-f"></i></a>
            <a className="text-dark px-2" href=""><i className="fab fa-twitter"></i></a>
            <a className="text-dark px-2" href=""><i className="fab fa-linkedin-in"></i></a>
            <a className="text-dark px-2" href=""><i className="fab fa-instagram"></i></a>
            <a className="text-dark pl-2" href=""><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a href="" className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
            </h1>
          </a>
        </div>

        {/* Search Bar */}
        <div className="col-lg-6 col-6 text-left">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Cart Button */}
        <div className="col-lg-3 col-6 text-right">
          <a href="/carttoshow" className="btn border">
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge">Cart</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
