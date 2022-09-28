import React from "react";

const OfferCard = () => {
  return (
    <div className="w-100 mt-4">
      <div className="discountBG position-relative">
        <a href="#">
          <div className="imgbar">
            {" "}
            <img className="w-100" src="images/discountAd.png" alt="" />
          </div>
          <div className="checkbar">
            <p className="fs-16 font-r">
              <img className="me-2" src="images/cart-shop.png" alt="" />
              Checkout Within the next 24 Hours{" "}
            </p>
          </div>
          <div className="mt-4">
            <p className="fs-16 font-m text-color-1">Get upto </p>
            <h5 className="fs-48 font-bk mt-2">₹1,500</h5>
            <p className="fs-16 font-r text-color-1  mt-2">
              discount on your first order at{" "}
            </p>
            <h4 className="fs-24 font-b text-color-2 mt-4">
              {" "}
              <img className="me-2" src="images/nunchi.png" alt="" />
              Nunchi Jewellery
            </h4>
          </div>
        </a>
      </div>
      <a
        href="button"
        className="font-sb text-color-3 fs-16 justify-content-end align-items-end d-flex ms-auto mt-3 me-2"
      >
        Multiple offers waiting for you after checkout
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={22}
          height={22}
          fill="currentColor"
          className="bi bi-arrow-up-right ms-2"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
          />
        </svg>
      </a>{" "}
    </div>
  );
};

export default OfferCard;
