import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
              <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div className="d-flex align-items-center border mb-4" style={{ padding: 30 }}>
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {/* Men's Clothes */}
          <div className="col-lg-4 col-md-6 pb-1">
            <div className="cat-item d-flex flex-column border mb-4" style={{ padding: 30 }}>
              <p className="text-right">3 Products</p>
              <a href="/shop/6" className="cat-img position-relative overflow-hidden mb-3">
                <img
                  className="img-fluid"
                  src="img/cat-1.jpg"
                  alt="Men's Clothes"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
              </a>
              <h5 className="font-weight-semi-bold m-0">Men Fashion</h5>
            </div>
          </div>

          {/* Bags */}
          <div className="col-lg-4 col-md-6 pb-1">
            <div className="cat-item d-flex flex-column border mb-4" style={{ padding: 30 }}>
              <p className="text-right">3 Products</p>
              <a href="/shop/4" className="cat-img position-relative overflow-hidden mb-3">
                <img
                  className="img-fluid"
                  src="images/accessories1.png"
                  alt="Bags"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
              </a>
              <h5 className="font-weight-semi-bold m-0">Accessories</h5>
            </div>
          </div>

          {/* Shoes */}
          <div className="col-lg-4 col-md-6 pb-1">
            <div className="cat-item d-flex flex-column border mb-4" style={{ padding: 30 }}>
              <p className="text-right">3 Products</p>
              <a href="/shop/8" className="cat-img position-relative overflow-hidden mb-3">
                <img
                  className="img-fluid"
                  src="images/fashion2.jpg"
                  alt="Latest Fashion"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
              </a>
              <h5 className="font-weight-semi-bold m-0">Latest Fashion</h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Footer;
