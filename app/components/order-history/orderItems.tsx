const OrderItems = (props: any) => {
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

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function getDate(data: any) {
    let newDate = new Date(data);
    newDate.setDate(newDate.getDate() + 3);
    return (
      newDate.getDate() +
      " " +
      months[newDate.getMonth()] +
      " " +
      newDate.getFullYear()
    );
  }

  // function cancelOrder(id: any, index: number) {
  //     props.cancelOrder(id, index)

  // }

  return (
    <>
      <div className="bgbar position-relative mt-2 ms-0">
        <div className="row mb-3">
          <div className="col-md-12 col-lg-9">
            <div className="row mt-3">
              <div className="col-md-4 col-lg-3">
                <div className="imgbar">
                  <img
                    className="w-100"
                    src={props.attributes.mainImage}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-8 col-lg-8 position-relative">
                <h3 className="fs-16 font-sb text-color-2">{props.name}</h3>
                <p className="fs-14 font-r text-color-1 pt-1 prodes">
                  {props.attributes.description}
                </p>
                <div className="d-flex pt-3 pb-2">
                  <p className="fs-14 font-sb text-color-1">
                    Size: <span className="text-color-2">{getSize()}</span>
                  </p>
                  <p className="fs-14 font-sb text-color-1 ms-4">
                    Colour: <span className="text-color-2">{getColor()}</span>
                  </p>
                  <p className="fs-14 font-sb text-color-1 ms-4">
                    QTY: <span className="text-color-2">{props.quantity}</span>
                  </p>
                </div>
              </div>
              {/* <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                            {props.status === 'cancelled' ? <><a className="btn-can d-inline-block">
                                <svg style={{ marginRight: 5 }} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                </svg>
                                Cancelled
                            </a> </> : <> <a href="#" className="btn-gray d-inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-arrow-up-right me-2" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" />
                                </svg>
                                Arriving {getDate(props.meta.timestamps.created_at)}
                            </a></>}
                        </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItems;
