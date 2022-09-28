import React, { useState, useEffect } from "react";
import { Cart } from "../../../network/gateway/Cart";
import { CatalogService } from "../../../network/gateway/Catalog";
import Permalink from "../../../utils/Permalink";
import useCartStore from "../../../zustand/cart";
import { useRouter } from "next/router";
import ProductQuickView from "../product/ProductQuickView";
import ProductQuickViewLoader from "../loader/ProductQuickViewLoader";
import LocalStorageService from "../../../utils/storage/LocalStorageService";
import { Wishlist } from "../../../network/gateway/Wishlist";
import useUserStore from "../../../zustand/store";

const WishlistProductItem = (props: any) => {
  const router = useRouter();
  const [wishlistItems, setWishlistITems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const cartItems = useCartStore((state: any) => state.cartItems);
  const [quickViewStatus, setQuickViewStatus] = useState(false);
  const [openProductQuickView, setOpenProductQuickView] =
    useState<boolean>(false);
  const [selectedProductData, setSelectedProductData] = useState<Array<any>>(
    []
  );
  const setLoginPopup = useUserStore((state: any) => state.showLogin);
  useEffect(() => {
    getProduct(props?.id.id);
  }, []);

  function getProduct(id: any) {
    CatalogService.getInstance()
      .getProducDetail(id)
      .then((data: any) => {
        setWishlistITems(data.data.data.attributes);
        setLoading(false);
      })
      .catch((error) => {});
  }

  function getProductDetail(id: any) {
    CatalogService.getInstance()
      .getProducDetail(id)
      .then((response: any) => {
        if (response.data) {
          setSelectedProductData(response.data.data);
          setOpenProductQuickView(true);
          setQuickViewStatus(false);
        } else {
          console.log("ERROR:", response.data);
        }
      })
      .catch((error) => {});
  }

  function deleteWishList(entry_id: string, id: string) {
    Wishlist.getInstance()
      .deleteWishListItem(entry_id, id)
      .then((response: any) => {
        if (response.data) {
          props.getAllWishist();
        } else {
          console.log("ERROR:", response.data);
        }
      })
      .catch((error) => {});
  }

  function addToCart(entry_id: string, id: string) {
    const params = {
      data: {
        id: id,
        type: "cart_item",
        quantity: 1,
      },
    };
    Cart.getInstance()
      .addToCart(params)
      .then((info: any) => {
        deleteWishList(entry_id, id);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <>
      {!loading && (
        <div className="col-md-6 col-lg-3 mb-4 mb-md-0 mb-2 ">
          <div className="collection position-relative">
            <a href="#">
              <div className="imgsec mb-4">
                {wishlistItems.images && wishlistItems.images.length > 0 ? (
                  <a href={Permalink.ofProduct(props)}>
                    <img
                      src={wishlistItems.images[0]}
                      className="w-100"
                      style={{ height: 380, borderRadius: 20 }}
                    />
                  </a>
                ) : null}
              </div>
            </a>
            <div className="hoverBlock">
              <a href="#"></a>
              <div className="overlay   text-start">
                <a href="#">
                  <h4 className="fs-16 font-sb text-color-2">
                    {wishlistItems.name}
                  </h4>
                  <p className="fs-14 font-r text-color-1 py-2">
                    {wishlistItems.description}
                  </p>
                  <div className="product-rating mb-3 mt-0">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                  </div>
                  <p className="fs-20 font-sb text-color-5">
                    <i className="fas fa-indian-rupee-sign fa-fw" />{" "}
                    {wishlistItems?.discountPrice?.currencies.INR.amount}
                  </p>
                </a>
                <a className="btn btnbg fs-13 " tabIndex={0}>
                  Move to Cart
                </a>
                <div className="btnbarcart">
                  <a
                    className="btn fs-13 quick m-2"
                    tabIndex={0}
                    onClick={() => {
                      getProductDetail(props?.id.id);
                      setQuickViewStatus(true);
                    }}
                  >
                    Quick View
                  </a>
                  <a
                    className="btn fs-13 m-1"
                    tabIndex={0}
                    onClick={() => {
                      if (LocalStorageService.getAccessToken()) {
                        addToCart(props.id.entry_id, props.id.id);
                      } else {
                        setLoginPopup(true);
                      }
                    }}
                  >
                    Move to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!quickViewStatus && openProductQuickView && (
        <ProductQuickView
          openProductQuickView={openProductQuickView}
          setOpenProductQuickView={setOpenProductQuickView}
          data={selectedProductData}
          onSelectedProduct={(id: any) => {
            getProductDetail(id);
          }}
        />
      )}
      {quickViewStatus && (
        <ProductQuickViewLoader
          quickViewStatus={quickViewStatus}
          setQuickViewStatus={setQuickViewStatus}
        />
      )}
    </>
  );
};

export default WishlistProductItem;
