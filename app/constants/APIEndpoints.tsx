import React from "react";
import constants from "./constant";
const API = {
  LOGIN: "login",
  GET_CATEGORY: "get_all_nodes",
  GET_CATEGORY_TREE: "categories/tree",
  GET_BRANDS: "pcm_brands",
  GET_OCCASION: "pcm_occasion",
  GET_PRODUCT_LIST: "pcm_products",
  ADD_TO_CART: "add-to-cart",
  ADD_PRODUCT_WISHLIST: "flows/wishlist/entries/",
  CREATE_WISHLIST_ENTRY: "flows/wishlist/entries",
  CART_ASSOCIATION: "create_customer_cart_association",
  ADD_WISHLIST_WITH_CUSTOMER: "customers/",
  GET_CART: "get_customer_cart",
  GET_WISHLIST: "customers/",
  GET_PRODUCT_DETAIL: "pcm_product/",
  GET_PRODUCT_BY_NODE: "products_by_node/",
  DELETE_CART_ITEM: "carts/",
  DELETE_WISHLIST_ITEM: "/flows/wishlist/entries/",
  CHECKOUT: "checkout",
  ADD_ADDRESS: "createAddress",
  UPDATE_ADDRESS: "updateAddress",
  GET_CUSTOMER: "get-customer",
  GET_ALL_ADDRESS: "getAllAddresses",
  DELETE_ADDRESS: "deleteAddress",
  GET_BANNER: "banners/",
  APPLY_PROMOTION: "applyPromotion",
  GET_CUSTOMER_ORDER: "getCustomerOrder",
  ORDER: "order",
  ORDERS: "orders",
  GET_HOME_CONTENT: "getHomeContent/",
  GET_PRODUCTS_BUNDLE:"category/bundle/products",
  GET_ORDER_ITEMS:'orders/items',
  ORDER_TAKING_APP: {
    GET_SELLERS: "get-all-customers",
    PLACE_ORDER: "place-custom-order",
    UPDATE_ORDER: "update-custom-order/",
    GET_ORDERS: "get-custom-order",
    CALLBACK_URL: "callback-custom-order",
  },
  RUPIFI: {
    GET_ACCESS_TOKEN: constants.RUPIFI.BASE_URL_V1 + "merchants/auth/token",
    CHECK_CREDIT_ELIGIBILITY:
      constants.RUPIFI.BASE_URL_V1 + "customers/eligibility",
    CREATE_PAYMENT: constants.RUPIFI.BASE_URL_V2 + "payments",
    CAPTURE_AMOUNT: constants.RUPIFI.BASE_URL_V2 + "payments/capture",
    CHECK_PAYMENT_STATUS:
      constants.RUPIFI.BASE_URL_V1 + "payments/?merchantPaymentRefId=",
  },
  RUPIFI_UC: {
    CHECK_CREDIT_ELIGIBILITY:
      constants.PAYMENT_METHOD.RUPIFI.BASE_URL + "eligibility",
    CREATE_PAYMENT: constants.PAYMENT_METHOD.RUPIFI.BASE_URL + "createPayment",
    CAPTURE_AMOUNT: constants.PAYMENT_METHOD.RUPIFI.BASE_URL + "capturePayment",
    CHECK_PAYMENT_STATUS:
      constants.PAYMENT_METHOD.RUPIFI.BASE_URL +
      "checkPyamentStatus?merchantPaymentRefId=",
    CALLBACK_URL: constants.PAYMENT_METHOD.RUPIFI.BASE_URL + "callback",
    SUCCESS_PAYMENT: constants.PAYMENT_METHOD.RUPIFI.BASE_URL + "success",
    CANCEL_PAYMENT: constants.PAYMENT_METHOD.RUPIFI.BASE_URL + "cancel",
  },
  GET_FACET_ATTRIBUTES: 'typesense/collections/facetAttributes/',
  GET_PRODUCT_COLLECTIONS: 'typesense/collections/products/documents',
  DELETE_WISHLIST_ENTRY: 'flows/wishlist/entries/',
  GET_PROMOTIONS: 'promotions',
  GET_PROMOTION_CODE: 'promotions/',
};
export default API;
