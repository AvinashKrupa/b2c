import React from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { Cart } from "../../../../network/gateway/Cart";
import Permalink from "../../../../utils/Permalink";
import { occasionSetting } from "../../../../utils/sliderConfig";
import useCartStore from "../../../../zustand/cart";
import SectionHeader from "./SectionHeader";
import useWishlistStore from "../../../../zustand/wishlist";
import Image from 'next/image';
import NoImage from '../../../../public/images/no-image.png';
import LocalStorageService from "../../../../utils/storage/LocalStorageService";
import { Wishlist } from "../../../../network/gateway/Wishlist";

interface iProps {
  data: any;
  onAddCart: (id: string) => void;
  onWishlist: (id: string) => void;
  onDeletwishlistItem: (id: string) => void;
}

const TopCollections = (props: iProps) => {
  const route = useRouter();
  const cartItems = useCartStore((state: any) => state.cartItems);
  const wishItems = useWishlistStore((state: any) => state.wishlistItems);

return (
    <section className="mt-4 mt-md-5 bg-outfits pb-5">
      <div className="wrapper">
        <div className="row">
          <SectionHeader title={"Top Collections"} />
          <div className="col-md-12 mt-4 mt-lg-5 position-relative sliderView Occasion">
            <div className="ocassion-slider">
              <Slider {...occasionSetting}>
                {props.data.map((info: any, index: number) => {
                  return (
                    <div key={index} className="thumb position-relative text-center product-block">
                      <div className="bg1">
                        <a onClick={() => route.replace(Permalink.ofProduct(info))}>
                          <Image
                            style={{ objectFit: "contain" }}
                            className="w-100"
                            src={info?.image ? info?.image : NoImage}
                            alt=""
                            width={312}
                            height={449}
                          />
                        </a>
                        <div className="hoverBlock">
                          <div className="overlay   text-center">
                            <p>
                              <a
                                className="fs-13 font-r text-color-1"
                                onClick={() => route.replace(Permalink.ofProduct(info))}
                              >
                                {info.description}
                              </a>
                            </p>
                            {/* <p className="fs-19 font-sb text-color-3 py-3">
                              {info.sale_price}
                            </p> */}

                            <div className="product-price">
                              <span className="new-price mb-0 font-sb">
                                <span>₹{info.sale_price}</span>
                              </span>
                              <span className="last-price mb-0 fs-12 font-r">
                                <span className="text-color-1">
                                  ₹{info.list_price}
                                </span>
                              </span>

                              <p className="save fs-10 font-r">
                                You save ₹
                                {info.list_price - (info.sale_price || 0)}
                              </p>
                            </div>
                            <a
                              onClick={() => route.replace(Permalink.ofProduct(info))}
                              className="btn-border fs-13 text-color-3"
                              tabIndex={0}
                            >
                              More Info
                            </a>
                            <a
                              onClick={() => {
                                if (Cart.isProductInCart(info.id)) {
                                  route.replace(Permalink.ofCart());
                                } else {
                                  props.onAddCart(info.id);
                                }
                              }}
                              className="btn fs-13 "
                              tabIndex={0}
                            >
                              {cartItems?.includes(info.id) || false
                                ? "Go To Cart"
                                : "Add to Cart"}
                            </a>
                          </div>
                          <div className="speaker">
                            {wishItems?.includes(info.id) ? <div className="product-block-1 mb-5">
                              <button type="button" className="btn-heart mb-5" onClick={() => { props.onDeletwishlistItem(info.id) }}><i className=" far fa-heart fa-fw "></i></button>
                            </div> : <a
                              onClick={() => {
                                props.onWishlist(info.id);
                              }}
                              className=" mb-5 d-block"
                              tabIndex={0} >
                              <img src="/images/wishlist-detail.png" />
                            </a>}
                            {/* <a href="#" className="d-block  mb-5" tabIndex={0}>
                              <img src="/images/volume.png" />
                            </a>
                            <a href="#" className="d-block  mb-5" tabIndex={0}>
                              <img src="/images/swap.png" />
                            </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCollections;
