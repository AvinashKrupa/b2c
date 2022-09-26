import React, { useEffect, useState } from "react";
import { Cart } from "../../../network/gateway/Cart";
import LocalStorageService from "../../../utils/storage/LocalStorageService";
import useUserStore from "../../../zustand/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Permalink from "../../../utils/Permalink";
import useWishlistStore from "../../../zustand/wishlist";
import { Wishlist } from "../../../network/gateway/Wishlist";
import Toast from "../../../utils/Toast";

const CartItem = (props: any) => {
  const setLoginPopup = useUserStore((state: any) => state.showLogin);
  const [login, setLogin] = useState<boolean>(false);
  const wishItems = useWishlistStore((state: any) => state.wishlistItems);
  const [aaa,setAAA]=useState(props)

  function getColor() {
    console.log("props.meta", wishItems);
    let data = props.meta?.variant.filter((info: any) => {
      return info.name == "Color";
    });
    if (data && data.length > 0) return data[0].options?.name;
  }

  function getSize() {
    let data = props.meta?.variant.filter((info: any) => {
      return info.name == "Size";
    });

    if (data && data.length > 0) return data[0].options?.name;
  }

  const removeCartitem = () => {
    //props.removeCart(1, 0)
    props.removeCart(props?.id);
  };

  function moveToWishlist(product_id: string, id: string) {
    Wishlist.getInstance()
      .createWishlistEntry()
      .then((info) => {

      }).then(() => {
        Wishlist.getInstance()
          .addToWishList(product_id)
          .then(() => {
            localStorage.removeItem("WISHLIST_ENTRY")
            props.removeCart(props?.id);
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });

  }

  function handleChange(e:any,id:string){
    e.preventDefault();

    if( e.target.valueAsNumber ===0 || e.target.valueAsNumber >1000){
      Toast.showError("Please enter quantity 1-1000*.");
    }
    else{
      const params = {
        data: {
          id: id,
          type: "custom_item",
          quantity: e.target.valueAsNumber
        },
      };
      if(e.target.valueAsNumber >0){
      Cart.getInstance()
        .updateCartQuantity(id,params)
        .then((info: any) => {
          console.log("upade cart quantity", info);
          props.getCustomerCart()
        })
        .catch((error) => {
          console.log("error", error);
        });

      }
    }


  }


  return (
    <>
      <div className="bgbar position-relative mt-4">
        <div className="row">
          {/* <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue={""}
              id="flexCheckDefault"
            />
          </div> */}
          <div className="col-md-3 col-lg-3">
            <div className="imgbar ">
              <a href={Permalink.ofProduct(props)}>
                <img className="w-100" src={props.image?.href} alt="" />
              </a>
            </div>
          </div>
          <div className="col-md-9 position-relative">
            <a href={Permalink.ofProduct(props)}>
              <h3 className="fs-16 font-sb text-color-2">{props.name}</h3>
            </a>
            <p className="fs-14 font-r text-color-1 pt-1 prodes" style={{width:380}}>
              {props.description}
            </p>
            <div className="d-flex py-3">
              <p className="fs-14 font-sb text-color-1">
                Size: <span className="text-color-2">{getSize()}</span>
              </p>
              <p className="fs-14 font-sb text-color-1 ms-4">
                Colour: <span className="text-color-2">{getColor()}</span>
              </p>
            </div>
            <div className="d-flex mt-4">
              {!wishItems?.includes(props.product_id) && <a className="fs-14 font-sb text-color-3" onClick={() => {
                moveToWishlist(props.product_id, props.id)
              }}>
                Move to Wishlist
              </a>}
              <a
                href="#"
                className="fs-14 font-sb text-color-3 ms-4"
                onClick={() => {
                  removeCartitem();
                }}
              >
                Remove
              </a>
            </div>
            <div className="d-flex topBarAlign">
              <div className="fs-16 font-sb text-color-2 align-self-center me-3">
                <div className="product-price">
                  <p>
                    <span className="new-price mb-0 font-sb">
                      {/* <span>
                        ₹{props?.discountPrice?.currencies.INR.amount}{" "}
                      </span> */}
                        <span>
                        ₹{props?.value.amount}{" "}
                      </span>
                    </span>
                    {/* <span className="last-price mb-0 fs-12 font-r">
                      <span className="text-color-1">
                        ₹{props?.originalPrice?.currencies.INR.amount}
                      </span>
                    </span> */}
                  </p>

                  {/* <p className="save fs-10 font-r">
                    You save ₹
                    {props?.originalPrice?.currencies.INR.amount -
                      (props?.discountPrice?.currencies.INR.amount || 0)}
                  </p> */}
                </div>
              </div>
              <div className="quantity d-flex px-4" style={{ maxHeight: 30 }}>
                <label
                  style={{ marginRight: 4 }}
                  className="fs-14 font-r text-color-1 pt-1"
                >
                  Qty
                </label>
                {/* <select
                  style={{ width: 30, marginLeft: 4 }}
                  className="form-select fs-14 font-r"
                  aria-label="Default select example"
               onClick={(e:any)=>{
                console.log("this is called...!",e.target.value)
               }}

                >
                  <option value={1}>
                    <b>{props.quantity}</b>
                  </option>
                  <option value={2}>
                    <b>2</b>
                  </option>
                  <option value={3}>
                    <b>3</b>
                  </option>

                </select> */}
                <input className="quantity" type="number" defaultValue={props.quantity}  min="1" max="1000" onChange={(e)=>{handleChange(e,props.id)}}  style={{width:90}} />
              </div>
            </div>
            <div className="discount-offer text-white">
              <p className="fs-13 font-r">Recommended for Your Shopping Bag</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
