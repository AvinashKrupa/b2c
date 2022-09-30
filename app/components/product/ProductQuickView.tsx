import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Cart } from "../../../network/gateway/Cart";
import { Wishlist } from "../../../network/gateway/Wishlist";
import Permalink from "../../../utils/Permalink";
import LocalStorageService from "../../../utils/storage/LocalStorageService";
import useCartStore from "../../../zustand/cart";
import useWishlistStore from "../../../zustand/wishlist";
import Login from "../login";

const ProductQuickView = (props: any) => {
  console.log("this is product quick view",props)

  const route = useRouter();
  const [product, setProduct] = useState<any>(props?.data);
  console.log("props?.data",props?.data)
  const [selectCombination, setSelectedCombination] = useState({
    color: "",
    size: "",
    id: "",
  });
  const [login, setLogin] = useState<boolean>(false);
  const cartItems = useCartStore((state: any) => state.cartItems);
  const [selectedImage, setSelectedImage] = useState(0);
  const [colorCode, setColorCode] = useState("#ffffff");
  const wishItems = useWishlistStore((state: any) => state.wishlistItems);
  const router = useRouter();
  useEffect(() => {
    getSizes();
    getSelectedVariants();
  }, [props.data]);

  function getSelectedVariants() {
    let idObj = Object.keys(props.data.meta.variation_matrix);

    for (let i = 0; i < idObj.length; i++) {
      //size
      let innerObj = props.data.meta.variation_matrix[idObj[i]];
      let innerObjKeys = Object.keys(innerObj);
      for (let j = 0; j < innerObjKeys.length; j++) {
        //color
        if (innerObj[innerObjKeys[j]] === props.data.id) {
          setSelectedCombination({
            color: innerObjKeys[j],
            size: idObj[i],
            id: innerObj[innerObjKeys[j]],
          });
        }
      }
    }
  }

  function changeVariantByColor(id: string) {
    let idObj = Object.keys(props.data.meta.variation_matrix);

    for (let i = 0; i < idObj.length; i++) {
      //size
      if (idObj[i] == selectCombination.size) {
        let innerObj = props.data.meta.variation_matrix[idObj[i]];
        let innerObjKeys = Object.keys(innerObj);
        for (let j = 0; j < innerObjKeys.length; j++) {
          //color

          if (innerObjKeys[j] === id) {
            //color
            return {
              color: innerObjKeys[j],
              size: idObj[i],
              id: innerObj[innerObjKeys[j]],
            };
          }
        }
      }
    }
  }

  function changeVariantBySize(id: string) {
    let idObj = Object.keys(props.data.meta.variation_matrix);

    for (let i = 0; i < idObj.length; i++) {
      if (idObj[i] == id) {
        //size
        let innerObj = props.data.meta.variation_matrix[idObj[i]];
        let innerObjKeys = Object.keys(innerObj);
        //color
        return {
          color: innerObjKeys[0],
          size: idObj[i],
          id: innerObj[innerObjKeys[0]],
        };
      }
    }
  }

  function getSizes() {
    let sizes = props.data.meta.variations.filter((info: any) => {
      return info.name == "Size";
    });

    if (sizes.length > 0) {
      return sizes[0].options;
    } else {
      return [];
    }
  }

  function getColors() {
    Object.keys(props.data.meta.variation_matrix);
    let colors = props.data.meta.variations.filter((info: any) => {
      return info.name == "Color";
    });

    if (colors.length > 0) {
      return colors[0].options;
    } else {
      return [];
    }
  }

  function hexToRgbA(hex: string) {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.1)"
      );
    }
    ///  throw new Error("Bad Hex");
  }

  function addToCart(id: string) {
    const params = {
      data: {
        id: id,
        type: "cart_item",
        quantity: 1,
      },
    };
    Cart.getInstance()
      .addToCart(params)
      .then((info) => {
        console.log("info", info);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function deletwishlistItem(id: string) {
    let entry_id
    LocalStorageService.getWishlistIDEntry_ID().data?.map((each: any) => {
      if (each.id === id) {
        return entry_id = each.entry_id
      }
    })
    Wishlist.getInstance()
      .deleteWishListItem(entry_id, id)
      .then((response: any) => {
      })
      .catch((error) => {
        console.log("error", error);
      });

  }

  function addToWishList(id: string) {
    Wishlist.getInstance()
      .createWishlistEntry()
      .then((info) => {
        console.log("info", info);
      }).then(() => {
        Wishlist.getInstance()
          .addToWishList(id)
          .then((info) => {
            console.log("info", info);
            localStorage.removeItem("WISHLIST_ENTRY")
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <Modal
      show={props.openProductQuickView}
      animation={true}
      size={"xl"}
      id="checkOut"
    >
      <Login
        onSuccess={() => {
          addToCart(props.id);
        }}
        visible={login}
        onClose={() => setLogin(false)}
      />
      <div className="modal-content">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            props.setOpenProductQuickView(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </button>
        <div className="modal-body">
          <div className="detail-slider">
            <div
              className="product-block bg-1"
              style={{ backgroundColor: hexToRgbA(colorCode) }}
            >
              <div className="row">
                <div className="col-md-12 col-xl-8">
                  <div className="product-imgs">
                    <div className="img-select">
                      {props.data.attributes.images.map(
                        (info: any, index: number) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setSelectedImage(index);
                              }}
                              className="img-item"
                            >
                              <a href="#" data-id={`${index}`}>
                                <img
                                  style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 8,
                                  }}
                                  className=""
                                  src={info}
                                  alt="Detail image"
                                />
                              </a>
                            </div>
                          );
                        }
                      )}

                      {/* <div className="img-item">
                        <a href="#" data-id="2">
                          <img
                            className=""
                            src="/images/detail-thumb2.png"
                            alt="Detail image"
                          />
                        </a>
                      </div>
                      <div className="img-item">
                        <a href="#" data-id="3">
                          <img
                            className=""
                            src="/images/detail-thumb3.png"
                            alt="Detail image"
                          />
                        </a>
                      </div>
                      <div className="img-item">
                        <a href="#" data-id="4">
                          <img
                            className=""
                            src="/images/detail-thumb4.png"
                            alt="Detail image"
                          />
                        </a>
                      </div> */}
                    </div>
                    <div className="img-display">
                      <div className="img-showcase">
                        {/* {props.data.attributes.images.map((info: any) => {
                          return ( */}
                        <img
                          src={props.data.attributes.images[selectedImage]}
                          alt="Detail image"
                        />
                        {/* );
                        })} */}

                        {/* <img
                          src="/images/detail-pick-1.png"
                          alt="Detail image"
                        />
                        <img
                          src="/images/detail-pick-1.png"
                          alt="Detail image"
                        /> */}
                      </div>
                    </div>

                    <div className="speaker pe-5">

                    {wishItems?.includes(props.data.id) ? <div className="product-block-1 mb-5">
                              <button type="button" className="btn-heart mb-5" onClick={() => {deletwishlistItem(props.data.id) }}><i className=" far fa-heart fa-fw "></i></button>
                            </div> : <a
                              onClick={() => {
                                addToWishList(props.data.id);
                              }}
                              className=" mb-5 d-block"
                              tabIndex={0} >
                              <img src="/images/wishlist-detail.png" />
                            </a>}
                      {/* <a href="#" className="d-block mb-5">
                        <img src="/images/wishlist-detail.png" />
                      </a> */}
                     {/*  <a href="#" className="d-block  mb-5">
                        <img src="/images/volume.png" />
                      </a>
                      <a href="#" className="d-block  mb-5">
                        <img src="/images/swap.png" />
                      </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-xl-4 mt-0 mt-md-5 mt-lg-0">
                  <div className="product-content">
                    <h2 className="product-title fs-24 font-sb cursor-pointer" onClick={() => route.replace(Permalink.ofProduct(product))}>
                      {props.data.attributes.name}
                    </h2>
                    <p className="fs-14 font-r text-color-1 mt-2">
                      {props.data.attributes.description}
                    </p>
                    <p className="fs-12 font-r text-color-1 mt-5 mb-3">
                      Size available
                    </p>
                    <ul className="size d-flex">
                      {getSizes().map((info: any, index: number) => {
                        if (selectCombination.size == info.id) {
                          return (
                            <li
                              key={index}
                              // onClick={() =>
                              //   props.onSelectedProduct(selectCombination.id)
                              // }
                              className="select"
                            >
                              {info.name}
                            </li>
                          );
                        } else {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                let data = changeVariantBySize(info.id);
                                if (data?.id != undefined) {
                                  props.onSelectedProduct(data?.id);
                                }
                              }}
                              className="available"
                            >
                              {info.name}
                            </li>
                          );
                        }
                      })}

                      {/* <li className="custom-size">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-rulers me-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1H1z" />
                        </svg>
                      </li> */}
                      {/* <li className="sizechart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-bar-chart-fill me-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                        </svg>
                        Size Chart
                      </li> */}
                    </ul>
                    <div className="custom-radios">
                      <p className="fs-12 font-r text-color-1 mt-4 mb-3">
                        Color
                      </p>

                      {getColors().map((info: any, index: number) => {
                        if (selectCombination.color == info.id) {
                          return (
                            <div key={index} className="custom-radios selected-color" onClick={() => {}}>
                              <input
                                type="radio"
                                id="color-1"
                                name="color"
                                value="color-1"
                              />
                              <label htmlFor="color-1">
                                <span style={{ background: info.description }}>

                                </span>
                              </label>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                if (info.description != colorCode) {
                                  setColorCode(info.description);
                                }
                                let data = changeVariantByColor(info.id);
                                if (data?.id != undefined) {
                                  props.onSelectedProduct(data?.id);
                                }
                              }}
                            >
                              <input
                                type="radio"
                                id="color-1"
                                name="color"
                                value="color-1"
                              />
                              <label htmlFor="color-1">
                                <span
                                  style={{ background: info.description }}
                                ></span>
                              </label>
                            </div>
                          );
                        }

                        //       <li>36</li>
                        //
                        //   <li className="select">40</li>
                        //   <li className="available">42</li>
                      })}
                      {/* <div>
                        <input
                          type="radio"
                          id="color-1"
                          name="color"
                          value="color-1"
                          defaultChecked={true}
                        />
                        <label htmlFor="color-1">
                          <span>
                            <div></div>
                          </span>
                        </label>
                      </div> */}
                      {/* <div>
                        <input
                          type="radio"
                          id="color-2"
                          name="color"
                          value="color-2"
                        />
                        <label htmlFor="color-2">
                          <span>
                            <div></div>
                          </span>
                        </label>
                      </div> */}
                      {/* <div>
                        <input
                          type="radio"
                          id="color-3"
                          name="color"
                          value="color-3"
                        />
                        <label htmlFor="color-3">
                          <span>
                            <div></div>
                          </span>
                        </label>
                      </div> */}
                      {/* <div>
                        <input
                          type="radio"
                          id="color-4"
                          name="color"
                          value="color-4"
                        />
                        <label htmlFor="color-4">
                          <span>
                            <div></div>
                          </span>
                        </label>
                      </div> */}
                    </div>
                    <div className="list mt-4">
                      <div className="row">
                        <div className="col-md-12 d-flex">
                          <ul className="p-0 me-5">
                            <li className="list-inlne-item d-flex font-r">
                              <p>Sleeve Length </p>
                              Three-Quarter Sleeve
                            </li>
                            <li className="list-inlne-item d-flex font-r">
                              <p>Fabric </p>
                              Viscose Rayon
                            </li>
                            <li className="list-inlne-item d-flex font-r">
                              <p>Pattern </p>
                              Printed
                            </li>
                            <li className="list-inlne-item d-flex font-r">
                              <p>Wash Care </p>
                              Hand Wash
                            </li>
                            <li className="list-inlne-item d-flex font-r">
                              <p>Hemline </p>
                              Straight
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="hurryUp">
                      Hurry! Only <strong>24 Items</strong> Left in Stock
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="product-rating mt-0  text-center">
                          <span>4.7(21)</span>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <p className="fs-12 text-color-1">345 reviews</p>
                        </div>
                      </div>
                      <div className="col-sm-12  text-center">
                        <div className="product-price">
                          <p className="last-price mb-0 fs-12 font-r">
                            <span className="text-color-1">
                              ₹
                              {
                                props?.data.attributes.originalPrice?.currencies
                                  .INR.amount
                              }
                            </span>
                          </p>
                          <p className="new-price mb-0 font-sb">
                            <span>
                              ₹
                              {
                                props?.data.attributes.discountPrice?.currencies
                                  .INR.amount
                              }
                            </span>
                          </p>
                          <p className="save fs-10 font-r">
                            You save ₹
                            {props?.data.attributes.originalPrice?.currencies
                              .INR.amount -
                              (props?.data.attributes.discountPrice?.currencies
                                .INR.amount || 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="resquest">
                      <a href="#" className="font-m" title="">
                        Request Sample
                      </a>
                    </div>
                    <div className="purchase-info d-flex">
                      <button type="button" className="btn w-50" onClick={() => route.replace(Permalink.ofProduct(product))}>
                        More Info
                      </button>
                      <button
                        onClick={() => {
                          if (Cart.isProductInCart(props?.data.id)) {
                            router.replace("/cart");
                          } else {
                            if (LocalStorageService.getAccessToken()) {
                              addToCart(props?.data.id);
                            } else {
                              setLogin(true);
                            }
                          }
                        }}
                        type="button"
                        className="btn w-50"
                      >
                        {cartItems?.includes(props?.data.id) || false
                          ? "Go To Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickView;
