import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { Cart } from "../../network/gateway/Cart";
import { RupifiUCService } from "../../network/gateway/RupifiUCService";
import LocalStorageService from "../../utils/storage/LocalStorageService";
import VisitNunchiBanner from "../../app/components/common/VisitNunchiBanner";
import { NextPage } from "next";
import { CustomerOrderService } from "../../network/gateway/CustomerOrderService";
import useUserStore from "../../zustand/store";
import shallow from "zustand/shallow";
import OrderItems from "../../app/components/checkout/OrderItems";
import Loader from "../../app/components/loader/loader";
//import OrderInvoice from "../../app/components/invoice/OrderInvoice";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  BlobProvider,
} from "@react-pdf/renderer";
import Permalink from "../../utils/Permalink";
import InvoiceModal from "../../app/components/invoice/InvoiceModel";
//import ReactToPdf from "react-to-pdf";

interface iProps {}

const ThankYou: NextPage = () => {
  const options = {
    orientation: "landscape",
  };
  const ref = React.createRef();
  const router = useRouter();
  const { merchantPaymentRefId } = router.query;
  const [authStatus, setAuthStatus] = useState<string>("");
  const [rupifiResponse, setRupifiResponse] = useState<any>({});
  const [startDate] = useState(new Date());
  const [deliveryDate, setDeliveyDate] = useState(new Date());
  const [orderItems, setOrderItem] = useState<any>([]);
  const isLogin = useUserStore((state: any) => state.isLogin, shallow);
  const setLoginPopup = useUserStore((state: any) => state.showLogin);
  const [productIds, setProductIds] = useState([]);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [invoiceStatus, setInvoiceStatus] = useState<boolean>(false);

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
    return () => {};
  }, [authStatus]);

  const updateOrder = async () => {
    let customer_id: any = LocalStorageService.getCustomerId();
    RupifiUCService.getInstance("")
      .successPayment({
        merchantCustomerRefId: customer_id,
        ...rupifiResponse,
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
    return () => {};
  }, []);

  useEffect(() => {
    if (merchantPaymentRefId) {
      // getOrdersItems(merchantPaymentRefId);
      // getOrdersDetails(merchantPaymentRefId);
      fetchDataFromServer(merchantPaymentRefId);
    }
    return () => {};
  }, [merchantPaymentRefId]);

  async function fetchDataFromServer(id: any) {
    await getOrdersDetails(id);
    await getOrdersItems(id);
  }

  function getOrdersItems(id: any) {
    return new Promise((resolve, reject) => {
      CustomerOrderService.getInstance()
        .getOrderItems(id)
        .then((data: any) => {
          setOrderItem(data.data.data);
          setProductIds(productIds);
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function getOrdersDetails(id: any) {
    return new Promise((resolve, reject) => {
      CustomerOrderService.getInstance()
        .getOrderDetails(id)
        .then((data: any) => {
          setOrderDetails(data?.data?.data);
          console.log("this is data order details", data.data.data.id);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function cancelOrder(id: string) {
    const param = {
      status: "cancelled",
    };
    CustomerOrderService.getInstance()
      .cancelOrder(id, param)
      .then((data: any) => {})
      .catch((error) => {});
  }

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
            <p className="fs-20 font-m text-color-1">
              Order ID: {merchantPaymentRefId}
            </p>
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
              <br />
              <li className="list-inline-item">
                {/* <a href="/" className="btn fs-18 w-100" tabIndex={0}>
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
                </a> */}
                <a
                  onClick={() => {
                    router.replace(Permalink.ofHomePage());
                  }}
                  className=" fs-16 b-t-h btn  border font-sb  text-center w-30 mt-4"
                  style={{ color: "white" }}
                >
                  Back to home page{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
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
              </li>
              <li className="list-inline-item">
                <a
                  onClick={() => {
                    setInvoiceStatus(true);
                  }}
                  className="btn fs-18 w-100 btn-default mt-4"
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
              </li>
            </ul>

            <div>
              {/* <ReactToPdf targetRef={ref} filename="code-example.pdf" options={options}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </ReactToPdf>
      <div ref={ref}>
          <OrderInvoice/>
        </div> */}

              {/* <PDFDownloadLink document={<OrderInvoice />} fileName="invoice.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink> */}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="mt-5">
            <Loader loading={loading} />{" "}
          </div>
        ) : (
          <OrderItems
            orderItems={orderItems}
            authStatus={authStatus}
            orderDetails={orderDetails}
            cancelOrder={cancelOrder}
          />
        )}
        <InvoiceModal
          invoiceStatus={invoiceStatus}
          setInvoiceStatus={setInvoiceStatus}
          orderDetails={orderDetails}
          orderItems={orderItems}
        />
      </section>
      {/* <OrderInvoice /> */}
      {/* <section className="mt-5">
        <a href="#">
          <img className="w-100" src="images/advertise.png" alt="" />
        </a>
      </section> */}

      {/* <VisitNunchiBanner /> */}
    </div>
  );
};

export default withRouter(ThankYou);
