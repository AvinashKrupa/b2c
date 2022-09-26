import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Header from "../../app/themes/themeOne/components/Header";
import { Cart } from "../../network/gateway/Cart";
import LocalStorageService from "../../utils/storage/LocalStorageService";
import useUserStore from "../../zustand/store";
import shallow from "zustand/shallow";
import Toast from "../../utils/Toast";
import { Address } from "../../network/gateway/Address";
import AddressList from "../../app/components/common/AddressList";
import OfferCard from "../../app/components/checkout/OfferCard";
import CheckoutCartItem from "../../app/components/checkout/CheckoutCartItem";
import PromoCode from "../../app/components/checkout/PromoCode";
import EmptyCart from "../../app/components/checkout/EmptyCart";
import CheckoutStepA from "../../app/components/checkout/CheckoutStepA";
import CheckoutStepC from "../../app/components/checkout/CheckoutStepC";
import CheckoutStepB from "../../app/components/checkout/CheckoutStepB";
import Validators from "../../utils/Validator";
import { useRouter } from "next/router";
import Spinner from "../../app/hoc/Spinner";
import { Auth } from "../../network/gateway/Auth";
import ValidationMessage from "../../app/constants/validationMessage";
import Loader from "../../app/components/loader/loader";
import constants from "../../app/constants/constant";

