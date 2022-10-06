import React, { useState } from "react";
import { Cart } from "../../../network/gateway/Cart";
import Toast from "../../../utils/Toast";
import Validators from "../../../utils/Validator";
import ValidationMessage from "../../constants/validationMessage";

const PromoCode = (props: any) => {
  const [couponCode, setCouponCode] = useState<any>("");

  function isValidCouponCode() {
    if (Validators.isEmpty(couponCode)) {
      Toast.showError(ValidationMessage.couponCode);
      return false;
    } else {
      return true;
    }
  }
  
  function applyCouponCode() {
    if (isValidCouponCode()) {
      let data = {
          code: couponCode
      };
      Cart.getInstance()
        .applyCouponCode(data)
        .then((response: any) => {
          if (response.statusText === "OK") {
            props.setCartItems(response.data.data);
            Toast.showSuccess("Coupon applied!!")
          }
        });
    }
  }
  return (
    <div className="mb-3 promocode ">
      <label className="col-form-label fs-14 font-sb text-color-1">
        Have a Promo Code?
      </label>
      <div className="col-sm-12 position-relative">
        <input
          value={couponCode}
          onChange={(event) => {
            setCouponCode(event.target.value);
          }}
          className="form-control border"
          placeholder="NAVTATVA2022"
        />
        <a className=" fs-16 font-sb text-color-3 text-end apply"
          onClick={(event) => {
            event.preventDefault();
            applyCouponCode();
          }}
        >
          Apply
        </a>
      </div>
    </div>
  );
};

export default PromoCode;
