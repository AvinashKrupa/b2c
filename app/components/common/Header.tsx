import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import Permalink from "../../../utils/Permalink";
import useUserStore from "../../../zustand/store";
import CartButton from "../elements/cartButton";
import Logout from "../logout";
import CommonIconBar from "./CommonIconBar";

const Header = () => {
  const router = useRouter();
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
  useEffect(() => {}, [isLogin]);

  return (
    <>
      <Logout isShowing={isShowing} setIsShowing={setIsShowing} />

      <header className="main-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1 align-self-center">
              <a onClick={() => router.replace(Permalink.ofHomePage())}>
                <img
                  src="/images/logo-2.png"
                  alt="logo"
                  className="img-fluid desk-logo d-none d-md-block"
                />
              </a>
            </div>
            <div className="col-md-11">
              <nav className="navbar navbar-expand-lg p-0">
                <a className="navbar-brand d-md-none" href="/">
                  <img
                    src="/images/logo-2.png"
                    alt="logo"
                    className="img-fluid desk-logo"
                  />
                </a>
                <button
                  className="navbar-toggler active"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-expanded="false"
                  onClick={() => setOpenTap(!openTap)}
                >
                  <span className="navbar-toggler-icon" />
                  <span className="navbar-toggler-icon" />
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className={
                    "collapse navbar-collapse " + (openTap ? "show" : "")
                  }
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="#">
                        Sarees
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Lehangas
                      </a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="#">
                        Kurtis &amp; Tunics
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Kurta Sets
                      </a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="#">
                        Sharara Sets
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Fancy Ethnic
                      </a>
                    </li>
                  </ul>
                </div>
                <CommonIconBar />
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

{
  /* <ul className="iconBar text-center">
                  <li className="list-inline-item">
                    <a
                      className="reverse rounded-circle d-block"
                      href="#"
                      title=""
                    >
                      <img src="/images/refresh.png" alt="" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="wishlist rounded-circle d-block"
                      onClick={() => router.replace(Permalink.ofWishlist())}
                      title=""
                    >
                      <img src="/images/wishlist.png" alt="" />
                    </a>
                  </li>
                  <CartButton />
                  <li
                    className="list-inline-item"
                    onClick={() => {
                      setShowProfile(!showProfile);
                    }}
                  > */
}
{
  /* <a className="user rounded-circle d-block" href="#" title="">
                        <img
                          width={32}
                          height={32}
                          src="/images/user.png"
                          alt=""
                        />
                      </a> */
}

//     <div className="d-none d-lg-block d-sm-none d-md-none">
//       <a
//         className="user rounded-circle d-block user-img"

//         title={""}
//         onClick={() => {
//           if (isLogin) {
//             router.replace(Permalink.ofMyProfile());
//           } else {
//             useUserStore.setState({ loginPopup: true });
//           }
//         }}
//       >
//         <img
//           width={32}
//           height={32}
//           src="/images/user.png"
//           alt=""
//         />
//       </a>
//     </div>
//     <div className="btn-group d-sm-block d-md-block d-lg-none">
//       <a
//         className="user rounded-circle d-block"
//         role="button"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//       >
//         <img
//           width={32}
//           height={32}
//           src="/images/user.png"
//           alt=""
//         />
//       </a>
//       <ul
//         className={
//           "dropdown-menu shadow " + (showProfile ? "show" : "")
//         }
//         data-bs-popper="none"
//       >
//         <p className="fs-20 font-sb text-color-3 ps-3 ">Hey </p>
//         <li><hr className="dropdown-divider" /></li>
//         <li className="fs-14 font-r text-color-2"><img className="d-inline-block" src="images/p-profile.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => {
//           if (isLogin) {
//             router.replace(Permalink.ofMyProfile());
//           } else {
//             useUserStore.setState({ loginPopup: true });
//           }
//         }}>Profile</a></li>
//         <li className="fs-14 font-r text-color-2 "><img className="d-inline-block" src="images/seller.png" alt="" /><a className="dropdown-item d-inline-block" href="#">Your Seller Account</a></li>
//         <li className="fs-14 font-r text-color-2 "><img className="d-inline-block" src="images/order.png" alt="" /><a className="dropdown-item d-inline-block"  onClick={() => router.replace(Permalink.ofOrderHistory())}>Orders &amp; Returns</a></li>
//         <li><hr className="dropdown-divider" /></li>
//         <li className="fs-14 font-r text-color-2"><img className="d-inline-block" src="images/payment.png" alt="" /><a className="dropdown-item d-inline-block"  onClick={() => router.replace(Permalink.ofPayment())}>Saved Payment Methods</a></li>
//         <li className="fs-14 font-r text-color-2 "><img className="d-inline-block" src="images/map.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => router.replace(Permalink.ofSaveAddress())}>Saved Addresses</a></li>
//         <li><hr className="dropdown-divider" /></li>
//         <li className="fs-14 font-r text-color-2"><img className="d-inline-block" src="images/logout.png" alt="" /><a className="dropdown-item d-inline-block" onClick={() => {
//           signOut()
//         }}>Sign {isLogin ? 'Out' : 'In'}</a></li>
//       </ul>
//     </div>
//   </li>
// </ul>
