import Skeleton from "react-loading-skeleton"



const CartItemLoader = () => {

    return (  <div className="bgbar position-relative mt-4">
    <div className="row">
      {/* <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue={""}
          id="flexCheckDefault"
        />{" "}
      </div> */}
      <div className="col-md-3 col-lg-3">
        <Skeleton style={{ height: 160, width: 200, borderRadius: 20 }} />
      </div>
      <div className="col-md-9 position-relative">
        <h3 className="fs-16 font-sb text-color-2"><Skeleton width={80} height={20} /></h3>
        <p className="fs-14 font-r text-color-1 pt-1 prodes">
          <Skeleton width={180} height={15} />
        </p>
        <div className="d-flex py-3">
          <p className="fs-14 font-sb text-color-1">
          <Skeleton width={30} height={15} />
          </p>
          <p className="fs-14 font-sb text-color-1 ms-4">
        <Skeleton width={30} height={15} />
          </p>
        </div>
        <div className="d-flex mt-4">
          {" "}
          <a className="fs-14 font-sb text-color-3" href="#">
            <Skeleton width={80} height={15} />
          </a>{" "}
          <a
            className="fs-14 font-sb text-color-3 ms-4"

          >
            <Skeleton width={80} height={15} />
          </a>{" "}
        </div>
        <div className="d-flex topBarAlign">
          <p className="fs-16 font-sb text-color-2 align-self-center me-3">
            {/* ₹3,499 */}{" "}
            <Skeleton width={80} height={15} />
          </p>
          <div className="quantity d-flex px-2">


              <Skeleton width={80} height={15} />


          </div>
        </div>

      </div>
    </div>

  </div>

    )
}

export default CartItemLoader

