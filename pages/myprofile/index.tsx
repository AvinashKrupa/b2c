import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Header from "../../app/components/ProfileHeader";
import AccountSidebar from "../../app/components/account-sidebar/AccountSidebar";
import useUserStore from "../../zustand/store";
import shallow from "zustand/shallow";
import { Auth } from "../../network/gateway/Auth";
import Loader from "../../app/components/loader/loader";
import { useRouter } from "next/router";

const OrderHistoryScreen: NextPage = () => {
  const isLogin = useUserStore((state: any) => state.isLogin, shallow);
  const setLoginPopup = useUserStore((state: any) => state.showLogin);
  const [customerData, setCustomerData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (isLogin) {
      getCustomerData();
    } else {
      router.replace("/");
    }
  }, [isLogin]);

  function getCustomerData() {
    Auth.getInstance()
      .getCustomerData()
      .then((data: any) => {
        setLoading(false);
        setCustomerData(data?.data);
      });
  }

  return (
    <div className="chooseyourapparel " style={{ background: "#FAFAFA" }}>
      <div className="wrapper" style={{ height: 1440}}>
        {/* Header */}
        <Header />
        {/* End Header */}

        <section className="myaccount-section mt-4 mt-lg-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-4 col-xl-3">
                <AccountSidebar />
              </div>

              <div className="col-12 col-lg-8 col-xl-9 mb-5">
                <div className="rightside-bar-area">
                  {loading && <Loader />}
                  {!loading && (
                    <>
                      <h3 className="username">
                        Welcome back,{" "}
                        <b className="text-primary">
                          {" "}
                          {customerData?.data.userDetails.name}
                        </b>
                      </h3>
                      {/* <div className="varification-box text-white">
                        <h5 className="mb-2">Pending e-mail Verification</h5>
                        <p>
                          Complete e-mail verification within the next 24 hours
                          to finish setting up your account.{" "}
                        </p>
                        <a href="#" className="btn fs-16 btn-sm btn-white mt-4">
                          Complete Verification
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_3166_4152)">
                              <path
                                d="M14.9986 5.00146L5 15"
                                stroke="#300056"
                                strokeWidth="1.67956"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6 5.00146H14.9987V14.0002"
                                stroke="#300056"
                                strokeWidth="1.67956"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>
                        </a>
                      </div> */}
                      <br/>
                      <br/>
                      <br/>
                      <form className="user-form">
                        <div className="row">
                          <div className="col-12 col-lg-10 col-xl-7">
                            <div className="row">
                              <div className="col-12 col-sm-4">
                                <div className="form-group">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" "
                                    value={customerData?.data.userDetails.name}
                                  />
                                </div>
                              </div>
                              {/* <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>Password</label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="**********"
                                  />
                                </div>
                              </div> */}
                              <div className="col-12 col-sm-4">
                                <div className="form-group">
                                  <label>E-mail</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder=""
                                    value={customerData?.data.userDetails.email}
                                  />
                                </div>
                              </div>
                              {/* <div className="col-12 col-sm-6">
                                <div className="form-group">
                                  <label>Two Factor Authentication</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enabled"
                                  />
                                </div>
                              </div> */}
                              <div className="col-12 col-sm-4">
                                <div className="form-group">
                                  <label>Mobile Number</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    value={
                                      "+" +
                                      91 +
                                      " " +
                                      customerData?.data?.businessDetails
                                        ?.whatsapp_number
                                    }
                                  />
                                </div>
                              </div>
                              {/* <div className="col-12 col-sm-12 mb-5">
                                                        <button type="submit" className="btn fs-16 btn-sm btn-white mt-sm-4">
                                                            Edit Details
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                                <g clipPath="url(#clip0_3166_4152)">
                                                                    <path d="M14.9986 5.00146L5 15" stroke="#300056" strokeWidth="1.67956" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M6 5.00146H14.9987V14.0002" stroke="#300056" strokeWidth="1.67956" strokeLinecap="round" strokeLinejoin="round" />
                                                                </g>
                                                            </svg>
                                                        </button>
                                                    </div> */}
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default OrderHistoryScreen;
