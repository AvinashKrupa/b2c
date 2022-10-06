import { useEffect, useState } from "react";
import { TbCurrencyRupee } from "react-icons/tb";
import { Cart } from "../../../network/gateway/Cart";
import { Wishlist } from "../../../network/gateway/Wishlist";
import Permalink from "../../../utils/Permalink";
import Toast from "../../../utils/Toast";

const CheckoutCartItem = (props: any) => {

  const [discount, setDiscount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  useEffect( () => {
    let discountValue: number = 0;
    let doCartTotal: number = 0;
    props?.cartItems?.map( (item: any) => {
      discountValue += parseInt(item?.meta?.display_price?.discount?.value?.amount);      
      doCartTotal += parseInt(item?.meta?.display_price?.without_discount?.value?.amount);      
    })
    setDiscount(discountValue*-1);
    setCartTotal(doCartTotal);
    return () => {}
  }, [props.cartItems]);

  function getSize(item: any) {
    let data = item?.meta?.variant?.filter((info: any) => {
      return info.name == "Size";
    });

    if (data && data.length > 0) return data[0].options?.name;
  }
  function getColor(item: any) {
    let data = item?.meta?.variant?.filter((info: any) => {
      return info.name == "Color";
    });
    if (data && data.length > 0) return data[0].options?.name;
  }

  const removeCartitem = (id: any) => {
    props.removeCart(id);
  };

  function moveToWishlist(product_id: string, id: string) {
    Wishlist.getInstance()
      .createWishlistEntry()
      .then((info) => {})
      .then(() => {
        Wishlist.getInstance()
          .addToWishList(product_id)
          .then(() => {
            localStorage.removeItem("WISHLIST_ENTRY");
            props.removeCart(id);
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function ItemLoop(item: any) {

    function handleChange(e: any, id: string) {
      e.preventDefault();

      if (e.target.valueAsNumber === 0 || e.target.valueAsNumber > 1000) {
        Toast.showError("Please enter quantity 1-1000*.");
      } else {
        const params = {
          data: {
            id: id,
            type: "custom_item",
            quantity: e.target.valueAsNumber,
          },
        };
        if (e.target.valueAsNumber > 0) {
          Cart.getInstance()
            .updateCartQuantity(id, params)
            .then((info: any) => {
              console.log("upade cart quantity", info);
              //props.getCustomerCart()
              props.setCartItems(info.data.data);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      }
    }

    return (
      <div className="row">
        <div className="col-md-3 col-lg-4">
          <div className="imgbar ">
            <a href={Permalink.ofProduct(item)}>
              <img className="w-100" src={item.image?.href} alt="" />
            </a>
          </div>
        </div>

        <div className="col-md-9 col-lg-8 position-relative">
          <a href={Permalink.ofProduct(item)}>
            <h3 className="fs-16 font-sb text-color-2">{item.name}</h3>
          </a>
          <p className="fs-14 font-r text-color-1 pt-1 prodes">
            {item.description}
          </p>
          <div className="d-flex py-3 align-items-center">
            <p className="fs-14 font-sb text-color-1">
              Size: <span className="text-color-2">{getSize(item)}</span>
            </p>
            <p className="fs-14 font-sb text-color-1 ms-4">
              Colour: <span className="text-color-2">{getColor(item)}</span>
            </p>
            <div className="d-flex topBarAlign position-static ms-2">
              <div className="quantity d-flex px-2 ">
                <label className="fs-14 font-r text-color-1 pt-1">Qty</label>
                {/* <label className="fs-14 font-r text-color-1 pt-1">Qty</label>
                <select
                  className="form-select fs-14 font-r"
                  aria-label="Default select example"
                >
                  <option value={1}>{item.quantity}</option>
                </select> */}
                <input
                  className="quantity"
                  type="number"
                  defaultValue={item.quantity}
                  min="1"
                  max="1000"
                  onChange={(e) => {
                    handleChange(e, item.id);
                  }}
                  style={{ width: 90 }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex pb-3">
            <p className="fs-14 font-sb text-color-1">
              Total: <span className="text-color-2">{item?.meta?.display_price?.without_discount?.value.amount}</span>
            </p>
          </div>
          <div className="d-flex mt-4 mb-4">
            <a
              className="fs-14 font-sb text-color-3"
              onClick={() => {
                moveToWishlist(item.product_id, item.id);
              }}
            >
              Move to Wishlist
            </a>
            <a
              className="fs-14 font-sb text-color-3 ms-4"
              onClick={() => {
                removeCartitem(item.id);
              }}
            >
              Remove
            </a>
          </div>
        </div>
        <hr />
      </div>
    );
  }


  return (
    <div>
      {props.cartItems?.length != 0 && (
        <div className="bgbar position-relative mt-4 ms-0 ">
          {props.cartItems?.length != 0 &&
            props.cartItems?.map((item: any, index: number) => {              
              return item?.type == "cart_item" ? ItemLoop(item): null;
            })}

          <ul>
            <li className="fs-14 font-r text-color-1 d-flex mb-3">
              Delivery Charges (express)
              <small className="text-color-2 text-end ms-auto">+ 00</small>
            </li>
            <li className="fs-14 font-r text-color-1 d-flex  mb-3">
              CGST + SGST (0%)
              <small className="text-color-2 text-end ms-auto">+ 00</small>
            </li>
            <li className="fs-14 font-r text-color-1 d-flex  mb-3">
              Discount
              <small className="text-end ms-auto  green">- {discount ?? "00"}</small>
            </li>
          </ul>
          <hr />
          <ul>
            <li className="fs-19 font-sb text-color-2 d-flex mb-3">
              Grand Total:{" "}
              <small className="text-color-2 text-end ms-auto">
                <TbCurrencyRupee />
                {(cartTotal-discount)}
              </small>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckoutCartItem;
