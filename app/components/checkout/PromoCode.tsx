import React from "react";

const PromoCode = () => {
  return (
    <div className="mb-3 promocode ">
      <label className="col-form-label fs-14 font-sb text-color-1">
        Have a Promo Code?
      </label>
      <div className="col-sm-12 position-relative">
        <input
          type="text"
          className="form-control border"
          placeholder="NAVTATVA2022"
        />
        <a href="#" className=" fs-16 font-sb text-color-3 text-end apply">
          Apply
        </a>
      </div>
    </div>
  );
};

export default PromoCode;
