import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Cart } from "../../../network/gateway/Cart";
import { TypeSenseService } from "../../../network/gateway/TypeSenseService";
import { Wishlist } from "../../../network/gateway/Wishlist";
import Permalink from "../../../utils/Permalink";
import { occasionSetting } from "../../../utils/sliderConfig";
import LocalStorageService from "../../../utils/storage/LocalStorageService";

const DetailSimilarProducts = (props: any) => {
  const route = useRouter();

  const [productListing, setProductListing] = useState<any>();
  const [tagList, setTagList] = useState<any>(["Womens Kurtis", "Printed", "Cotton", "Three-Quarter Sleeve"])

  useEffect(() => {
    if (props?.name) {
      getSimilarProducts();
    }
  }, [route.query]);

  function getSimilarProducts() {

    let requestJSON: any = {
      q: props?.name,
      query_by: "name,category,color,brand,material,occasion,description",
      page: 1,
      per_page: 10,
      filter_by: "",
      sort_by: "",
    };

    TypeSenseService.getInstance()
      .getProductCollections(requestJSON)
      .then((response: any) => {
        if (response.data) {
          setProductListing(response.data.data);
        } else {
          console.log("ERROR:", response.data);
        }
      })
      .catch((error) => { });
  }

  return (
    <>
      {
        productListing?.length > 0 && (
          <section className="mt-4 mt-md-5 pb-5">
            <div className="row">
              <div className="col-md-12">
                <div className="heading3">
                  <h2>
                    <span className="bg9">Similar Products</span>
                  </h2>
                </div>
              </div>
              <div className="col-md-12 mt-4 mt-lg-5 position-relative sliderView Occasion">
                <div className="ocassion-slider">
                  <Slider {...occasionSetting}>
                    {
                      productListing?.map(({document}: any, index: number) => {
                        return (
                          <div key={index} className="thumb position-relative text-center">
                            <div className="bg1">
                              <a onClick={() => route.replace(Permalink.ofProduct(document))}>
                                <Image
                                  className="w-100"
                                  src={document?.main_image ?? "/images/no-image.png"}
                                  alt=""
                                  width={312}
                                  height={449}
                                />
                              </a>
                              <div className="hoverBlock">
                                <div className="overlay text-center">
                                  <p className="fs-13 font-r text-color-1" onClick={() => route.replace(Permalink.ofProduct(document))}>
                                    {document?.description}
                                  </p>
                                  <p className="fs-19 font-sb text-color-3 py-3">₹{document?.sale_price}</p>
                                  <a
                                    onClick={() => route.replace(Permalink.ofProduct(document))}
                                    className="btn-border fs-13 text-color-3"
                                  >
                                    More Info
                                  </a>
                                  <a 
                                   className="btn fs-13"
                                   onClick={() => {
                                    if (Cart.isProductInCart(document.product_id)) {
                                      route.replace(Permalink.ofCart());
                                    } else {
                                      if (LocalStorageService.getAccessToken()) {
                                        props.addToCart(document.product_id);
                                      } else {
                                        props.setLogin(true);
                                      }
                                    }
                                  }}
                                   >
                                    {
                                      props.cartItems?.includes(document.product_id) || false
                                        ? "Go To Cart"
                                        : "Add to Cart"
                                    }
                                  </a>
                                </div>
                                <div className="speaker">
                                  <a className="product-block p-image-block d-block mb-5" tabIndex={0}>
                                    <button
                                      onClick={() => {
                                        if (Wishlist.isWishlistProduct(document.product_id)) {
                                          props.deleteFromWishlist(document.product_id)
                                        } else {
                                          props.addToWishList(document.product_id)
                                        }
                                      }}
                                      type="button"
                                      className={`btn-heart ${Wishlist.isWishlistProduct(document.product_id) ? "active" : ""
                                        }`}
                                    >
                                      <i
                                        className={`far fa-heart fa-fw`}
                                      />
                                    </button>
                                  </a>
                                  <a href="#" className="product-block d-block mb-5" tabIndex={0}>
                                    <img src="/images/volume.png" />
                                  </a>
                                  <a href="#" className="product-block d-block mb-5" tabIndex={0}>
                                    <img src="/images/swap.png" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </Slider>
                </div>
              </div>
            </div>
          </section>
        )
      }
      <div className="col-md-12 text-center mt-4">
        {
          tagList?.map((item: any, index: number) => {
            return (

              <a key={index} onClick={() => route.push(Permalink.ofShop() + "?q=" + item)} className="btn btn-outline-danger ms-3">
                {item}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </a>
            )
          })
        }
      </div>
    </>
  );
};

export default DetailSimilarProducts;
