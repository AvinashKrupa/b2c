import React, { useState, useEffect } from "react";
import Header from "../../app/themes/themeOne/components/Header";
import { NextPage } from "next";
import { Wishlist } from "../../network/gateway/Wishlist";
import WishlistProductItem from "../../app/components/wishlist/WishlistProductItem";
import Loader from "../../app/components/loader/loader";
import useUserStore from "../../zustand/store";
import shallow from "zustand/shallow";
import WishlistLoader from "../../app/components/loader/WishlistLoader";
import LocalStorageService from "../../utils/storage/LocalStorageService";
import Permalink from "../../utils/Permalink";
import { useRouter } from "next/router";
import EmptyCart from "../../app/components/wishlist/EmptyCart";

const WishlistScreen: NextPage = () => {

    const route = useRouter();
    const isLogin = useUserStore((state: any) => state.isLogin, shallow);
    const setLoginPopup = useUserStore((state: any) => state.showLogin);
    const [loader, setLoader] = useState<Boolean>(true)
    const [wishlistProductIds, setWishlistProductIds] = useState([])

    useEffect(() => {
        if (isLogin) {
            getAllWishist();
        } else {
            setLoginPopup(true);
        }
       //deleteWishListEntry();
        return () => { };
    }, [isLogin]);

    function getAllWishist() {
        Wishlist.getInstance()
            .getWishlist()
            .then((newWishlist: any) => {
                setLoader(false)
                setWishlistProductIds(newWishlist)


            })
            .catch((error) => { });
    }

    function deleteWishListEntry() {
        let entries: any = [];
        entries.map((item: any) => {
            Wishlist.getInstance()
                .deleteWishListEntry(item.id)
                .then((data: any) => {
                    console.log("wishlist entry delted", data)
                })
                .catch((error) => console.log(error));
        })
        return true;
    }
   // console.log("this is all wishlists",wishlistProductIds)
    return (
        <div className="mycollection">
            <div className="wrapper">
                {/* Header */}
                <Header />
                {/* End Header */}
                {loader && <WishlistLoader />}
                {!loader && wishlistProductIds?.length == 0 && (
                    <EmptyCart />
                )}

                {
                    wishlistProductIds?.length > 0 &&
                    <section className="productBar mt-4 mt-md-5">
                        <ul className="breadcrumb">
                            <li className="fs-40 font-b text-color-2 list-inline-item"><a className="text-color-1" href="#">My Collections</a></li>
                            {/* <li className="fs-40 font-b text-color-2 list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg></li>
                            <li className="fs-40 font-b text-color-2 list-inline-item"><span className="text-color-3">Kurtis</span></li>
                            <li className="ms-auto align-self-end"><a type="button" className=" bundle-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                </svg>
                                Create Bundle
                            </a></li> */}
                        </ul>

                        <div className="mt-4 mt-lg-5 mb-5">
                            <div className="row">
                                {wishlistProductIds?.map((each: any, index: number) => {
                                    return (
                                        <WishlistProductItem key={index} id={each} wishlistProductIds={wishlistProductIds} getAllWishist={getAllWishist} />
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                }

            </div>
        </div>
    );

};

export default WishlistScreen;
