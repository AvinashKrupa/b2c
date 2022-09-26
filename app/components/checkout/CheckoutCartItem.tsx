import { TbCurrencyRupee } from "react-icons/tb";
import { Wishlist } from "../../../network/gateway/Wishlist";
import Permalink from "../../../utils/Permalink";

const CheckoutCartItem = (props: any) => {
  function getSize() {
    let data = props.meta?.variant.filter((info: any) => {
      return info.name == "Size";
    });

    if (data && data.length > 0) return data[0].options?.name;
  }
  function getColor() {
    let data = props.meta?.variant.filter((info: any) => {
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
      .then((info) => {

      }).then(() => {
        Wishlist.getInstance()
          .addToWishList(product_id)
          .then(() => {
            localStorage.removeItem("WISHLIST_ENTRY")
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
              Size: <span className="text-color-2">{getSize()}</span>
            </p>
            <p className="fs-14 font-sb text-color-1 ms-4">
              Colour: <span className="text-color-2">{getColor()}</span>
            </p>
            <div className="d-flex topBarAlign position-static ms-2">
              <div className="quantity d-flex px-2 ">
                <label className="fs-14 font-r text-color-1 pt-1">Qty</label>
                <select
                  className="form-select fs-14 font-r"
                  aria-label="Default select example"
                >
                  <option value={1}>{item.quantity}</option>
                </select>
              </div>
            </div>
          </div>
          <div className="d-flex pb-3">
            <p className="fs-14 font-sb text-color-1">
              Total: <span className="text-color-2">{item.value.amount}</span>
            </p>
          </div>
          <div className="d-flex mt-4 mb-4">
            <a className="fs-14 font-sb text-color-3" onClick={()=>{
              moveToWishlist(item.product_id,item.id)
            }}>
              Move to Wishlist
            </a>
            <a
              href="#"
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
              return ItemLoop(item);
            })}

          <ul>
            <li className="fs-14 font-r text-color-1 d-flex mb-3">
              Delivery Charges (express)
              <small className="text-color-2 text-end ms-auto">+ 100</small>
            </li>
            <li className="fs-14 font-r text-color-1 d-flex  mb-3">
              CGST + SGST ()
              <small className="text-color-2 text-end ms-auto"></small>
            </li>
            <li className="fs-14 font-r text-color-1 d-flex  mb-3">
              Discount
              <small className="text-end ms-auto  green"></small>
            </li>
          </ul>
          <hr />
          <ul>
            <li className="fs-19 font-sb text-color-2 d-flex mb-3">
              Grand Total:{" "}
              <span className="ms-2">
                <TbCurrencyRupee />
                {props.grandTotal}
              </span>
              <small className="text-color-2  text-end ms-auto"></small>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckoutCartItem;
