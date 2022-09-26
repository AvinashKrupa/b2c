import React from "react";
import Slider from "react-slick";
import { Cart } from "../../../../network/gateway/Cart";
import { exploreSliderSetting } from "../../../../utils/sliderConfig";
import { useRouter } from "next/router";
import useCartStore from "../../../../zustand/cart";
import Permalink from "../../../../utils/Permalink";
import useWishlistStore from "../../../../zustand/wishlist";
import Image from 'next/image';
import ExploreImage from '../../../../public/images/explore.png';
import NoImage from '../../../../public/images/no-image.png';

interface iProps {
  data: any;
  onAddCart: (id: string) => void;
  onWishlist: (id: string) => void;
  onDeletwishlistItem: (id: string) => void;

}

const BringInEssence = (props: iProps) => {
  const cartItems = useCartStore((state: any) => state.cartItems);
  const wishItems = useWishlistStore((state: any) => state.wishlistItems);
  const router = useRouter();
  return (
    <section className="wardrobe mt-4 mt-md-5">
      <div className="row">
        <div className="col-md-12 col-lg-6 pe-3 pe-lg-0">
          <Image className="w-100" src={ExploreImage} alt="" width={703} height={768}/>
          <a onClick={() => router.replace(Permalink.ofShop())} className="btn fs-26 ms-0 ms-lg-4 mt-4">
            Explore the Holi Store
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              fill="currentColor"
              className="bi bi-arrow-up-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
              />
            </svg>
          </a>
        </div>
        <div className="col-md-12 col-lg-6 align-self-center ps-3 ps-lg-0 Occasion">
          <div className="leftbar">
            <h3 className="ps-0 ps-lg-5 mt-4 mt-lg-0 fs-40 font-sb">
              Bring in the Essence of Holi to your wardrobe
            </h3>
            <p className="ps-0 ps-lg-5 fs-30 py-4">
              Offer Valid Untill 30th June 2022
            </p>
            <div className="explore-slider">
              <Slider {...exploreSliderSetting}>
                {props.data.map((info: any, index: number) => {
                  return (<div key={index} className="thumb position-relative text-center bg1">
                    <a onClick={() => router.replace(Permalink.ofProduct(info))}>
                      <Image
                        className="w-100"
                        src={info?.image ? info?.image: NoImage}
                        alt=""
                        width={204}
                        height={289}
                      />
                    </a>
                    <div className="hoverBlock">
                      <div className="overlay text-center">
                        <p className="fs-13 font-r text-color-1">
                          {info.description}
                        </p>
                        {/* <p className="fs-19 font-sb text-color-3 py-2">{info.sale_price}</p> */}
                        <div className="product-price">
                          <span className="new-price mb-0 font-sb">
                            <span>₹{info.sale_price}</span>
                          </span>
                        </div>
                        <a
                          onClick={() => router.replace(Permalink.ofProduct(info))}
                          className="btn-border fs-13 text-color-3"
                          tabIndex={0}
                        >
                          More Info
                        </a>
                        <br/>
                        <br/>
                        <a
                          onClick={() => {
                            if (Cart.isProductInCart(info.id)) {
                              router.replace(Permalink.ofCart());
                            } else {
                              props.onAddCart(info.id);
                            }
                          }}
                          className="btn fs-9 w-100"
                          tabIndex={0}
                        >
                          {cartItems?.includes(info.id) || false
                            ? "Go To Cart"
                            : "Add to Cart"}
                        </a>
                      </div>
                      <div className="speaker">
                        {/* <a href="#" className="d-block mb-2" tabIndex={0}>
                          <img src="images/wishlist-detail.png" />
                        </a> */}
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
                        {/* <a href="#" className="d-block  mb-2" tabIndex={0}>
                          <img src="/images/volume.png" />
                        </a>
                        <a href="#" className="d-block  mb-2" tabIndex={0}>
                          <img src="/images/swap.png" />
                        </a> */}
                      </div>
                    </div>
                  </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BringInEssence;
