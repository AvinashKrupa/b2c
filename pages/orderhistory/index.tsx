import React from "react";
import type { NextPage } from "next";
import Header from "../../app/components/ProfileHeader";
import AccountSidebar from "../../app/components/account-sidebar/AccountSidebar";
import OrderHistoryItems from "../../app/components/order-history";

const OrderHistoryScreen: NextPage = () => {
  return (
    <div className="chooseyourapparel " style={{ background: "#FAFAFA" }}>
      <div className="wrapper" style={{ minHeight: 1440 }}>
        {/* Header */}
        <Header />
        {/* End Header */}
        <section className="myaccount-section mt-4 mt-lg-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-4 col-xl-3">
                <AccountSidebar />
              </div>
              <OrderHistoryItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderHistoryScreen;
