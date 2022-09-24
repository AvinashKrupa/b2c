import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import Permalink from "../../../../utils/Permalink";
import useUserStore from "../../../../zustand/store";
import CommonIconBar from "../../../components/common/CommonIconBar";
import SearchPopup from "../../../components/common/SearchPopup";
import CartButton from "../../../components/elements/cartButton";
import Logout from "../../../components/logout";
import Image from "next/image";
import LogoImg from "../../../../public/images/logo.png";

const Header = () => {
  const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const isLogin = useUserStore((state: any) => state.isLogin, shallow);
  const router = useRouter();
  const setLoginPopup = useUserStore((state: any) => state.showLogin);

  function signOut() {
    if (isLogin) {
      setIsShowing(true);
    } else {
      setLoginPopup(true);
    }
  }
  useEffect(() => { }, [isLogin]);

  return (
    <div className="align-self-center">
      <Logout isShowing={isShowing} setIsShowing={setIsShowing} />
      <header className="main-header header-main">
        <div className="row">
          <div className="col-3 col-lg-1 align-self-center">
            <a onClick={() => router.replace(Permalink.ofHomePage())}>
              <Image
                src={LogoImg}
                alt="logo"
                className="img-fluid desk-logo"
                width={88}
                height={48}
              />
            </a>
          </div>
          <div className="col-9 col-lg-11 d-flex align-items-center ">
            <a
              href="#"
              className="d-block d-md-none ms-auto m-search"
              data-bs-toggle="modal"
              data-bs-target="#searchPopup"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                >
                  <path
                    fillRule="evenodd"
                    d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
                  />
                </svg>
              </span>
            </a>
            <div
              className="header-search input-group ms-auto d-none d-md-block mt-2"
              data-bs-toggle="modal"
              data-bs-target="#searchPopup"
            >
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                >
                  <path
                    fillRule="evenodd"
                    d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="form-control fs-12"
                placeholder="Search"
                aria-label="Kurtis"
                aria-describedby="addon-wrapping"
                onClick={(event) => {
                  event.preventDefault();
                  setOpenSearchBox(true);
                }}
              />
              <button type="button" className="closebtn d-md-none">
                <i className="fas fa-xmark fa-fw" />
              </button>
            </div>
            <CommonIconBar />
          </div>
        </div>
      </header>
      {/* Search Popup */}
      <SearchPopup
        openSearchBox={openSearchBox}
        setOpenSearchBox={setOpenSearchBox}
      />
    </ div>
  );
};

export default Header;