const CheckoutScreen: NextPage = (props: any) => {
  const [openTab, setOpenTab] = useState<number>(1);
  // const { slug, id } = router.query;
  const router = useRouter();
  const [customerId, setCustomerId] = useState<string>("");
  const [customerData, setCustomerData] = useState<any>();
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<any>([]);
  const [addressFields, setAddressFields] = useState<any>({
    type: "address",
    county: "Sunnyville",
    country: "IN",
  });
  const [grandTotal, setGrandTotal] = useState("");
  const [allAddress, setAllAddress] = useState<any>([]);
  const isLogin = useUserStore((state: any) => state.isLogin, shallow);
  const setLoginPopup = useUserStore((state: any) => state.showLogin);

  useEffect(() => {
    let customer_id: any = LocalStorageService.getCustomerId();
    setCustomerId(customer_id);
    return () => {};
  }, []);

  useEffect(() => {
    if (isLogin) {
      getCustomerCart();
    } else {
      setLoginPopup(true);
    }
  }, [isLogin]);

  function getCustomerData() {
    Auth.getInstance()
      .getCustomerData()
      .then((data: any) => {
        //console.log("this is  customer data",data)
        setCustomerData(data?.data);
      });
  }

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  function getCustomerCart() {
    setLoading(true);
    Cart.getInstance()
      .getCustomerCart()
      .then((info: any) => {
        getAddress();
        setCartItems(info.data.data);
        setGrandTotal(info?.data.grandTotal);
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  function getAddress() {
    Address.getInstance()
      .getAllAddress()
      .then((data: any) => {
        setAllAddress(data?.data.data);
        setLoading(false);
        //console.log("this is all Address", data)
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  const handleChange = (e: any) => {
    console.log("e", e.target.name);
    addressFields[e.target.name] = e.target.value;
    setAddressFields(JSON.parse(JSON.stringify(addressFields)));

    //  addressFields[e.target.name] = e.target.value;
  };
  function validateForm() {
    let formIsValid = true;
    if (!addressFields["first_name"]) {
      formIsValid = false;
      Toast.showError("Please enter your First Name.");
    } else if (!addressFields["last_name"]) {
      formIsValid = false;
      Toast.showError("Please enter your Last Name.");
    } else if (!addressFields["line_1"]) {
      formIsValid = false;
      Toast.showError("Please enter your Address.");
    } else if (!addressFields["city"]) {
      formIsValid = false;
      Toast.showError("Please enter your City.");
    } else if (!addressFields["postcode"]) {
      formIsValid = false;
      Toast.showError("Please enter your Postal Code.");
    } else if (!Validators.isNumberOnly(addressFields["postcode"])) {
      formIsValid = false;
      Toast.showError("Please enter valid Postal Code.");
    }
    return formIsValid;
  }

  function removeCart(id: any, index: any) {
    Cart.getInstance()
      .deleteCartItem(id)
      .then((response: any) => {
        if (response.statusText === "OK") {
          Toast.showSuccess(ValidationMessage.removedFromCart);
          let newCartItem= cartItems;
          newCartItem.splice(index, 1);
          setCartItems([...newCartItem]);
        }
      });
  }

  function paymentMethod() {
    let validationFunction = validateForm();
    if (validationFunction) {
      setOpenTab(openTab == 3 ? 0 : 3);
    }
  }
  function test(data: any, all: any) {
    let addressStatus = true;
    Object.entries(all).map((item: any) => {
      if (
        item[1].first_name === data.first_name &&
        item[1].line_1 == data.line_1
      ) {
        return (addressStatus = false);
      }
    });
    return addressStatus;
  }
  function checkout(e: any) {
    e.preventDefault();

    const all = Object.assign({}, allAddress);
    const data = Object.assign({}, addressFields);
    let isDuplicateAddress = !test(data, all);
    if (isDuplicateAddress) {
      Toast.showError("*Address already exists.");
      return;
    }
    let validationFunction = validateForm();
    if (validationFunction) {
      if (!isDuplicateAddress) {
        addAddress();
      }
    }
  }

  function addAddress() {
    if (isLogin && validateForm()) {
      const param = {
        data: addressFields,
      };
      Address.getInstance()
        .addAddress(param)
        .then((data: any) => {
          setAllAddress([...allAddress, data.data.data]);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      setLoginPopup(true);
    }
  }
  function deleteAddress(id: any, index: any) {
    Address.getInstance()
      .deleteAddress(id)
      .then((response: any) => {
        if (response.statusText === "OK") {
          let newAllAddress = allAddress;
          newAllAddress.splice(index, 1);
          setAllAddress([...newAllAddress]);
          if (newAllAddress.length === 0) {
            setShowAddress(false);
          }
        }
      });
  }

  function checkoutApi(paymentType: string) {
    if (validateForm()) {
      const param = {
        data: {
          customer: {
            id: customerId,
          },
          billing_address: addressFields,
          shipping_address: addressFields,
        },
      };
      Cart.getInstance()
        .checkout(param, { grandTotal, paymentType })
        .then((response: any) => {
          console.log("checkout info", response.data);
          if(response.status){
            LocalStorageService.clearCartItem()
          }
          if (response.status && paymentType == constants.PAYMENT_TYPE.COD) {
            window.location.href = constants.PAYMENT_METHOD.RUPIFI.REDIRECT_CONFIRM_URL+`?merchantPaymentRefId=${response?.data?.data?.id}`;
          }
          if (response.status && paymentType == constants.PAYMENT_TYPE.RUPIFI) {
            window.location.href = response?.data?.data?.paymentUrl;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }

  return (
    <div className="shoppingCart checkoutPage full-window">
      <div className="wrapper">
        {/* Header */}
        <Header />
        {/* End Header */}
        <section className="cartItem  mt-4 mt-md-5">
          <h1 className="fs-40 font-b text-color-2 list-inline-item">
            Checkout
          </h1>
          <div className="row">
            <div className={`col-md-12 col-lg-8 mt-4`}>
              <div className="accordion" id="accordionExample">
                {cartItems?.length != 0 && (
                  <>
                    <CheckoutStepA
                      isLogin={isLogin}
                      setLoginPopup={setLoginPopup}
                      getCustomerData={getCustomerData}
                      customerData={customerData}
                    />
                    <CheckoutStepB
                      handleChange={handleChange}
                      onSave={checkout}
                      paymentMethod={paymentMethod}
                      addressFields={addressFields}
                      openTab={openTab}
                      setOpenTab={setOpenTab}
                      allAddress={allAddress}
                      setShowAddress={setShowAddress}
                      customerData={customerData}
                    />
                    <CheckoutStepC
                      customerId={customerId}
                      openTab={openTab}
                      setOpenTab={setOpenTab}
                      grandTotal={grandTotal}
                      onCheckout={checkoutApi}
                      customerData={customerData}
                    />
                    <AddressList
                      isVisible={showAddress}
                      data={allAddress}
                      onClose={() => {
                        setShowAddress(false);
                      }}
                      onSelect={(id:any) => {
                        setShowAddress(false);
                        setAddressFields(
                          JSON.parse(JSON.stringify(allAddress[id]))
                        );
                        setAddressFields(
                          JSON.parse(JSON.stringify(allAddress[id]))
                        );
                      }}
                      deleteAddress={deleteAddress}
                    />
                  </>
                )}
              </div>
            </div>
            {cartItems.length <= 0 && !loading && (
              <div className={`col-md-12 col-lg-12 mt-4`}>
                <div style={{ marginTop: "7%" }}>
                  <EmptyCart />
                </div>
              </div>
            )}
            {loading && (
              <div className={`col-md-12 col-lg-12 mt-4`}>
                <div style={{ marginTop: "7%" }}>
                  <Loader loading={loading} />
                </div>
              </div>
            )}

            {cartItems?.length != 0 && (
              <div className="col-md-12 col-lg-4">
                {/* <OfferCard /> */}
                <CheckoutCartItem
                  cartItems={cartItems}
                  removeCart={removeCart}
                  grandTotal={grandTotal}
                  getCustomerCart={getCustomerCart}
                  setCartItems={setCartItems}
                />
                {/* <PromoCode /> */}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutScreen;
