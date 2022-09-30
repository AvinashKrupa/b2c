import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Footer from "../../../app/components/common/Footer";
import SearchPopup from "../../../app/components/common/SearchPopup";
import DetailMobile from "../../../app/components/product/DetailMobile";
import DetailMobileContent from "../../../app/components/product/DetailMobileContent";
import DetailRecentlyViewed from "../../../app/components/product/DetailRecentlyViewed";
import DetailSecondProduct from "../../../app/components/product/DetailSecondProduct";
import DetailSimilarProducts from "../../../app/components/product/DetailSimilarProducts";
import DetailUpsellCrossSell from "../../../app/components/product/DetailUpsellCrossSell";
import { CatalogService } from "../../../network/gateway/Catalog";
import Header from "../../../app/themes/themeOne/components/Header";

import { productDetailSliderSetting } from "../../../utils/sliderConfig";
import ProductObj from "../../../utils/ProductObj";
import Loader from "../../../app/components/loader/loader";
import { Cart } from "../../../network/gateway/Cart";
import LocalStorageService from "../../../utils/storage/LocalStorageService";
import Permalink from "../../../utils/Permalink";
import Login from "../../../app/components/login";
import useCartStore from "../../../zustand/cart";
import { Wishlist } from "../../../network/gateway/Wishlist";


