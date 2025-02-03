import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <a href="" className="text-decoration-none">
            <h1 className="mb-4 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border border-white px-3 mr-1">E</span>Shopper
            </h1>
          </a>
          <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
          <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
          <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
          <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
              <div className="d-flex flex-column justify-content-start">
                <a className="text-dark mb-2" href="/"><i className="fa fa-angle-right mr-2"></i>Home</a>
                <a className="text-dark mb-2" href="/shop"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                <a className="text-dark mb-2" href="/carttoshow"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                <a className="text-dark" href="/contact"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              
            </div>
          </div>
        </div>
      </div>
      <div className="row border-top border-light mx-xl-5 py-4">
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-dark">
            &copy; <a className="text-dark font-weight-semi-bold" href="#">Shopping Cart</a>. All Rights Reserved. Designed by
            <a className="text-dark font-weight-semi-bold" href=""> Anuj Gupta</a><br />
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img className="img-fluid" src="images/payment.png" alt="Payments" />
        </div>
      </div>
    </div>
  );
};
export default Footer;
