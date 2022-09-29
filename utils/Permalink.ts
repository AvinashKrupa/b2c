import React from "react";

export default class Permalink {

  static ofHomePage(): string {
    return "/"
  }

  static ofProduct(item: any): string {
    return "/product/" + (item?.attributes?.slug ? item?.attributes?.slug: item.slug) + "/" + (item.product_id ? item.product_id : item.id);
  }

  static ofCategory(item: any): string {
    return "/shop/" + item.slug + "/" + item.id+"?catalogues="+(item.title ?? item.name);
  }

  static ofBrand(item: any): string {
    return "/brand/" + item.slug + "/" + item.id;
  }

  static ofModel(item: any): string {
    return "/model/" + item.slug + "/" + item.id;
  }

  static ofWishlist(): string {
    return "/wishlist"
  }

  static ofCart(): string {
    return "/cart"
  }

  static ofMyProfile(): string {
    return "/myprofile"
  }

  static ofSaveAddress(): string {
    return "/saveaddress"
  }

  static ofPayment(): string {
    return "/payment"
  }

  static ofOrderHistory(): string {
    return "/orderhistory"
  }

  static ofCheckout(): string {
    return "/checkout"
  }

  static ofShop(): string {
    return "/shop";
  }

  static ofDummyProduct() {
    return "/product/dummy"
  }

}

