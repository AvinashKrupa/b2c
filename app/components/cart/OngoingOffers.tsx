import React, { useEffect, useState } from "react";
import { Cart } from "../../../network/gateway/Cart";
import PromotionCard from "../cart/PromotionCard";

const OngoingOffers = () => {

  const [offers, setOffers] = useState<any>([]);

  useEffect(() => {
    getOffers();
    return () => { };
  }, []);

  function getOffers() {
    Cart.getInstance()
      .getPromotions()
      .then((response: any) => {
        setOffers(response?.data?.data)
      });
  }

  return (
    <>
      <div>
        <div className="col-md-12 mt-4">
          <label className="col-form-label fs-14 font-sb text-color-1 mb-2">
            Ongoing Offers
          </label>
          {
            offers?.map((item: any, index: number) => {
              return (
                <PromotionCard key={index} {...item}/>
              )
            })
          }

          {/* <div className="position-relative mt-4">
            <a href="#">
              <img className="w-100" src="images/card-2.png" alt="" />
              <div className="carddata align-items-start d-flex flex-column h-100 justify-content-between w-100 ">
                <div>
                  <h4 className="fs-24 font-sb text-white">Upto 20% off</h4>
                  <p className="fs-16 font-r text-color-8">
                    on selected brands
                  </p>
                </div>
                <div className="d-flex w-100">
                  <p className="fs-16 font-sb text-white ltr-space">
                    NAVTATVA2022 <img src="images/card-icon.png" alt="" />
                  </p>
                  <p className="fs-12 font-r text-color-8 ms-auto ">
                    Valid till{" "}
                    <small className="fs-16 font-r text-white">30th July</small>
                  </p>
                </div>
              </div>
            </a>
          </div> */}
        </div>
        <div className="col-md-12 mt-4">
          <label className="col-form-label fs-14 font-sb text-color-1 mb-2">
            Redeem Coins
          </label>
          <div className="position-relative display-block">
            <a href="#">
              <img className="w-100" src="images/card-3.png" alt="" />
              <div className="carddata align-items-start d-flex flex-column h-100 justify-content-between w-100 ">
                <div>
                  <h4 className="fs-24 font-sb text-white">+1000 Coins</h4>
                  <p className="fs-16 font-r text-color-8">
                    on orders above ₹899
                  </p>
                </div>
                <div className="d-flex w-100">
                  <p className="fs-16 font-sb text-white ltr-space">
                    ACTIVATED ON CHECKOUT{" "}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default OngoingOffers;
