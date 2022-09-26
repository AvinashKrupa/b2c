import React from "react";

const CheckoutStepB = (props: any) => {
  return (
    <>
      <div className="accordion-item bgbar ms-0">
        <h2
          className="accordion-header"
          id="headingTwo"
          onClick={() => props.setOpenTab(props.openTab == 2 ? 0 : 2)}
        >
          <div className="row">
            <div className="col-md-6">
              <button
                className="accordion-button font-sb collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <span className="wordtype">B</span> SHIPPING ADDRESS
              </button>
            </div>
            {props.allAddress.length !== 0 && (
              <div className="col-md-6" style={{ alignItems: "flex-end" }}>
                <button
                  className="btn fs-14 float-end"
                  type="button"
                  style={{ marginTop: 8 }}
                  onClick={(event) => {
                    event.preventDefault();
                    props.setShowAddress(true);
                  }}
                >
                  Select Address
                </button>
              </div>
            )}
          </div>
        </h2>

        <div
          id="collapseTwo"
          className={
            "accordion-collapse collapse " + (props.openTab == 2 ? "show" : "")
          }
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <form>
              <div className="row mt-4 mt-md-0">
                <div className="col-sm-6 mb-4">
                  <label htmlFor="firstName" className="form-label">
                    First name*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="first_name"
                    placeholder=""
                    required
                    onChange={props.handleChange}
                    value={props.addressFields.first_name}
                  />

                  <div className="invalid-feedback"></div>
                </div>
                <div className="col-sm-6  mb-4">
                  <label htmlFor="lastName" className="form-label">
                    Last name*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    //value={""}
                    required
                    onChange={props.handleChange}
                    name="last_name"
                    value={props.addressFields.last_name}
                  />
                  <div className="invalid-feedback"></div>
                </div>
                <div className="col-12  mb-4">
                  <label htmlFor="address" className="form-label">
                    Address*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="#45, Avenue towers, scalpel road"
                    required
                    onChange={props.handleChange}
                    name="line_1"
                    value={props.addressFields.line_1}
                  />
                </div>
                <div className="col-12  mb-4">
                  <label htmlFor="address2" className="form-label">
                    Apartment, street, landmark*
                    <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="80 Feet road, behind hindu temple"
                    onChange={props.handleChange}
                    name="line_2"
                    required
                    value={props.addressFields.line_2}
                  />
                </div>
                <div className="col-sm-6  mb-4">
                  <label htmlFor="lastName" className="form-label">
                    City*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder=""
                    //value={""}
                    required
                    onChange={props.handleChange}
                    name="city"
                    value={props.addressFields.city}
                  />
                </div>
                <div className="col-md-3 ">
                  <label htmlFor="zip" className="form-label">
                    Postal code*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Postal Code"
                    placeholder=""
                    required
                    onChange={props.handleChange}
                    name="postcode"
                    value={props?.addressFields.postcode}
                  />
                </div>
              </div>
              {/* <div className="mt-4">
                <label htmlFor="zip" className="form-label">
                  Address type*
                </label>
                <div className="d-flex">
                  <div className="form-check mt-4">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      defaultChecked
                      required
                    />

                    <label
                      className="form-check-label ms-2 me-4"
                      htmlFor="credit"
                    >
                      Home (9am - 10pm)
                    </label>
                  </div>
                  <div className="form-check  mt-4">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      required
                    />
                    <label
                      className="form-check-label ms-2 me-4"
                      htmlFor="debit"
                    >
                      Office (9am - 5pm)
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="mt-4">
                <button
                  className="btn  btn-lg fs-16"
                  type="button"
                  onClick={props.onSave}
                  //disabled={true}
                  //type='submit'
                >
                  Save &amp; Deliver Here
                </button>

                <button
                  className="btn  btn-lg fs-16 m-2"
                  type="button"
                  onClick={props.paymentMethod}
                >
                  Next
                </button>
              </div>
              {/* <div className="seprtor">
                <span>or</span>
              </div> */}
              {/* <div className="mt-5">
                <div className="form-check  mt-4">
                  <input
                    id="delivery"
                    name="delivery"
                    type="radio"
                    className="form-check-input"
                  />
                  <label
                    className="form-check-label ms-2 me-4"
                    htmlFor="delivery"
                  >
                    In-store delivery
                  </label>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutStepB;
