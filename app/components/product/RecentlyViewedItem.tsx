import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Permalink from "../../../utils/Permalink";
import ProductObj from "../../../utils/ProductObj";
import { CatalogService } from "../../../network/gateway/Catalog";
import Image from "next/image";
import { Wishlist } from "../../../network/gateway/Wishlist";
import LocalStorageService from "../../../utils/storage/LocalStorageService";
import { Cart } from "../../../network/gateway/Cart";


const RecentlyViewedItem = (props: any) => {
    const route = useRouter();
    const [product, setProduct] = useState<ProductObj>();

    useEffect(() => {
        if (props.id) {
            getProductDetail(props.id);
        }
        return () => { };
    }, [props.id])

    function getProductDetail(itemId: any) {
        if (itemId) {
            CatalogService.getInstance()
                .getProducDetail(itemId)
                .then((response: any) => {
                    if (response.data) {
                        setProduct(new ProductObj(response?.data?.data));
                    } else {
                        console.log("ERROR:", response.data);
                    }
                })
                .catch((error) => { });
        }
    }

    return (
        <div className="thumb position-relative text-center">
            <div className="bg1">
                <a onClick={() => route.replace(Permalink.ofProduct(document))}>
                    <Image
                        className="w-100"
                        src={product?.getFeaturedImage() ?? "/images/no-image.png"}
                        alt=""
                        width={312}
                        height={449}
                    />
                </a>
                <div className="hoverBlock">
                    <div className="overlay text-center">
                        <p className="fs-13 font-r text-color-1">
                            {product?.getDescription()}
                        </p>
                        <p className="fs-19 font-sb text-color-3 py-3">₹{product?.getSalePrice()}</p>
                        <a
                            onClick={() => route.replace(Permalink.ofProduct(product))}
                            className="btn-border fs-13 text-color-3"
                        >
                            More Info
                        </a>
                        <a className="btn fs-13"
                            onClick={() => {
                                if (Cart.isProductInCart(props.id)) {
                                  route.replace(Permalink.ofCart());
                                } else {
                                  if (LocalStorageService.getAccessToken()) {
                                    props.addToCart(props.id);
                                  } else {
                                    props.setLogin(true);
                                  }
                                }
                              }}
                        >
                            {
                                      props.cartItems?.includes(props.id) || false
                                        ? "Go To Cart"
                                        : "Add to Cart"
                                    }
                        </a>
                    </div>
                    <div className="speaker">
                        <a className="product-block p-image-block d-block mb-5" tabIndex={0}>
                            <button
                                onClick={() => {
                                    if (Wishlist.isWishlistProduct(props.id)) {
                                        props.deleteFromWishlist(props.id)
                                    } else {
                                        props.addToWishList(props.id)
                                    }
                                }}
                                type="button"
                                className={`btn-heart ${Wishlist.isWishlistProduct(props.id) ? "active" : ""
                                    }`}
                            >
                                <i
                                    className={`far fa-heart fa-fw`}
                                />
                            </button>
                        </a>
                        <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="/images/volume.png" />
                        </a>
                        <a href="#" className="d-block mb-5" tabIndex={0}>
                            <img src="/images/swap.png" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentlyViewedItem;