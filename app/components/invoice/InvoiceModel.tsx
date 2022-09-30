import React from "react";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import Pdf from "react-to-pdf";
const options = {
  orientation: "landscape",
};

const InvoiceModal = (props: any) => {
  const router = useRouter();
  const ref: any = React.createRef();
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
    return (
      months[newDate.getMonth()] +
      " " +
      newDate.getDate() +
      "," +
      newDate.getFullYear()
    );
  }

  function getSize(item: any) {
    let data = item.meta?.variant?.filter((info: any) => {
      return info.name == "Size";
    });
    if (data && data.length > 0) return data[0].options?.name;
  }

  function getColor(item: any) {
    let data = item.meta?.variant?.filter((info: any) => {
      return info.name == "Color";
    });
    if (data && data.length > 0) return data[0].options?.name;
  }

  return (
    <Modal
      show={props.invoiceStatus}
      animation={true}
      className="cart-popup"
      size={"xl"}
      id="invoice"
    >
      <div className="modal-content">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          onClick={() => {
            props.setInvoiceStatus(false);
          }}
        ></button>
        <div className="accordion-item bgbar">
          <div className="mb-4"></div>
          <div ref={ref}>
            <table
              width={600}
              style={{ margin: "auto", borderSpacing: "none" }}
              cellPadding={0}
              cellSpacing={0}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "20px",
                    }}
                  >
                    <strong>Bill From:</strong>
                    <br />
                    NavTatva Hardware Store
                    <br />
                    150 Elgin Street
                    <br /> Ottawa, ON, K2P 1L4
                    <br />
                    Canada
                    <br />
                    Poshardware@navtatva.com.{" "}
                  </td>
                  <td style={{ float: "right" }}>
                    <img src="/images/logo.png" alt="" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ height: "25px" }} />
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ height: "1px", background: "#ccc" }}
                  />
                </tr>
                <tr>
                  <td colSpan={2} style={{ height: "25px" }} />
                </tr>
                <tr></tr>
                <tr>
                  <td
                    style={{
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "20px",
                    }}
                  >
                    <strong>Bill To:</strong>
                    <br />
                    {props?.orderDetails?.billing_address?.line_1}
                    <br />
                    {props?.orderDetails?.billing_address?.line_2}
                    <br /> {props?.orderDetails?.billing_address?.city}
                    <br />
                    {props?.orderDetails?.billing_address?.postcode}
                    <br />
                    {props?.orderDetails?.customer?.email}
                  </td>
                  <td
                    style={{
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "20px",
                    }}
                    valign="top"
                  >
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ float: "right" }}
                      width={220}
                    >
                      <tbody>
                        <tr>
                          <td style={{ padding: "3px", width: "100px" }}>
                            <strong>Invoice id:</strong>
                          </td>
                          <td style={{ padding: "3px" }}>
                            {props?.orderDetails?.id}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "3px" }}>
                            <strong>Invoice Date</strong>
                          </td>
                          <td style={{ padding: "3px" }}>
                            {getDate(
                              props?.orderDetails?.meta.timestamps.created_at
                            )}
                          </td>
                        </tr>
                        <tr
                          style={{
                            background: "#ccc",
                            border: "none",
                            padding: "5px",
                          }}
                        >
                          <td style={{ padding: "5px" }}>
                            <strong>Amount Due</strong>
                          </td>
                          <td style={{ padding: "5px" }}>
                            {" "}
                            ₹
                            {
                              props?.orderDetails?.meta.display_price?.with_tax
                                .amount
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ height: "25px" }} />
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "20px",
                      textAlign: "left",
                    }}
                  >
                    <table width={600} cellPadding={0} cellSpacing={0}>
                      <tbody>
                        <tr style={{ backgroundColor: "#ccc", padding: "5px" }}>
                          <th style={{ padding: "5px" }}>Item</th>
                          <th style={{ padding: "5px" }}>Description</th>
                          <th style={{ padding: "5px" }}>Quantity</th>
                          <th style={{ padding: "5px" }}>Unit Cost</th>
                          <th style={{ padding: "5px" }}>Line Total</th>
                        </tr>
                        {/* <tr style={{}}>
                          <td style={{ padding: "5px" }}>Mobile Cover</td>
                          <td style={{ padding: "5px" }}>
                            for Iphone &amp; Tab
                          </td>
                          <td style={{ padding: "5px" }}>{props?.orderItems[0]?.quantity}</td>
                          <td style={{ padding: "5px" }}>$19.00</td>
                          <td style={{ padding: "5px" }}>$38.00</td>
                        </tr> */}

                        {props?.orderItems?.map((item: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td style={{ padding: "5px" }}>{item.name}</td>
                              <td style={{ padding: "5px" }}>
                                {getSize(item) || getColor(item)
                                  ? "Size: " +
                                    getSize(item) +
                                    ", Colour: " +
                                    getColor(item)
                                  : "-"}
                              </td>
                              <td style={{ padding: "5px" }}>
                                {item?.quantity}
                              </td>
                              <td style={{ padding: "5px" }}>
                                {" "}
                                ₹
                                {
                                  item?.meta.display_price?.with_tax?.unit
                                    ?.amount
                                }
                              </td>
                              <td style={{ padding: "5px" }}>
                                {" "}
                                ₹
                                {
                                  item?.meta.display_price?.with_tax?.value
                                    ?.amount
                                }
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ height: "25px" }} />
                </tr>
                <tr>
                  <td
                    valign="top"
                    style={{
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "20px",
                    }}
                  >
                    {/* <strong>NOTES/MEMO</strong>
                    <br />
                    Free Shipping with 30 days maney back Guarantee.{" "} */}
                  </td>
                  <td
                    valign="top"
                    style={{
                      float: "right",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: "20px",
                    }}
                  >
                    <table cellPadding={0} cellSpacing={0} width={220}>
                      <tbody>
                        <tr>
                          <td style={{ padding: "3px" }}>
                            <strong>Sub Total</strong>
                          </td>
                          <td style={{ padding: "3px" }}>
                            {" "}
                            ₹
                            {
                              props?.orderDetails?.meta.display_price?.with_tax
                                ?.amount
                            }
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "3px" }}>
                            <strong>Tax</strong>
                          </td>
                          <td style={{ padding: "3px" }}>{}</td>
                        </tr>
                        <tr
                          style={{
                            background: "#ccc",
                            border: "none",
                            padding: "5px",
                          }}
                        >
                          <td style={{ padding: "5px" }}>
                            <strong>Total</strong>
                          </td>
                          <td style={{ padding: "5px" }}>
                            {" "}
                            ₹
                            {
                              props?.orderDetails?.meta.display_price?.with_tax
                                ?.amount
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ height: "25px" }} />
                </tr>
                <tr style={{ textAlign: "center" }}>
                  {" "}
                  <td colSpan={2}>
                    <img src="/images/logo.png" alt="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-center mb-2 product-price">
            <Pdf
              targetRef={ref}
              filename={props?.orderDetails?.id}
              options={options}
            >
              {({ toPdf }: { toPdf: any }) => (
                <button
                  className="btn fs-13"
                  type="button"
                  onClick={() => {
                    toPdf();
                    props.setInvoiceStatus(false);
                  }}
                  style={{ padding: 15, marginBottom: 20 }}
                >
                  Download
                </button>
              )}
            </Pdf>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
