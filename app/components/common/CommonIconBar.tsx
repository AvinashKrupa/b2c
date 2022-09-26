import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Permalink from "../../../utils/Permalink";
import CartButton from "../elements/cartButton";
import useUserStore from "../../../zustand/store";
import shallow from "zustand/shallow";
import Logout from "../logout";
import WishlistButton from "../elements/wishlistButton";
import { AvatarGenerator } from 'random-avatar-generator';

const CommonIconBar = () => {
    const router = useRouter(); 

    const [avatar, setAvatar] = useState<string>("");
    const [openTap, setOpenTap] = useState<boolean>(true);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const isLogin = useUserStore((state: any) => state.isLogin, shallow);
    const setLoginPopup = useUserStore((state: any) => state.showLogin);

    function signOut() {
        if (isLogin) {
            setIsShowing(true);
        } else {
            setLoginPopup(true);
        }
    }
    useEffect(() => {
        let oldAvatar = localStorage.getItem("avatar");
        if(oldAvatar){
            setAvatar(oldAvatar);
        }else{
            const generator = new AvatarGenerator();
            let newAvatar = generator.generateRandomAvatar();
            setAvatar(newAvatar);
            localStorage.setItem("avatar",newAvatar);
        }
        return () => {}
     }, []);

    return (
        <>
            <Logout isShowing={isShowing} setIsShowing={setIsShowing} />

            <ul className="iconBar text-center">
               {/*  <li className="list-inline-item">
                    <a
                        className="reverse rounded-circle d-block"
                        href="#"
                        title=""
                    >
                        <img src="/images/refresh.png" alt="" />
                    </a>
                </li> */}
                {/* <li className="list-inline-item">
                    <a
                        className="wishlist rounded-circle d-block"

                        onClick={() => {
                            if (isLogin) {
                                router.replace(Permalink.ofWishlist())
                            } else {
                                useUserStore.setState({ loginPopup: true });
                            }
                        }}
                        title=""
                    >
                        <img src="/images/wishlist.png" alt="" />
                    </a>
                </li> */} <WishlistButton />
                <CartButton />
                <li
                    className="list-inline-item"
                    onClick={() => {
                        setShowProfile(!showProfile);
                    }}
                >
                    {/* <a className="user rounded-circle d-block" href="#" title="">
                        <img
                          width={32}
                          height={32}
                          src="/images/user.png"
                          alt=""
                        />
                      </a> */}

                    <div className="d-none d-lg-block d-sm-none d-md-none">
                        <a
                            className="user rounded-circle d-block user-img"

                            title={""}
                            onClick={() => {
                                if (isLogin) {
                                    router.replace(Permalink.ofMyProfile());
                                } else {
                                    useUserStore.setState({ loginPopup: true });
                                }
                            }}
                        >
                            
                            <img
                                width={32}
                                height={32}
                                src={avatar}
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="btn-group d-sm-block d-md-block d-lg-none">
                        <a
                            className="user rounded-circle d-block"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                width={32}
                                height={32}
                                src="/images/user.png"
                                alt=""
                            />
                        </a>
                        <ul
                            className={
                                "dropdown-menu shadow " + (showProfile ? "show" : "")
                            }
                            data-bs-popper="none"
                        >
                            <p className="fs-20 font-sb text-color-3 ps-3 ">Hey </p>
                            <li><hr className="dropdown-divider" /></li>
                            <li className="fs-14 font-r text-color-2"><img className="d-inline-block" src="/images/p-profile.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => {
                                if (isLogin) {
                                    router.replace(Permalink.ofMyProfile());
                                } else {
                                    useUserStore.setState({ loginPopup: true });
                                }
                            }}>Profile</a></li>
                            <li className="fs-14 font-r text-color-2 "><img className="d-inline-block" src="/images/seller.png" alt="" /><a className="dropdown-item d-inline-block" href="#">Your Seller Account</a></li>
                            <li className="fs-14 font-r text-color-2 "><img className="d-inline-block" src="/images/order.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => router.replace(Permalink.ofOrderHistory())}>Orders &amp; Returns</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li className="fs-14 font-r text-color-2"><img className="d-inline-block" src="/images/payment.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => router.replace(Permalink.ofPayment())}>Saved Payment Methods</a></li>
                            <li className="fs-14 font-r text-color-2 "><img className="d-inline-block" src="/images/map.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => router.replace(Permalink.ofSaveAddress())}>Saved Addresses</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li className="fs-14 font-r text-color-2"><img className="d-inline-block" src="/images/logout.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => {
                                signOut()
                            }}>Sign {isLogin ? 'Out' : 'In'}</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default CommonIconBar;