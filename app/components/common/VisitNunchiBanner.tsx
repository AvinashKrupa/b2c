import React from "react";

const VisitNunchiBanner = () => {
  return (
    // <section className="mt-5">
    //     <a href="#"><img className="w-100" src="images/advertise.png" alt="" /></a>
    // </section>

    <section className="mt-5 jwellarySec mt-5 mb-5">
      <div className="row">
        <div className="col-xl-5 mb-4 mb-xl-0 align-self-center">
          <div className="leftBar text-center text-xl-start">
            <p className="fs-90 text-color-2 font-b">Pair It up </p>
            <p className="fs-34 text-color-1 ps-xl-5">with some</p>
            <p className="fs-134 text-color-1 color-text font-b">Jewellery</p>
            <a href="#" className="btn w-100 fs-20 mt-4">
              <span className="text-white me-2" style={{ fontStyle: "normal" }}>
                Visit
              </span>
              <img src="images/Black.svg" alt="" /> Nunchi Jewellery
            </a>
          </div>
        </div>
        <div className="col-xl-7">
          <div className="row">
            <div className="col-md-4 overhead position-relative mb-4 mb-md-0">
              <img
                className="w-100 d-none d-md-block"
                src="/images/jwelary-1.jpg"
                alt=""
              />
              <img
                className="w-100  d-block d-md-none"
                src="/images/jwelary-1-m.jpg"
                alt=""
              />
              <h4 className="fs-14 text-color-2 font-m ">
                Bangles
                <span className="font-r d-block">Starting from ₹1299</span>
              </h4>
            </div>
            <div className="col-md-4 overhead ">
              <div className="row">
                <div className="col-md-12 h-100  position-relative  mb-4 mb-md-0">
                  <img className="w-100" src="/images/jwelary-2.jpg" alt="" />
                  <h4 className="fs-14 text-color-2 font-m ">
                    Ear Rings
                    <span className="font-r d-block">Starting from ₹1299</span>
                  </h4>
                </div>
                <div className="col-md-12 h-100 align-item-end justify-content-end position-relative mt-3">
                  <img className="w-100" src="/images/jwelary-2.jpg" alt="" />
                  <h4 className="fs-14 text-color-2 font-m ">
                    Ear Rings
                    <span className="font-r d-block">Starting from ₹1299</span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 overhead position-relative  mt-4 mt-md-0">
              <img
                className="w-100 d-none d-md-block"
                src="/images/jwelary-3.jpg"
                alt=""
              />
              <img
                className="w-100  d-block d-md-none"
                src="/images/jwelary-3-m.jpg"
                alt=""
              />
              <h4 className="fs-14 text-color-2 font-m ">
                Ear Rings
                <span className="font-r d-block">Starting from ₹1299</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitNunchiBanner;
