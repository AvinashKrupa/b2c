import React, { useEffect, useState } from "react";
import Permalink from "../../../utils/Permalink";

import ExploreBlock from "../common/ExploreBlock";
import SpinBlock from "../common/SpinBlock";
import { useRouter } from "next/router";
import { Cart } from "../../../network/gateway/Cart";
import { Wishlist } from "../../../network/gateway/Wishlist";
import useCartStore from "../../../zustand/cart";
import useWishlistStore from "../../../zustand/wishlist";

const TypeSenseProductSmallBlock = (props: any) => {
  const { document } = props;
  const [discount, setDiscount] = useState<number>(0);
  const [cartView, setCartView] = useState(false);
  const cartItems = useCartStore((state: any) => state.cartItems);
  const wishItems = useWishlistStore((state: any) => state.wishlistItems);
  const router = useRouter();
  useEffect(() => {
    getOffPercent();
    return () => {};
  }, []);
  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const getOffPercent = () => {
    let price = document.original_price;
    let salePrice = document.sale_price;
    setDiscount(Math.floor(((price - salePrice) / price) * 100));
  };

  return (
    <div className="col-xl-6">
      {document.exploreBlock && <ExploreBlock />}
      <div
        className={"product-block bg-" + randomIntFromInterval(1, 6)}
        // style={{ background: "antiquewhite" }}
      >
        {document.spinBlock && <SpinBlock />}
        <div className="row g-0">
          <div className="col-sm-7">
            <div className="product-image position-relative">
              {document?.main_image ? (
                <a
                  onClick={() => router.replace(Permalink.ofProduct(document))}
                >
                  <img src={document.main_image} className="img-fluid" />
                </a>
              ) : (
                <a
                  onClick={() => router.replace(Permalink.ofProduct(document))}
                >
                  <img src="/images/no-image.png" className="img-fluid" />
                </a>
              )}
              <button type="button" className="btn-voice">
                <i className="fas fa-volume-high fa-fw" />
              </button>
              {!wishItems?.includes(document.product_id) ? (
                <button
                  onClick={() => {
                    props.addToWishList(document.product_id);
                    setCartView(true);
                  }}
                  type="button"
                  className="btn-heart"
                >
                  {/* <i
                  className={`far fa-heart fa-fw ${
                    Wishlist.isWishlistProduct(document.product_id) ? "active" : ""
                  }`}
                /> */}
                  <i className="far fa-heart fa-fw"></i>
                </button>
              ) : (
                <div className="product-block-1 mb-5">
                  <button
                    type="button"
                    className="btn-heart mb-5"
                    style={{ right: 12 }}
                    onClick={() => {
                      document.onDeletwishlistItem(document.product_id);
                    }}
                  >
                    <i className=" far fa-heart fa-fw "></i>
                  </button>
                </div>
              )}
              <span className="img-name">{document.material}</span>
            </div>
            {document.price_difference > 0 && (
              <div className="discountBar text-white">
                <h4 className="fs-16 font-sb">{discount}% Discount</h4>
                <p className="fs-13 font-r">22 : 38 : 18</p>
              </div>
            )}
          </div>
          <div className="col-sm-5">
            <div className="product-content-area">
              <h6>
                <a
                  onClick={() => router.replace(Permalink.ofProduct(document))}
                >
                  {document.name}
                </a>
              </h6>
              <p
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {document.description}
              </p>
              {/* <div className="product-rating text-center">
                <span>4.6</span>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <i className="fas fa-star fa-fw" />
                  </li>
                  <li className="list-inline-item">
                    <i className="fas fa-star fa-fw" />
                  </li>
                  <li className="list-inline-item">
                    <i className="fas fa-star fa-fw" />
                  </li>
                  <li className="list-inline-item">
                    <i className="fas fa-star fa-fw" />
                  </li>
                  <li className="list-inline-item">
                    <i className="fas fa-star-half fa-fw" />
                  </li>
                </ul>
              </div> */}
              <br />
              <br />
              <div className="product-price text-center">
                <span className="less-price">
                  <i className="fas fa-indian-rupee-sign fa-fw" />{" "}
                  {document?.original_price ?? 0}
                </span>
                <span className="total-price">
                  <i className="fas fa-indian-rupee-sign fa-fw" />
                  {document?.sale_price ?? 0}
                </span>
                <span className="less-save">
                  You save <i className="fas fa-indian-rupee-sign fa-fw" />{" "}
                  {document?.price_difference ?? 0}
                </span>
              </div>
              <div className="product-btn text-center">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="btn-outline btn-sm w-100 mb-2"
                  onClick={() => props.onClickQuickView(document.product_id)}
                >
                  Quick View
                </button>

                <button
                  type="button"
                  className="btn btn-sm w-100 cart-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    if (Cart.isProductInCart(document.product_id)) {
                      router.replace(Permalink.ofCart());
                    } else {
                      props.addToCart(document.product_id);
                      setCartView(true);
                    }
                  }}
                >
                  {cartItems?.includes(document.product_id) || false
                    ? "Go To Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeSenseProductSmallBlock;
