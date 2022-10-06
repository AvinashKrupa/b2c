import React from "react";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";

const AddressList = (props: any) => {
  const router = useRouter();
  return (
    <Modal
      show={props.isVisible}
      animation={true}
      className="cart-popup"
      size={"xl"}
      id="exampleModal"
    >
      <div className="modal-content">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            props.onClose(false);
          }}
        />
        <div className="modal-body p-0">
          <div className="row m-0">
            <div className="col-12 col-md-7">
              <div className="cart-right-area">
                <h4 className="">Select Address</h4>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container cart-right-area ">
          <div className="row">
            <div className="col accordion-item bgbar ms-0">
              <label>Address</label>
            </div>
            <div className="col">Column</div>
            <div className="col">Column</div>
          </div>
        </div> */}

        <div className="col-md-12">
          <div
            className="osahan-account-page-right shadow-sm bg-white p-4 h-100"
            style={{ borderRadius: 30 }}
          >
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade  active show"
                id="addresses"
                role="tabpanel"
                aria-labelledby="addresses-tab"
              >
                <div className="row">
                  {props.data?.map((info: any, index: number) => {
                    return (
                      <div className="col-md-6">
                        <div className="bg-white card addresses-item shadow-sm mb-3">
                          <div className="gold-members p-4">
                            <div className="media">
                              <div className="mr-3">
                                <i className="icofont-location-pin icofont-3x"></i>
                                <div
                                  style={{
                                    textAlign: "end",
                                    fontSize: 25,
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    props?.deleteAddress(info.id, index);
                                  }}
                                >
                                  {" "}
                                  <AiFillDelete />{" "}
                                </div>
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">{info.first_name}</h6>

                                <h6 className="mb-1">{info.city}</h6>

                                <h6 className="mb-1">{info.postcode}</h6>
                                <h6 className="mb-1">{info.country}</h6>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <button
                              type="button"
                              className="btn btn-sm m-4 mt-md-0"
                              onClick={() => {
                                props.onSelect(index);
                              }}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressList;