const ProductDetailScreen: NextPage = () => {
  const router = useRouter();
  const { slug, id } = router.query;
  const [login, setLogin] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<number>(1);
  const [product, setProduct] = useState<ProductObj>();
  const [loading, setLoading] = useState<Boolean>(true);
  const cartItems = useCartStore((state: any) => state.cartItems);
  const initSizeValues: any = [
    {
      size: "",
      qty: "",
      color: "",
      popup: ''
    },
  ];
  const [sizeValues, setSizeValues] = useState<any>(initSizeValues);
  const [colorPopup, setColorPopup] = useState<boolean>(false)

  useEffect(() => {
    if (id) {
      getProductDetail(id);
    }
    return () => { };
  }, [id]);

  function getProductDetail(itemId: any) {
    if (itemId) {
      CatalogService.getInstance()
        .getProducDetail(itemId)
        .then((response: any) => {
          if (response.data) {
            setProduct(new ProductObj(response?.data?.data));
            setLoading(false)
          } else {
            console.log("ERROR:", response.data);
          }
        })
        .catch((error) => { });
    }
  }

  const handleSizeChange = (i: number, name: any, value: any) => {
    let newSizeValues: any = [...sizeValues]; 
    newSizeValues[i][name] = value;
    setSizeValues(newSizeValues);
    let selectCombination: any = product?.selectCombination;
    selectCombination.size = value;
    product?.setSelectCombination(selectCombination);
  };
  
  const handleSize = (i: number, name: any, value: any) => {
   
    let selectCombination: any = product?.selectCombination;
    selectCombination.size = value;
    product?.setSelectCombination(selectCombination);    
    getProductDetail(
      product?.selectCombination.id
    ); 
    product?.changeVariantBySize(value);
  };

  const handleColor = (i: number, name: any, value: any) => {
   
    let selectCombination: any = product?.selectCombination;
    selectCombination.color = value;
    product?.setSelectCombination(selectCombination);
  };

  const addSizeFields = () => {
    setSizeValues([...sizeValues, initSizeValues[0]]);
  };

  const removeSizeFields = (i: number) => {
    let newSizeValues = [...sizeValues];
    newSizeValues.splice(i, 1);
    setSizeValues(newSizeValues);
  };

  function addToCart(id: any) {
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

  function addToWishList(id: string) {
    Wishlist.getInstance()
      .addToWishList(id)
      .then((info) => {
        console.log("info", info);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function deleteFromWishlist(id: string) {
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


  return (
    <>
      <div className="product-detail-page">
        <div className="wrapper">
          {/* Header */}
          <Header />
          {/* End Header */}
          {loading && <Loader loading={loading} />}
          {
            product && (
              <section className="mt-0 mt-lg-5 pdp-detail">
                <DetailMobile />
                <div className="pdp-slider d-lg-block d-none">
                  <Slider {...productDetailSliderSetting}>
                    <div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="discount-offer text-white">
                            <h4 className="fs-16 font-sb">
                              {product?.getOffPercent()}% Discount
                            </h4>
                            <p className="fs-13 font-r">22:38:18</p>
                          </div>
                           <div className="offtype mt-5">
                            <a href="#">
                              <img
                                className="me-2 d-inline-block"
                                src="/images/Offer.png"
                                alt=""
                              />
                              Offers
                            </a>
                          </div>
                          <p className="mt-4">
                            <span className="font-sb text-color-2">
                              Get{" "}
                              <img
                                className="mx-2 d-inline-block"
                                src="/images/coins.png"
                                alt=""
                              />{" "}
                              1000
                            </span>{" "}
                            for every size XL order placed
                          </p>
                          <p className="mt-4">
                            Avail{" "}
                            <span className="font-sb text-color-2">
                              No Cost EMI
                            </span>{" "}
                            on select cards for orders above ₹3000
                          </p>
                          <p className="mt-4">
                            Get GST invoice and{" "}
                            <span className="font-sb text-color-2">
                              save up to 28%
                            </span>{" "}
                            on business purchases.
                          </p>
                          <ul className="length mt-5">
                            <li>
                              <span className="fs-12 font-r text-color-5">
                                Sleeve Length
                              </span>
                              <p className="fs-14 font-r text-color-2">
                                Three-Quarter Sleeve
                              </p>
                            </li>
                            <li>
                              <span className="fs-12 font-r text-color-5">
                                Fabric
                              </span>
                              <p className="fs-14 font-r text-color-2">
                                Viscose Rayon
                              </p>
                            </li>
                            <li>
                              <span className="fs-12 font-r text-color-5">
                                Pattern
                              </span>
                              <p className="fs-14 font-r text-color-2">Printed</p>
                            </li>
                            <li>
                              <span className="fs-12 font-r text-color-5">
                                Wash Care
                              </span>
                              <p className="fs-14 font-r text-color-2">
                                Hand Wash
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <img
                            className="w-100"
                            src={product?.getFeaturedImage()}
                            alt={product?.getName()}
                          />
                        </div>
                        <div className="col-md-4">
                          <div className="">
                            <h2 className="product-title fs-24 font-sb">
                              {product?.getName()}
                            </h2>
                            <p className="fs-20 font-r text-color-2 mt-2">
                              {product?.getShortDescription()}
                            </p>
                            <div>
                              <p className="fs-12 font-r text-color-1 mt-5 mb-3">
                                Size available
                              </p>
                              <ul className="size d-flex">
                                {product?.getSizes().map((info: any, index: number) => {
                                  if (product?.selectCombination.size == info.id) {
                                    return (
                                      <li
                                        key={index}
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
                                          handleSize(index, "size", info.id)                            
                                                                                  
                                        }}
                                        className="available"
                                      >
                                        {info.name}
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </div>
                            <div className="custom-radios">
                              <p className="fs-14 font-r text-color-1 mt-4 mb-3">
                                Colours Available
                              </p>
                              {product
                                ?.getColors()
                                .map((item: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      onClick={(e) => {
                                        product?.changeVariantByColor(item.id);
                                        getProductDetail(
                                          product?.selectCombination.id
                                        );
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        id={"color-" + index}
                                        name="color"
                                        defaultValue={""}
                                        defaultChecked={false}
                                        tabIndex={index}
                                      />
                                      <label htmlFor={"color-" + index}>
                                        <span
                                          style={{ background: item.description }}
                                        >
                                          {/* <div title={item.name} /> */}
                                        </span>
                                      </label>
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="cart-right-area p-0">
                              <div className="table-responsive mt-5 position-relative">
                                <div className={"custom-radios colorPopup" + (colorPopup ? "show" : " ")} style={!colorPopup ? { display: 'none', } : {}}>
                                  {product
                                    ?.getColors()
                                    .map((item: any, index: number) => {
                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            product?.changeVariantByColor(item.id);
                                            getProductDetail(
                                              product?.selectCombination.id
                                            );
                                          }}
                                        >
                                          <input
                                            type="radio"
                                            id={"color-" + index}
                                            name="color"
                                            defaultValue={""}
                                            defaultChecked={false}
                                            tabIndex={index}

                                          />
                                          <label htmlFor={"color-" + index}>
                                            <span
                                              style={{ background: item.description }}
                                            >
                                              <div title={item.name} onClick={() => { setColorPopup(!colorPopup) }} />
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    })}
                                </div>

                                <table className="table cart-table">
                                  <tbody>
                                    {sizeValues.map(
                                      (element: any, index: number) => (
                                        <tr key={index}>
                                          <td>
                                            <span>Size</span>
                                            <select
                                              className="form-select"
                                              name="size"
                                              onChange={(e) =>
                                                handleSizeChange(index, e.target.name, e.target.value)
                                              }
                                            >
                                              {product
                                                ?.getSizes()
                                                .map(
                                                  (item: any, index: number) => {
                                                    return (
                                                      <option
                                                        key={index}
                                                        value={item.id}
                                                      >
                                                        {item.name}
                                                      </option>
                                                    );
                                                  }
                                                )}
                                            </select>
                                          </td>
                                          <td>
                                            <span>Qty</span>
                                            <select
                                              className="form-select"
                                              name="qty"
                                              onChange={(e) =>
                                                handleSizeChange(index, e.target.name, e.target.value)
                                              }
                                            >
                                              {product
                                                ?.getQuantityList()
                                                .map(
                                                  (item: any, index: number) => {
                                                    return (
                                                      <option
                                                        key={index}
                                                        value={item}
                                                      >
                                                        {item}
                                                      </option>
                                                    );
                                                  }
                                                )}
                                            </select>
                                          </td>
                                          <td className="price d-flex" >

                                            <span className="align-self-center">
                                              Color
                                            </span>
                                            <div className="custom-radios colorPopup">
                                              <div>
                                                <input
                                                  type="radio"
                                                  id="color-3"
                                                  name={"color"}
                                                  defaultChecked
                                                  tabIndex={0}
                                                  onChange={(e) =>
                                                    handleSizeChange(index, e.target.name, e.target.value)
                                                  }
                                                  value={element.color}
                                                  onClick={() => {
                                                    setColorPopup(!colorPopup)

                                                  }}
                                                />
                                                <label htmlFor="color-3">
                                                  <span>
                                                    <div></div>
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center mb-4">
                                <button
                                  type="button"
                                  className="cartrow-btn"
                                  onClick={() => addSizeFields()}
                                >
                                  <i className="fas fa-plus fa-fw" /> Add Another
                                  Size
                                </button>
                              </div>
                            </div>
                             <a
                              href="#"
                              className="avail mt-4"
                              title="Add 20 more units in Size 36 to avail discounts"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-info-circle me-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg>
                              Add 20 more units in Size 36 to avail discounts
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DetailSecondProduct/>
                  </Slider>
                </div>
              </section>
            )
          }
        </div>
        <div className="m-bg position-relative">
          <br />
          <br />
          <br />
          <div className="wrapper">
            {
              product && (
                <>
                  <section className="mt-5 mt-lg-0">
                    <DetailMobileContent />
                    <ul
                      className="nav nav-tabs border-0 justify-content-between mb-3"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link font-sb bg-1 mt-3 ${selectedSection == 1 ? "active" : ""
                            }`}
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                          onClick={() => {
                            setSelectedSection(1);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-text-left"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                          Description
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link font-sb bg-2 second ${selectedSection == 2 ? "active" : ""
                            }`}
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                          onClick={() => {
                            setSelectedSection(2);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                          References
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link font-sb bg-3 third ${selectedSection == 3 ? "active" : ""
                            }`}
                          id="contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#contact"
                          type="button"
                          role="tab"
                          aria-controls="contact"
                          aria-selected="false"
                          onClick={() => {
                            setSelectedSection(3);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-star"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                          </svg>
                          Reviews
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div
                        className={`tab-pane fade show ${selectedSection == 1 ? "active" : ""
                          }`}
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        {product?.getDescription()}
                      </div>
                      <div
                        className={`tab-pane fade show ${selectedSection == 2 ? "active" : ""
                          }`}
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              src="/images/ref-1.png"
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="partCollection">
                                  <h3 className="fs-24 font-sb text-color-4">
                                    Part of Manish Malhotra’s Couture Collection
                                  </h3>
                                  <p className="fs-20 font-r text-white py-3">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nunc vulputate libero et velit
                                    interdum, ac aliquet odio mattis. Class aptent
                                    taciti sociosqu ad litora torquent per conubia
                                    nostra, per inceptos himenaeos.
                                  </p>
                                  <a
                                    className="fs-20 font-r text-white"
                                    href="#"
                                    title="View Collectio"
                                  >
                                    View Collection
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
                                </div>
                              </div>

                            </div>
                            <div className="row mt-4">
                              <div className=" col-lg-6 position-relative mb-4 mb-lg-0">
                                <a href="#">
                                  <div className="similarBox bg-clr1">
                                    <div className="imgitem">
                                      <img className="w-100" src="/images/simi-1.png" alt="" />
                                    </div>
                                    <div className="content">
                                      <h5 className="fs-18 font-r btn-simi">Similar</h5>
                                      <h4 className="fs-20 font-r text-color-8">Top Trending on </h4>
                                      <h4 className="fs-26 font-m text-white my-2">www.myntra.com </h4>
                                      <h4 className="fs-20 font-r text-color-8">Indian Ethnic Collection</h4>
                                    </div>
                                  </div>
                                </a>
                              </div>
                              <div className=" col-lg-6 position-relative">
                                <a href="#">
                                  <div className="similarBox bg-clr2">
                                    <div className="imgitem">
                                      <img className="w-100" src="/images/simi-2.png" alt="" />
                                    </div>
                                    <div className="content">
                                      <h5 className="fs-18 font-r btn-simi">Similar</h5>
                                      <h4 className="fs-20 font-r text-color-8">Top Trending on </h4>
                                      <h4 className="fs-26 font-m text-white my-2">www.myntra.com </h4>
                                      <h4 className="fs-20 font-r text-color-8">Indian Ethnic Collection</h4>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`tab-pane fade show ${selectedSection == 3 ? "active" : ""
                          }`}
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      >
                        <div className="row">
                          <div className="col-md-6 col-lg-5">
                            <div className="totalReview mb-5">
                              <h4 className="fs-36 font-r text-color-2">4.6</h4>
                              <span className="fs-10 font-sb text-color-1">
                                345 Verified Buyers
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={30}
                                height={30}
                                fill="currentColor"
                                className="bi bi-star-fill text-color-1"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg>
                            </div>
                            <div className="row align-items-center barReview mb-3">
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-1">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    fill="#C4BAAA"
                                    className="bi bi-star ms-0"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                  </svg>
                                </h4>
                              </div>
                              <div className="col-9">
                                <div className="progress">
                                  <div
                                    className="progress-bar progress-bar-striped"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={22}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-2">22</h4>
                              </div>
                            </div>
                            <div className="row align-items-center barReview mb-3">
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-1">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    fill="#C4BAAA"
                                    className="bi bi-star ms-0"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                  </svg>
                                </h4>
                              </div>
                              <div className="col-9">
                                <div className="progress">
                                  <div
                                    className="progress-bar progress-bar-striped"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={22}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-2">22</h4>
                              </div>
                            </div>
                            <div className="row align-items-center barReview mb-3">
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-1">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    fill="#C4BAAA"
                                    className="bi bi-star ms-0"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                  </svg>
                                </h4>
                              </div>
                              <div className="col-9">
                                <div className="progress">
                                  <div
                                    className="progress-bar progress-bar-striped"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={22}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-2">22</h4>
                              </div>
                            </div>
                            <div className="row align-items-center barReview mb-3">
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-1">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    fill="#C4BAAA"
                                    className="bi bi-star ms-0"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                  </svg>
                                </h4>
                              </div>
                              <div className="col-9">
                                <div className="progress">
                                  <div
                                    className="progress-bar progress-bar-striped"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={22}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-2">22</h4>
                              </div>
                            </div>
                            <div className="row align-items-center barReview mb-3">
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-1">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                    fill="#C4BAAA"
                                    className="bi bi-star ms-0"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                  </svg>
                                </h4>
                              </div>
                              <div className="col-9">
                                <div className="progress">
                                  <div
                                    className="progress-bar progress-bar-striped"
                                    role="progressbar"
                                    style={{ width: "70%" }}
                                    aria-valuenow={22}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <h4 className="fs-20 font-r text-color-2">22</h4>
                              </div>
                            </div>
                            <div className="customersay mt-5">
                              <h4 className="fs-16 font-r text-color-2 text-uppercase pb-4">
                                What Customer Said
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  fill="#000"
                                  className="bi bi-star"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                </svg>
                              </h4>
                              <div className="row align-items-center barReview mb-3">
                                <div className="col-md-12">
                                  <div>
                                    <h4 className="fs-16 font-r text-color-1">
                                      Fit
                                    </h4>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-striped"
                                      role="progressbar"
                                      style={{ width: "70%" }}
                                      aria-valuenow={22}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <h4 className="fs-13 font-r text-color-2">
                                    As Expected 50%
                                  </h4>
                                </div>
                              </div>
                              <div className="row align-items-center barReview mb-3">
                                <div className="col-md-12">
                                  <div className="">
                                    <h4 className="fs-16 font-r text-color-1">
                                      Lenth
                                    </h4>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-striped"
                                      role="progressbar"
                                      style={{ width: "70%" }}
                                      aria-valuenow={22}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <h4 className="fs-13 font-r text-color-2">
                                    As Expected 50%
                                  </h4>
                                </div>
                              </div>
                              <div className="row align-items-center barReview mb-3">
                                <div className="col-md-12">
                                  <div className="">
                                    <h4 className="fs-16 font-r text-color-1">
                                      Transparency
                                    </h4>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-striped"
                                      role="progressbar"
                                      style={{ width: "70%" }}
                                      aria-valuenow={22}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <h4 className="fs-13 font-r text-color-2">
                                    As Expected 50%
                                  </h4>
                                </div>
                              </div>
                              <a href="#" className="fs-13 font-sb btn-view">
                                View Detail
                              </a>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-5 offset-lg-2">
                            <h4 className="fs-32 font-sb text-color-1 pb-4">
                              Customer Reviews (32)
                            </h4>
                            <ul>
                              <li>
                                <div className="starReview green text-white d-inline-block me-3">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={10}
                                    height={10}
                                    fill="#fff"
                                    className="bi bi-star-fill text-color-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                </div>
                                <div className="d-inline-block">
                                  <ul>
                                    <li className="list-inline-item">
                                      <a href="#">
                                        <img
                                          className="img-fluid"
                                          src="/images/cr-1.png"
                                          alt=""
                                        />
                                      </a>
                                    </li>
                                    <li className="list-inline-item">
                                      <a href="#">
                                        <img
                                          className="img-fluid"
                                          src="/images/cr-1.png"
                                          alt=""
                                        />
                                      </a>
                                    </li>
                                    <li className="list-inline-item">
                                      <a href="#">
                                        <img
                                          className="img-fluid"
                                          src="/images/cr-1.png"
                                          alt=""
                                        />
                                      </a>
                                    </li>
                                    <li className="list-inline-item">
                                      <a href="#">
                                        <img
                                          className="img-fluid"
                                          src="/images/cr-1.png"
                                          alt=""
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                  <div className="pt-4">
                                    <h4 className="fs-13 font-r text-color-2">
                                      Little loose from shoulder
                                    </h4>
                                    <ul className="littleBar pb-4">
                                      <li className="list-inline-item me-0">
                                        <a
                                          href="#"
                                          className="fs-10 font-r text-color-1"
                                        >
                                          Anuj Sharma
                                        </a>
                                      </li>
                                      <li className="text-color-1 fs-10 list-inline-item me-0">
                                        |
                                      </li>
                                      <li className="list-inline-item">
                                        <a
                                          href="#"
                                          className="fs-10 font-r text-color-1"
                                        >
                                          12 June 2022
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </li>
                              <li className="mt-4">
                                <div className="starReview green text-white d-inline-block me-3">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={10}
                                    height={10}
                                    fill="#fff"
                                    className="bi bi-star-fill text-color-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                </div>
                                <div className="d-inline-block barwidth">
                                  <h4 className="fs-13 font-r text-color-2">
                                    Little loose from shoulder
                                  </h4>
                                  <ul className="littleBar pb-4">
                                    <li className="list-inline-item me-0">
                                      <a
                                        href="#"
                                        className="fs-10 font-r text-color-1"
                                      >
                                        Anuj Sharma
                                      </a>
                                    </li>
                                    <li className="text-color-1 fs-10 list-inline-item me-0">
                                      |
                                    </li>
                                    <li className="list-inline-item">
                                      <a
                                        href="#"
                                        className="fs-10 font-r text-color-1"
                                      >
                                        12 June 2022
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="mt-4">
                                <div className="starReview orange text-white d-inline-block me-3">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={10}
                                    height={10}
                                    fill="#fff"
                                    className="bi bi-star-fill text-color-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                </div>
                                <div className="d-inline-block barwidth">
                                  <h4 className="fs-13 font-r text-color-2">
                                    Little loose from shoulder
                                  </h4>
                                  <ul className="littleBar pb-4">
                                    <li className="list-inline-item me-0">
                                      <a
                                        href="#"
                                        className="fs-10 font-r text-color-1"
                                      >
                                        Anuj Sharma
                                      </a>
                                    </li>
                                    <li className="text-color-1 fs-10 list-inline-item me-0">
                                      |
                                    </li>
                                    <li className="list-inline-item">
                                      <a
                                        href="#"
                                        className="fs-10 font-r text-color-1"
                                      >
                                        12 June 2022
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="mt-4">
                                <div className="starReview red text-white d-inline-block me-3">
                                  5
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={10}
                                    height={10}
                                    fill="#fff"
                                    className="bi bi-star-fill text-color-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                  </svg>
                                </div>
                                <div className="d-inline-block barwidth">
                                  <h4 className="fs-13 font-r text-color-2">
                                    Little loose from shoulder
                                  </h4>
                                  <ul className="littleBar pb-4">
                                    <li className="list-inline-item me-0">
                                      <a
                                        href="#"
                                        className="fs-10 font-r text-color-1"
                                      >
                                        Anuj Sharma
                                      </a>
                                    </li>
                                    <li className="text-color-1 fs-10 list-inline-item me-0">
                                      |
                                    </li>
                                    <li className="list-inline-item">
                                      <a
                                        href="#"
                                        className="fs-10 font-r text-color-1"
                                      >
                                        12 June 2022
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="d-none d-lg-block">
                    <div className="row deliveryOption-row">
                      <div className="col-md-4">
                        <div className="deliveryOption position-relative text-center">
                          <img className="" src="/images/truck.png" alt="" />
                          <h4 className="mt-4">Get it by Wed, June 27</h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="deliveryOption position-relative text-center">
                          <img className="" src="/images/cod.png" alt="" />
                          <h4 className="mt-4">Pay on Delivery Available</h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="deliveryOption position-relative text-center">
                          <img className="" src="/images/return.png" alt="" />
                          <h4 className="mt-4">
                            Easy 30 day return &amp; exchange
                          </h4>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )
            }
            {/* Similar Products */}
            <DetailSimilarProducts />
            {/* End Similar Products */}
            {/* Upsell Cross sell */}
            <DetailUpsellCrossSell />
            {/* End Upsell Cross sell */}
            {/* Recently Viewed */}
            <DetailRecentlyViewed />
            {/* End Recently Viewed */}
          </div>
          <Footer />
          {
            product && (
              <div className="cartBar">
                <ul>
                  <li className="list-inline-item valign">
                    <div className="d-flex">
                      <h4 className="fs-20 text-color-2">
                        ₹{product?.getPrice()}
                      </h4>
                      <span className="fs-13 text-color-6">
                        ₹{product?.getOffAmount()} off ({product?.getOffPercent()}
                        %)
                      </span>
                      <span className="mx-3">or</span>
                      <span className="fs-13">
                        ₹3,399 +<img src="/images/coins.png" alt="" /> 51
                      </span>
                    </div>
                    <h5 className="fs-10 text-color-7 mt-2">
                      {product?.getStockLine()}
                    </h5>
                  </li>
                  <li className="list-inline-item offset-lg-2 mt-3 mt-lg-0 text-center text-lg-start">
                    <a className="product-block">
                      <button
                        onClick={() => {
                          if (Wishlist.isWishlistProduct(product.getId())) {
                            deleteFromWishlist(product.getId())
                          } else {
                            addToWishList(product.getId())
                          }
                        }}
                        type="button"
                        className={`btn-heart ${Wishlist.isWishlistProduct(product.getId()) ? "active" : ""
                          }`}
                      >
                        <i
                          className={`far fa-heart fa-fw`}
                        />
                      </button>
                    </a>
                    {/* <a
                      href="#"
                      className="btn-border fs-20 me-2 d-none d-lg-inline-block"
                    >
                      Request Sample
                    </a> */}

                    <a href="#" className="btn-border fs-20 me-2 d-lg-none">
                      Wishlist
                    </a>
                    <a
                      className="btn fs-20"
                      style={{ marginLeft: "200px" }}
                      onClick={() => {
                        if (Cart.isProductInCart(product.getId())) {
                          router.replace(Permalink.ofCart());
                        } else {
                          if (LocalStorageService.getAccessToken()) {
                            addToCart(product.getId());
                          } else {
                            setLogin(true);
                          }
                        }
                      }}
                    >
                      {
                        cartItems?.includes(product.getId()) || false
                          ? "Go To Cart"
                          : "Add to Cart"
                      }
                    </a>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
        {/* End Footer */}
        {/* Search Popup */}
        <SearchPopup />
        {/* End Search Popup */}
      </div>
      <Login
        onSuccess={() => {
          setLogin(false);
          addToCart(product?.getId());
        }}
        visible={login}
        onClose={() => setLogin(false)}
      />
    </>
  );
};

export default ProductDetailScreen;
