import React from "react";
import HtmlParser from "html-react-parser";
import { CatalogService } from "../network/gateway/Catalog";

export default class ProductObj {

    data: any;
    currency: string;
    selectCombination = {
        color: "",
        size: "",
        id: "",
    };
    constructor(item?: any, currency: string = 'INR') {
        this.data = item;
        this.currency = currency;
    }
    getId(): string {
        return this.data?.id;
    }
    getName(): string {
        return this.data?.attributes?.name;
    }
    getFeaturedImage(): string {
        return this.data?.attributes?.images?.length ? this.data?.attributes?.images[0] : "/images/no-image.png";
    }
    getPrice(): string {
        return (this.data?.attributes?.originalPrice?.currencies[this.currency]?.amount ?? 0).toLocaleString('en-IN')
    }
    getSalePrice(): string {
        return (this.data?.attributes?.discountPrice?.currencies[this.currency]?.amount ?? 0).toLocaleString('en-IN')
    }
    getOffAmount(): string {
        let price = this.data?.attributes?.originalPrice?.currencies[this.currency]?.amount ?? 0
        let salePrice = this.data?.attributes?.discountPrice?.currencies[this.currency]?.amount ?? 0
        return (price - salePrice).toLocaleString()
    }
    getOffPercent(): number {
        let price = this.data?.attributes?.originalPrice?.currencies[this.currency]?.amount ?? 0
        let salePrice = this.data?.attributes?.discountPrice?.currencies[this.currency]?.amount ?? 0
        return Math.floor((price - salePrice) / price * 100)
    }
    getStockLine(): any {
        return HtmlParser(`Hurry! Only <strong> ${this.data?.attributes?.stock} Items</strong> Left in Stock`)
    }
    getShortDescription(): any {
        return HtmlParser(this.data?.attributes?.description)
    }
    getDescription(): any {
        return HtmlParser(this.data?.attributes?.description)
    }
    getSizes(): any {
        let sizes = this.data?.meta.variations.filter((info: any) => {
            return info.name == "Size";
        });
        if (sizes.length > 0) {
            return sizes[0].options;
        } else {
            return [];
        }
    }
    getColors(): any {
        Object.keys(this.data?.meta.variation_matrix);
        let colors = this.data?.meta.variations.filter((info: any) => {
            return info.name == "Color";
        });

        if (colors.length > 0) {
            return colors[0].options;
        } else {
            return [];
        }
    }
    getQuantityList(): any {
        return [10, 20, 30, 40, 50, 100]
    }
    setSelectCombination(combinationData: any) {
        this.selectCombination = combinationData;
    }
    changeVariantByColor(id: string): any {
        let idObj = Object.keys(this.data?.meta.variation_matrix);

        for (let i = 0; i < idObj.length; i++) {
            //size            
            if (idObj[i] == this.selectCombination?.size) {
                let innerObj = this.data?.meta.variation_matrix[idObj[i]];
                let innerObjKeys = Object.keys(innerObj);
                for (let j = 0; j < innerObjKeys.length; j++) {
                    //color

                    if (innerObjKeys[j] === id) {
                        //color
                        this.setSelectCombination({
                            color: innerObjKeys[j],
                            size: idObj[i],
                            id: innerObj[innerObjKeys[j]],
                        })
                        //this.getProductDetail(innerObj[innerObjKeys[j]])
                    }
                }
            }
        }
    }
    changeVariantBySize(id: string) {
        let idObj = Object.keys(this.data.meta.variation_matrix);

        for (let i = 0; i < idObj.length; i++) {
            
            if (idObj[i] == id) {
                //size
                let innerObj = this.data.meta.variation_matrix[idObj[i]];
                let innerObjKeys = Object.keys(innerObj);
                //color
                this.setSelectCombination({
                    color: innerObjKeys[0],
                    size: idObj[i],
                    id: innerObj[innerObjKeys[0]],
                })
                //this.getProductDetail(innerObj[innerObjKeys[0]])
            }
        }
    }
    getProductDetail(id: any) {
        CatalogService.getInstance()
            .getProducDetail(id)
            .then((response: any) => {
                if (response.data) {
                    this.data = response.data.data;
                } else {
                    console.log("ERROR:", response.data);
                }
            })
            .catch((error) => { });
    }
}