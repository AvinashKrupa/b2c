import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Header from "../../app/themes/themeOne/components/Header";
import { useRouter } from "next/router";
import Slider from "react-slick";
import CartItem from "../../app/components/cart/CartItem";
import VisitNunchiBanner from "../../app/components/common/VisitNunchiBanner";
import { Cart } from "../../network/gateway/Cart";

import shallow from "zustand/shallow";
import useUserStore from "../../zustand/store";
import { occasionSetting } from "../../utils/sliderConfig";
import ValidationMessage from "../../app/constants/validationMessage";
import Validators from "../../utils/Validator";
import Toast from "../../utils/Toast";
import CartItemLoader from "../../app/components/cart/CartItemLoader";
import EmptyCart from "../../app/components/checkout/EmptyCart";
import OfferCard from "../../app/components/checkout/OfferCard";
import OngoingOffers from "../../app/components/cart/OngoingOffers";
import Permalink from "../../utils/Permalink";

const CartScreen: NextPage = () => {
  const route = useRouter();
  const [cartItems, setCartItems] = useState<any>([]);
  const [couponCode, setCouponCode] = useState<any>("");
  const [subTotal, setSubTotal] = useState<any>();
  const [youMayLikeList, setYouMayLikeList] = useState<any>([]);
  const isLogin = useUserStore((state: any) => state.isLogin, shallow);
  const setLoginPopup = useUserStore((state: any) => state.showLogin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogin) {
      getCustomerCart();
    } else {
      setLoginPopup(true);
    }
  }, [isLogin]);

  function getCustomerCart() {
    Cart.getInstance()
      .getCustomerCart()
      .then((info: any) => {
        setLoading(false);
        setCartItems(info.data.data);
        setSubTotal(info.data.grandTotal);
      });
  }

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
        data: {
          type: "promotion_item",
          code: couponCode,
        },
      };
      Cart.getInstance()
        .applyCouponCode(data)
        .then((response: any) => {
          if (response.statusText === "OK") {
            setCartItems(response.data.data);
          }
        });
    }
  }

  function removeCart(id: any, index: any) {
    Cart.getInstance()
      .deleteCartItem(id)
      .then((response: any) => {
        if (response.statusText === "OK") {
          getCustomerCart();
        }
      });
  }

  return (
    <div className="shoppingCart">
      <div className="wrapper">
        {/* Header */}
        <Header />
        {/* End Header */}
        <section className="cartItem mt-4 mt-md-5 mb-5">
          {cartItems?.length != 0 && (
            <h1 className="fs-40 font-b text-color-2 list-inline-item">
              Your Shopping Bag
            </h1>
          )}

          <div className="row">
            <div
              className={`col-md-12 col-lg-${cartItems?.length != 0 ? 8 : 12}`}
            >
              {loading && <CartItemLoader />}
              {cartItems?.length != 0 &&
                cartItems?.map((item: any, index: number) => {
                  return (
                    <CartItem
                      key={index}
                      {...item}
                      removeCart={removeCart}
                      getCustomerCart={getCustomerCart}
                    />
                  );
                })}
              {!loading && cartItems?.length == 0 && (
                <div
                  className="col-md-12 text-center"
                  style={{ marginTop: "15%", marginBottom: "15%" }}
                >
                  <EmptyCart />
                </div>
              )}
              {youMayLikeList?.length != 0 && (
                <>
                  <h3 className="fs-20 font-sb text-color-2 mt-5">
                    You May Also like
                  </h3>
                  {youMayLikeList?.map((item: any, index: number) => {
                    return <CartItem key={index} {...item} />;
                  })}
                </>
              )}
            </div>
            {cartItems?.length != 0 && (
              <div className="col-md-12 col-lg-4">
                <OfferCard />
                <div className="bg-white border p-3 mt-4 shipping">
                  <div className="row">
                    <div className="col-md-12 py-2">
                      <p className="fs-19 font-r text-color-2">
                        <span className="font-sb">2 of 4 Items</span> selected
                        for checkout
                      </p>
                    </div>
                    <div className="col-md-12">
                      <div className="gray">
                        <p className="fs-14 font-r text-color-2">
                          Add items worth
                          <span className="font-sb"> ₹1,800 </span> more to
                          avail
                          <span className="font-sb text-color-9">
                            Free Shipping
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex mt-2">
                      <h3 className="fs-19 font-sb text-color-2">Sub Total</h3>
                      <h3 className="fs-24 font-sb text-color-3 ms-auto">
                        ₹{subTotal}
                      </h3>
                    </div>
                    <div className="col-md-12 mt-4">
                      <a
                        onClick={() => route.replace(Permalink.ofCheckout())}
                        className="btn fs-18 w-100"
                        tabIndex={0}
                      >
                        Proceed to Checkout
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-4">
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
                          type="text"
                          className="form-control"
                        />
                        <a
                          href="#"
                          className=" fs-16 font-sb text-color-3 text-end apply"
                          onClick={(event) => {
                            event.preventDefault();
                            applyCouponCode();
                          }}
                        >
                          Apply
                        </a>
                      </div>
                    </div>
                  </div>
                  <OngoingOffers />
                </div>
              </div>
            )}
          </div>
        </section>
        <VisitNunchiBanner />
        <section className="mt-4 mt-md-5 pb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="heading3">
                <h2>
                  <span className="bg10">Similar Products</span>
                </h2>
              </div>
            </div>
            <div className="col-md-12 mt-4 mt-lg-5 position-relative sliderView Occasion">
              <div className="ocassion-slider">
                <Slider {...occasionSetting}>
                  <div className="thumb position-relative text-center">
                    <div className="bg1">
                      <a href="#">
                        <img
                          className="w-100"
                          src="images/Occassion1.png"
                          alt=""
                        />
                      </a>
                      <div className="hoverBlock">
                        <div className="overlay text-center">
                          <p className="fs-13 font-r text-color-1">
                            Women Teal Blue &amp; Beige Ethnic Motifs Printed
                            Straight Kurti
                          </p>
                          <p className="fs-19 font-sb text-color-3 py-3">
                            ₹3,450
                          </p>
                          <a
                            onClick={() =>
                              route.replace(Permalink.ofDummyProduct())
                            }
                            className="btn-border fs-13 text-color-3"
                          >
                            More Info
                          </a>
                          <a href="#" className="btn fs-13">
                            Add to Cart
                          </a>
                        </div>
                        <div className="speaker">
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/wishlist-detail.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/volume.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/swap.png" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="thumb position-relative text-center">
                    <div className="bg2">
                      <a href="#">
                        <img
                          className="w-100"
                          src="images/Occassion2.png"
                          alt=""
                        />
                      </a>
                      <div className="hoverBlock">
                        <div className="overlay text-center">
                          <p className="fs-13 font-r text-color-1">
                            Women Teal Blue &amp; Beige Ethnic Motifs Printed
                            Straight Kurti
                          </p>
                          <p className="fs-19 font-sb text-color-3 py-3">
                            ₹3,450
                          </p>
                          <a
                            onClick={() =>
                              route.replace(Permalink.ofDummyProduct())
                            }
                            className="btn-border fs-13 text-color-3"
                          >
                            More Info
                          </a>
                          <a href="#" className="btn fs-13">
                            Add to Cart
                          </a>
                        </div>
                        <div className="speaker">
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/wishlist-detail.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/volume.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/swap.png" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="thumb position-relative text-center">
                    <div className="bg3">
                      <a href="#">
                        <img
                          className="w-100"
                          src="images/Occassion3.png"
                          alt=""
                        />
                      </a>
                      <div className="hoverBlock">
                        <div className="overlay text-center">
                          <p className="fs-13 font-r text-color-1">
                            Women Teal Blue &amp; Beige Ethnic Motifs Printed
                            Straight Kurti
                          </p>
                          <p className="fs-19 font-sb text-color-3 py-3">
                            ₹3,450
                          </p>
                          <a
                            onClick={() =>
                              route.replace(Permalink.ofDummyProduct())
                            }
                            className="btn-border fs-13 text-color-3"
                          >
                            More Info
                          </a>
                          <a href="#" className="btn fs-13">
                            Add to Cart
                          </a>
                        </div>
                        <div className="speaker">
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/wishlist-detail.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/volume.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/swap.png" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="thumb position-relative text-center">
                    <div className="bg4">
                      <a href="#">
                        <img
                          className="w-100"
                          src="images/Occassion4.png"
                          alt=""
                        />
                      </a>
                      <div className="hoverBlock">
                        <div className="overlay text-center">
                          <p className="fs-13 font-r text-color-1">
                            Women Teal Blue &amp; Beige Ethnic Motifs Printed
                            Straight Kurti
                          </p>
                          <p className="fs-19 font-sb text-color-3 py-3">
                            ₹3,450
                          </p>
                          <a
                            onClick={() =>
                              route.replace(Permalink.ofDummyProduct())
                            }
                            className="btn-border fs-13 text-color-3"
                          >
                            More Info
                          </a>
                          <a href="#" className="btn fs-13">
                            Add to Cart
                          </a>
                        </div>
                        <div className="speaker">
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/wishlist-detail.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/volume.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/swap.png" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="thumb position-relative text-center">
                    <div className="bg4">
                      <a href="#">
                        <img
                          className="w-100"
                          src="images/Occassion4.png"
                          alt=""
                        />
                      </a>
                      <div className="hoverBlock">
                        <div className="overlay text-center">
                          <p className="fs-13 font-r text-color-1">
                            Women Teal Blue &amp; Beige Ethnic Motifs Printed
                            Straight Kurti
                          </p>
                          <p className="fs-19 font-sb text-color-3 py-3">
                            ₹3,450
                          </p>
                          <a
                            onClick={() =>
                              route.replace(Permalink.ofDummyProduct())
                            }
                            className="btn-border fs-13 text-color-3"
                          >
                            More Info
                          </a>
                          <a href="#" className="btn fs-13">
                            Add to Cart
                          </a>
                        </div>
                        <div className="speaker">
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/wishlist-detail.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/volume.png" />
                          </a>
                          <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="images/swap.png" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartScreen;
