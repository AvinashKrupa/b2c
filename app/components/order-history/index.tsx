import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { CustomerOrderService } from "../../../network/gateway/CustomerOrderService";
import useUserStore from "../../../zustand/store";
import Loader from "../loader/loader";
import OrderItems from "./orderItems";

const OrderHistoryItems = () => {
    const [deliveredList, setdeliverdList] = useState([1, 2])
    const isLogin = useUserStore((state: any) => state.isLogin, shallow);
    const setLoginPopup = useUserStore((state: any) => state.showLogin);
    const [orderItems, setOrderItems] = useState<any>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (isLogin) {
            getCustomerOrders();
        } else {
            setLoginPopup(true);
        }
        return () => { };
    }, [isLogin]);

    function getCustomerOrders() {
        CustomerOrderService.getInstance()
            .getCustomerOrder()
            .then((data: any) => {
                setOrderItems(data?.data.data)
                setLoading(false)
            }).catch((error) => { });
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
        let newDate = new Date(data)
        return newDate.getDate() + " " + months[newDate.getMonth()] + " " + newDate.getFullYear()
    }

    function cancelOrder(id: any, index: number) {
        const param = {
            "status": "cancelled"
        }

        CustomerOrderService.getInstance()
            .cancelOrder(id, param)
            .then((data: any) => {
                if (data.statusText === "OK") {
                    const newOrderItems: any = []
                    orderItems.map((each: any) => {
                        if (each.id === data.data.data.id) {
                            return newOrderItems.push({ ...each, "status": "cancelled" })
                        }
                        else {
                            return newOrderItems.push(each)
                        }
                    })

                    setOrderItems([...newOrderItems])
                }


            }).catch((error) => { });

    }

    return (<div className="col-12 col-lg-8 col-xl-9">
        <div className="rightside-bar-area">
            {loading && <Loader loading={loading} />}
            <h3 className="username d-lg-none">Order History</h3>
            <>
                {orderItems.map((item: any, index: number) => {
                    return (< div key={index}>
                        <div className="orderID p-4 cartItem bg-white mt-3 " >

                            <ul className="w-100">
                                <li className="fs-10 font-r list-inline-item">
                                    <span className="text-color-1">Order ID</span>
                                    <p className="text-color-2">{item.id}</p>
                                </li>
                                <li className="fs-10 font-r list-inline-item">
                                    <span className="text-color-1">Date</span>
                                    <p className="text-color-2">{getDate(item?.meta.timestamps.created_at)}</p>
                                </li>
                                <li className="fs-10 font-r list-inline-item float-end text-end">
                                    <span className="text-color-1">Total</span>
                                    <p className="text-color-2">₹{item?.meta.display_price.with_tax.amount}</p>
                                </li>
                            </ul>
                            <div className="order-items-btn text-center col-lg-11" >
                                {/* <div className="col-lg-3  m-2">
                                    <a className="btn-new btn-bor d-block mb-2 mt-2 mt-xl-0 fs-11" style={(item?.status === 'cancelled') ? { pointerEvents: 'none', backgroundColor: '#B8B8B8' } : {}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                        Track Package
                                    </a>

                                </div> */}
                                <div className=" col-lg-3 m-2">
                                    {item.status === 'cancelled' ? <><a className="btn-can d-block mb-2" style={(item?.status === 'cancelled') ? { pointerEvents: 'none', } : {}}>
                                        <svg style={{ marginRight: 5 }} xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                        Order Cancelled
                                    </a> </> :

                                        <a className="btn-new  btn-bor d-block mb-2" onClick={() => { cancelOrder(item.id, index) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                            </svg>
                                            Cancel Order
                                        </a>}

                                </div>
                                {/* <div className=" col-lg-3 m-2">
                                    <a href="#" className="btn-new btn-bor d-block mb-2" style={(item?.status === 'cancelled') ? { pointerEvents: 'none', backgroundColor: '#B8B8B8' } : {}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                        Leave Feedback
                                    </a>

                                </div> */}
                                <div className="col-lg-3  m-2">
                                    <a href="#" className="btn-new btn-bor d-block text-center" style={(item?.status === 'cancelled') ? { pointerEvents: 'none', backgroundColor: '#B8B8B8' } : {}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                            <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                                        </svg>
                                        Invoice
                                    </a>

                                </div>
                            </div>
                            {item.line_items.map((each: any, index: number) => {
                                return (<OrderItems key={index} {...each} />)
                            })}
                        </div>
                    </ div>)
                })}
            </>

            {/* <div className="orderID p-4 cartItem mt-3 bg-white">
                <ul className="w-100">
                    <li className="fs-10 font-r list-inline-item">
                        <span className="text-color-1">Order ID</span>
                        <p className="text-color-2">HX-8475-2022-BN</p>
                    </li>
                    <li className="fs-10 font-r list-inline-item">
                        <span className="text-color-1">Date</span>
                        <p className="text-color-2">10th Aug 2022</p>
                    </li>
                    <li className="fs-10 font-r list-inline-item float-end text-end">
                        <span className="text-color-1">Total</span>
                        <p className="text-color-2">₹16,788.00</p>
                    </li>
                </ul>

                {deliveredList.map((item: any, index: number) => {
                    return (<>
                        <div className="bgbar position-relative mt-4 ms-0">
                            <div className="row mb-3">
                                <div className="col-md-12 col-lg-9">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-3">
                                            <div className="imgbar"><img className="w-100" src="images/img1.png" alt="" /></div>
                                        </div>
                                        <div className="col-md-8 col-lg-8 position-relative">
                                            <h3 className="fs-16 font-sb text-color-2">Anubhutee</h3>
                                            <p className="fs-14 font-r text-color-1 pt-1 prodes">Women Teal Blue &amp; Beige Ethnic Motifs Printed Straight Kurti</p>
                                            <div className="d-flex pt-3 pb-2">
                                                <p className="fs-14 font-sb text-color-1">Size: <span className="text-color-2">XL</span></p>
                                                <p className="fs-14 font-sb text-color-1 ms-4">Colour: <span className="text-color-2">Blue</span></p>
                                                <p className="fs-14 font-sb text-color-1 ms-4">QTY: <span className="text-color-2">2</span></p>
                                            </div>
                                            <div className="d-flex">
                                                <p className="fs-14 font-sb text-color-1">Size: <span className="text-color-2">XL</span></p>
                                                <p className="fs-14 font-sb text-color-1 ms-4">Colour: <span className="text-color-2">Blue</span></p>
                                                <p className="fs-14 font-sb text-color-1 ms-4">QTY: <span className="text-color-2">2</span></p>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                                            <a href="button" className="btn-delivery btn-gray d-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                                </svg>
                                                Delivered on 19th July
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-3 offet-1">
                                    <a href="button" className="btn-new btn-bor d-block mb-2 mt-2 mt-xl-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                        Track Package
                                    </a>
                                    <a href="button" className="btn-new btn-bor d-block mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                        Cancel Order
                                    </a>
                                    <a href="button" className="btn-new btn-bor d-block mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                        Leave Feedback
                                    </a>
                                    <a href="button" className="btn-new btn-bor d-block text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16" style={{ marginRight: 5 }}>
                                            <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                                        </svg>
                                        Invoice
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>)
                })}



            </div> */}
        </div>
    </div>)
}

export default OrderHistoryItems;