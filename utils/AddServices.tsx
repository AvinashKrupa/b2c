import React from "react";
import { Cart } from "../network/gateway/Cart";
import { Wishlist } from "../network/gateway/Wishlist";
import LocalStorageService from "./storage/LocalStorageService";


export default class AddServices {
    static ofAddToCart(id: any) {
         const params = {
            data: {
                id: id,
                type: "cart_item",
                quantity: 1,
            },
        };
        Cart.getInstance()
            .addToCart(params)
            .then((info: any) => {
                console.log("info", info);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    static ofAddToWishlist(id: any) {
        Wishlist.getInstance()
            .addToWishList(id)
            .then((info) => {
                console.log("info", info);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

}

