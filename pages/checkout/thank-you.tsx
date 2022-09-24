import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { Cart } from "../../network/gateway/Cart";
import { RupifiUCService } from "../../network/gateway/RupifiUCService";
import LocalStorageService from "../../utils/storage/LocalStorageService";
import VisitNunchiBanner from "../../app/components/common/VisitNunchiBanner";
import { NextPage } from "next";

interface iProps { }
const ThankYou: NextPage = () => {
  const router = useRouter();
  const { merchantPaymentRefId } = router.query;
  const [authStatus, setAuthStatus] = useState<string>("");
  const [rupifiResponse, setRupifiResponse] = useState<any>({});
  const [startDate,] = useState(new Date());
  const [deliveryDate, setDeliveyDate] = useState(new Date());
  const [orderItems,setOrderItem]=useState([1,2])
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const query: any = router.query;
    setAuthStatus(query?.status);
    setRupifiResponse(query);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (authStatus == "AUTH_APPROVED") {
      updateOrder();
    }
    return () => { };
  }, [authStatus]);

  const updateOrder = async () => {
    let customer_id: any = LocalStorageService.getCustomerId();
    RupifiUCService.getInstance("")
      .successPayment({
        merchantCustomerRefId: customer_id,
        ...rupifiResponse
      })
      .then((response: any) => {
        if (response?.status == 200) {
          // do something
        } else {
          console.log("ERROR:", response?.data);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  function addDays(days: any) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return setDeliveyDate(result);
  }
  useEffect(() => {
    addDays(3);
    Cart.regenrateCustomerCartAssociation();
    return () => { };
  }, []);

  return (
    <div>
      <section className="thankYou text-center">
        <div className="row">
          <div className="col-md-12">
            <h1 className="fs-40 font-b text-color-2 list-inline-item">
              Thanks for shopping with us
            </h1>
            <p className="fs-20 font-m text-color-1 mt-3">
              Your order has been confirmed...!
            </p>
            <p className="fs-20 font-m text-color-1">Order ID: {merchantPaymentRefId}</p>
            <ul className="mt-3">
              <li className="list-inline-item fs-20 font-m text-color-1">
                Order date:{" "}
                <span className="text-color-2">
                  {startDate.getDate() +
                    ` ` +
                    months[startDate.getMonth()] +
                    ` ` +
                    startDate.getFullYear()}
                </span>
              </li>
              <li className="list-inline-item">|</li>
              <li className="estimate list-inline-item fs-20 font-m mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-airplane-fill me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
                </svg>
                Estimated delivery:{" "}
                {deliveryDate.getDate() +
                  ` ` +
                  months[deliveryDate.getMonth()] +
                  ` ` +
                  deliveryDate.getFullYear()}
              </li>
              {/* <li className="my-5">
                <img width={150} src="/images/thank-you.gif" alt="" />
              </li> */}
              {/* <li className="list-inline-item">
                <a href="/" className="btn fs-18 w-100" tabIndex={0}>
                  Track Order
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-geo-alt ms-3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </a>
              </li> */}
              {/* <li className="list-inline-item">
                <a
                  href="#"
                  className="btn fs-18 w-100 btn-default"
                  tabIndex={0}
                >
                  Invoice
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-file-earmark ms-3 "
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                  </svg>
                </a>
              </li> */}
            </ul>
            <a
                  href="/"
                  className=" fs-16 b-t-h btn bg-white border font-sb text-color-3 text-center w-30 mt-4"
                >
                  Back to Home Page{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    fill="currentColor"
                    className="bi bi-arrow-up-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
                    />
                  </svg>
                </a>
          </div>
        </div>
        <div className="row cartItem m-3">
          <div className="col-md-12 col-lg-8">
            <h4 className="fs-20 font-m text-color-1 text-start">
              Order summary
            </h4>
            <div className=" text-start">

            {orderItems?.length != 0 &&
       orderItems?.map((item: any, index: number) => {
              return ( <div className="bgbar position-relative mt-4 ms-0" key={index}>
              <div className="row">
                <div className="col-md-3 col-lg-3">
                  <div className="imgbar ">
                    <img className="w-100" src="/images/img1.png" alt="" />
                  </div>
                </div>
                <div className="col-md-9 position-relative">
                  <h3 className="fs-16 font-sb text-color-2">Anubhutee</h3>
                  <p className="fs-14 font-r text-color-1 pt-1 prodes">
                    Women Teal Blue &amp; Beige Ethnic Motifs Printed Straight
                    Kurti
                  </p>
                  <div className="d-flex pt-3">
                    <p className="fs-14 font-sb text-color-1">
                      Size: <span className="text-color-2">XL</span>
                    </p>
                    <p className="fs-14 font-sb text-color-1 ms-4">
                      Colour: <span className="text-color-2">Blue</span>
                    </p>
                    <p className="fs-14 font-sb text-color-1 ms-4">
                      Qty: <span className="text-color-2">3</span>
                    </p>
                  </div>
                  <div className="d-flex pt-2">
                    <p className="fs-14 font-sb text-color-1">
                      Size: <span className="text-color-2">XL</span>
                    </p>
                    <p className="fs-14 font-sb text-color-1 ms-4">
                      Colour: <span className="text-color-2">Blue</span>
                    </p>
                    <p className="fs-14 font-sb text-color-1 ms-4">
                      Qty: <span className="text-color-2">3</span>
                    </p>
                  </div>
                  <div className="d-flex topBarAlign">
                    <p className="fs-16 font-b text-color-3 align-self-center me-3">
                      ₹3,499
                    </p>
                  </div>
                </div>
              </div>
            </div>)
            })}


            </div>
            <hr className="my-4 my-md-5" />
            <div className="row text-start">
              <div className="col-md-6">
                <h3 className="fs-20 font-m text-color-2">Payment</h3>
                <p className="fs-20 font-r text-color-1 mt-4">
                  **** 4908 <img src="images/visa.png" alt="" />
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="fs-20 font-m text-color-2">Delivery</h3>
                <h5 className="fs-14 font-r text-color-1 mt-4 mb-2">Address</h5>
                <p className="fs-20 font-r text-color-10">
                  301, Adehwar Darshan, Ram Maruti Rd, Opp Metlife, Thane
                </p>
                <h5 className="fs-14 font-r text-color-1 mt-4 mb-2">
                  Delivery Method
                </h5>
                <p className="fs-20 font-r text-color-10">
                  Express Delivery (within 24 hrs)
                </p>
              </div>
            </div>
            <hr className="my-4 my-md-5" />
            <div className="row text-start ">
              <div className="col-md-6 helpBar">
                <h3 className="fs-20 font-m text-color-2">Need Help?</h3>
                <ul className="mt-4">
                  <li className="mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-question-circle"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                    </svg>
                    <a className="fs-20 font-r text-color-10" href="#">
                      Order Issues
                    </a>
                  </li>
                  <li className="mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-truck"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                    <a className="fs-20 font-r text-color-10" href="#">
                      Delivery Info
                    </a>
                  </li>
                  <li className="mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-arrow-return-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                      />
                    </svg>
                    <a className="fs-20 font-r text-color-10" href="#">
                      Returns
                    </a>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                    <a className="fs-20 font-r text-color-10" href="#">
                      Cancel Order
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h3 className="fs-20 font-m text-color-2">Billing Info</h3>
                <ul className="mt-4">
                  <li className="fs-20 font-r text-color-10 d-flex mb-1">
                    Subtotal
                    <small className="text-color-2 text-end ms-auto">
                      ₹15,297.00{" "}
                    </small>
                  </li>
                  <li className="fs-16 font-r text-color-10 d-flex mb-1">
                    Offer Applied
                    <small className="text-color-2 text-end ms-auto">
                      - ₹97.00{" "}
                    </small>
                  </li>
                  <li className="fs-16 font-r text-color-10 d-flex mb-1">
                    Delivery (Express)
                    <small className="text-color-2 text-end ms-auto">
                      + ₹100.00
                    </small>
                  </li>
                  <li className="fs-16 font-r text-color-10 d-flex mb-1">
                    GST (18%)
                    <small className="text-color-2 text-end ms-auto">
                      + ₹100.00{" "}
                    </small>
                  </li>
                  <hr style={{ borderTop: "dashed 1px #ccc" }} />
                  <li className="fs-20 font-r text-color-10 d-flex mb-1">
                    Total
                    <small className="text-color-2 text-end ms-auto">
                      ₹16,500.00
                    </small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="col-md-12 col-lg-4">
            <div className="row">
              <div className="col-md-12">
                <h4 className="fs-20 font-m text-color-1 text-start">
                  You Unlocked 5 Offers with this order
                </h4>
                <div className="position-relative">
                  <a href="#">
                    <img className="w-100" src="/images/card-1.png" alt="" />
                    <div className="carddata align-items-start d-flex flex-column h-100 justify-content-between w-100 ">
                      <div>
                        <h4 className="fs-24 font-sb text-white">Upto 20% off</h4>
                        <p className="fs-16 font-r text-color-8">on selected brands</p>
                      </div>
                      <div className="d-flex w-100">
                        <p className="fs-16 font-sb text-white ltr-space">NAVTATVA2022 <img src="/images/card-icon.png" alt="" /></p>
                        <p className="fs-12 font-r text-color-8 ms-auto">Valid till  <small className="fs-16 font-r text-white">30th July</small></p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="discountBG position-relative mt-3">
                  <a href="#">
                    <div className="imgbar"> <img className="w-100" src="/images/discountAd.png" alt="" /></div>
                    <div className="checkbar">
                      <p className="fs-16 font-r"><img className="me-2" src="/images/cart-shop.png" alt="" />Checkout Within the next 24 Hours </p>
                    </div>
                    <div className="mt-4">
                      <p className="fs-16 font-m text-color-1">Get upto </p>
                      <h5 className="fs-48 font-bk mt-2">₹1,500</h5>
                      <p className="fs-16 font-r text-color-1  mt-2">discount on your first order at </p>
                      <h4 className="fs-24 font-b text-color-2 mt-4"> <img className="me-2" src="/images/nunchi.png" alt="" />Nunchi Jewellery</h4>
                    </div>
                  </a>
                </div>
                <div className="position-relative mt-4">
                  <a href="#">
                    <img className="w-100" src="/images/card-2.png" alt="" />
                    <div className="carddata align-items-start d-flex flex-column h-100 justify-content-between w-100 ">
                      <div>
                        <h4 className="fs-24 font-sb text-white">Upto 20% off</h4>
                        <p className="fs-16 font-r text-color-8">on selected brands</p>
                      </div>
                      <div className="d-flex w-100">
                        <p className="fs-16 font-sb text-white ltr-space">NAVTATVA2022 <img src="/images/card-icon.png" alt="" /></p>
                        <p className="fs-12 font-r text-color-8 ms-auto ">Valid till  <small className="fs-16 font-r text-white">30th July</small></p>
                      </div>
                    </div>
                  </a>
                </div>
                <a
                  href="#"
                  className=" fs-16 btn t-btn font-sb text-color-3 text-center w-100 mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-patch-question"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                    <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                  </svg>
                  View 8 Other offers
                </a>

              </div>
            </div>
          </div> */}
        </div>
      </section>
      {/* <section className="mt-5">
        <a href="#">
          <img className="w-100" src="images/advertise.png" alt="" />
        </a>
      </section> */}
      <div className="m-3">
      <VisitNunchiBanner />
        </div>
    </div>
  );
}

export default withRouter(ThankYou);
