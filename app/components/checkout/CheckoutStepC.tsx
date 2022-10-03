import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TbCurrencyRupee } from "react-icons/tb";
import { Cart } from "../../../network/gateway/Cart";
import { RupifiUCService } from "../../../network/gateway/RupifiUCService";
import constants from "../../constants/constant";
import LocalStorageService from "../../../utils/storage/LocalStorageService";

const CheckoutStepC = (props: any) => {
  const [customerId, setCustomerId] = useState<string>("");
  const [paymentTab, setPaymentTab] = useState<number>(0);
  const [eligibleForRupifi, setEligibleForRupifi] = useState<boolean>(true);
  const [availCod] = useState<boolean>(true);
  const [availCreditCard] = useState<boolean>(true);
  const [availUpi] = useState<boolean>(false);
  const [eligibilityData, setEligibilityData] = useState<any>(null);

  useEffect( ()=> {
    let customer_id: any = LocalStorageService.getCustomerId();
    setCustomerId(customer_id);
    checkRupifiEligiblity();
    return () => {}
  },[])

  function checkRupifiEligiblity() {
    let requestJSON = {
      merchantCustomerRefId: constants.PAYMENT_METHOD.RUPIFI.TEST_ACCOUNT ?? props.customerData?.data?.id,
      phone: constants.PAYMENT_METHOD.RUPIFI.TEST_ACCOUNT ?? props.customerData?.data?.businessDetails?.whatsapp_number,
      updateGMV: false,
    };
    RupifiUCService.getInstance("")
      .checkRupifiCreditEligibility(requestJSON)
      .then((response: any) => {
        if (response?.data) {
          setEligibleForRupifi(response?.data?.data?.isEligibleForTxn);
          setEligibilityData(response?.data?.data);
        } else {
          console.log("ERROR:", response?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="accordion-item bgbar ms-0">
      <h2
        className="accordion-header"
        id="headingThree"
        onClick={() => props.setOpenTab(props.openTab == 3 ? 0 : 3)}
      >
        <button
          className="accordion-button font-sb collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          <span className="wordtype">C</span> PAYMENT METHOD
        </button>
      </h2>
      <div
        id="collapseThree"
        className={
          "accordion-collapse collapse " + (props.openTab == 3 ? "show" : "")
        }
        aria-labelledby="headingThree"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          {/**CREDIT CARD */}
          {availCreditCard && (
            <div className="my-3">
              <div data-toggle="collapse">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="form-check-input"
                  data-toggle="collapse"
                  data-target="#multiCollapseExample1"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                  required
                  onClick={() => setPaymentTab(paymentTab == 1 ? 0 : 1)}
                />
                <label
                  className="form-check-label fs-16 font-sb ms-2"
                  htmlFor="credit"
                >
                  Credit card
                </label>
              </div>
              <div
                className={
                  "collapse multi-collaps " + (paymentTab == 1 ? "show" : "")
                }
                id="multiCollapseExample1"
              >
                <label className="form-label mt-4">Saved Cards</label>
                <ul>
                  <li className="list-inline-item">
                    <a href="#">
                      <img
                        src="images/credit-1.png"
                        alt="logo"
                        className="img-fluid desk-logo"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <img
                        src="images/credit-2.png"
                        alt="logo"
                        className="img-fluid desk-logo"
                      />
                    </a>
                  </li>
                </ul>
                <hr />
                <div className="col-8">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="5665 2344 1223 9801"
                    required
                  />
                </div>
                <ul>
                  <li className="list-inline-item">
                    <div className="mt-4">
                      <label className="form-label">Valid Date</label>
                      <div className="quantity d-flex px-2">
                        <select
                          className="form-select fs-14 font-r text-color-2"
                          aria-label="Default select example"
                        >
                          <option value={1} selected>
                            01
                          </option>
                          <option value={2}>02</option>
                          <option value={3}>03</option>
                        </select>
                        <select
                          className="form-select fs-14 font-r text-color-2"
                          aria-label="Default select example"
                        >
                          <option value={1} selected>
                            28
                          </option>
                          <option value={2}>29</option>
                          <option value={3}>30</option>
                        </select>
                      </div>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div className=" mt-4 ms-0 ms-md-4">
                      <label htmlFor="zip" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control cvv"
                        placeholder=""
                        required
                      />
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <button
                      onClick={() => props.onCheckout(constants.PAYMENT_TYPE.CARD)}
                      className="btn btn-lg fs-16"
                      type="submit"
                    >
                      {/* Pay ₹16,994 */} Pay
                      <TbCurrencyRupee />
                      {props.grandTotal}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {/**CREDIT CARD END*/}

          {/**UPI*/}
          {availUpi && (
            <>
              <div className="mt-4 d-block d-md-flex">
                <div>
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                    data-toggle="collapse"
                    data-target="#multiCollapseExample2"
                    aria-expanded="false"
                    aria-controls="multiCollapseExample2"
                    onClick={() => setPaymentTab(paymentTab == 2 ? 0 : 2)}
                  />
                  <label
                    className="form-check-label fs-16 font-sb ms-2"
                    htmlFor="debit"
                  >
                    UPI
                  </label>
                </div>
                <div className="upi-amount">
                  <p className="d-block font-sb">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-info-circle me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    Offers not Valid on Guest Login
                  </p>
                </div>
              </div>
              <div
                className={
                  "collapse multi-collaps " + (paymentTab == 2 ? "show" : "")
                }
                id="multiCollapseExample2"
              >
                <div className="mt-4">
                  <ul>
                    <li className="list-inline-item col-md-8">
                      <label className="form-label">Enter UPI ID</label>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="5665 2344 1223 9801"
                        required
                        ata-toggle="collapse"
                        data-target="#multiCollapseExample3"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample3"
                        onClick={() => setPaymentTab(paymentTab == 3 ? 0 : 3)}
                      />
                    </li>
                    <li className="list-inline-item">
                      <button
                        onClick={() => props.onCheckout(constants.PAYMENT_TYPE.UPI)}
                        className="btn btn-lg fs-16 mt-3 mt-md-0"
                        type="submit"
                      >
                        {/* Pay ₹16,994 */}Pay
                        <TbCurrencyRupee />
                        {props.grandTotal}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {/**UPI END*/}

          {/**COD*/}
          {availCod && (
            <>
              <div className="mt-4 d-block d-md-flex">
                <div>
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                    onClick={() => setPaymentTab(paymentTab == 3 ? 0 : 3)}
                  />
                  <label
                    className="form-check-label fs-16 font-sb ms-2"
                    htmlFor="debit"
                  >
                    Cash On Delivery
                  </label>
                </div>
                <div className="upi-amount bgred">
                  <p className="d-block font-sb">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-info-circle me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    Extra ₹129 Convinience Fee
                  </p>
                </div>
              </div>
              <div
                className={
                  "collapse multi-collaps " +
                  (paymentTab == 3 ? "show" : "hide")
                }
                id="rupifiBody"
              >
                <div className="mt-4">
                  <ul>
                    <li className="list-inline-item col-md-8">
                      <label className="form-label"></label>
                    </li>
                    <li className="list-inline-item">
                      <button
                        onClick={() => props.onCheckout(constants.PAYMENT_TYPE.COD)}
                        className="btn btn-lg fs-16 mt-3 mt-md-0"
                        type="submit"
                      >
                        Place Order
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {/**COD END*/}

          {/** RUPIFI */}
          {eligibleForRupifi && (
            <>
              <div className="mt-4 d-block d-md-flex">
                <div>
                  <input
                    id="rupifi"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                    data-toggle="collapse"
                    data-target="#rupifiBody"
                    aria-expanded="false"
                    aria-controls="rupifiBody"
                    onClick={() => setPaymentTab(paymentTab == 4 ? 0 : 4)}
                  />
                  <label
                    className="form-check-label fs-16 font-sb ms-2"
                    htmlFor="debit"
                  >
                    RUPIFI (BNPL)
                  </label>
                </div>
              </div>
              <div
                className={
                  "collapse multi-collaps " + (paymentTab == 4 ? "show" : "")
                }
                id="rupifiBody"
              >
                <div className="mt-4">
                  <ul>
                    <li className="list-inline-item col-md-8">
                      <label className="form-label"></label>
                    </li>
                    <li className="list-inline-item">
                      <button
                        onClick={() => props.onCheckout(constants.PAYMENT_TYPE.RUPIFI)}
                        className="btn btn-lg fs-16 mt-3 mt-md-0"
                        type="submit"
                      >
                        {/* Pay ₹16,994 */}Pay
                        <TbCurrencyRupee />
                        {props.grandTotal}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {/** RUPIFI END*/}
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepC;
