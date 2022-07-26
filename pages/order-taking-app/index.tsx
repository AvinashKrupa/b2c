import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { RupifiService } from "../../app/network/gateway/RupifiService";
import Toast from "../../app/utils/Toast";

const OrderTakingAppScreen: NextPage = () => {

    const initFormValues: any = [
        {
            productId: "",
            productName: "",
            vendorId: "",
            sku: "",
            qty: 0,
            price: 0,
            discount: 0,
            sellingPrice: 0,
            gst: 0,
            total: 0,
        }
    ];

    const [formValues, setFormValues] = useState<any>(initFormValues)

    const [userName, setUserName] = useState<string>("admin");
    const [password, setPassword] = useState<string>("admin");
    const [haveAccess, setHaveAccess] = useState<boolean>(false);
    const [isEligibleForTxn, setIsEligibleForTxn] = useState<boolean>(true);
    const [sellerList, setSellerList] = useState<any>([]);
    const [orderTotal, setOrderTotal] = useState<number>(0);
    const [gstTotal, setGstTotal] = useState<number>(0);
    const [displaPlaceOrder, setDisplaPlaceOrder] = useState<boolean>(false);
    const [sellerId, setSellerId] = useState<string>("");
    

    useEffect(() => {
        getSellerList();
        return () => { };
    }, []);

    const getSellerList = () => {
        RupifiService.getInstance("")
            .getSellerList()
            .then((response: any) => {
                if (response.data) {
                    let sellerData: any = response?.data?.data;
                    sellerData?.map( (item: any, index: number) => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                    setSellerList(sellerData)
                } else {
                    console.log("ERROR:", response.data);
                }
            })
            .catch((error) => { });
    }

    const getCreditEligibility = (sellerId: string) => {
        console.log(sellerId)
    }

    const handleChange = (i: number, e: any) => {
        let newFormValues: any = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, initFormValues[0]])
    }

    const removeFormFields = (i: number) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const handleCalc = (event: any) => {
        event.preventDefault();
        let grandTotal: number = 0;
        let grandGstTotal: number = 0;
        formValues?.map((item: any, index: number) => {
            item.sellingPrice = getSalePrice(item.price, item.discount);
            item.total = getTotal(item.sellingPrice, item.gst, item.qty);
            grandTotal = item.total;
            grandGstTotal = Math.round((item.sellingPrice * item.gst / 100)*item.qty);
            return item;
        })
        setOrderTotal(grandTotal);
        setGstTotal(grandGstTotal);
        setDisplaPlaceOrder(!displaPlaceOrder)
    }

    const handleSubmit = () => {  
        Toast.showSuccess("Order placed successfully.");
        setFormValues(initFormValues);
        setDisplaPlaceOrder(!displaPlaceOrder);
        setSellerId("");
        console.log("formValues",formValues);
    }

    const getAccess = () => {
        if (userName == "admin" && password == "admin") {
            setHaveAccess(true)
        }
    }

    const logout = () => {
        setHaveAccess(false)
    }

    function getSalePrice(price: number, discount: number) {
        return Math.round(price - price * discount / 100);
    }

    function getTotal(salePrice: number, gst: number, qty: number) {
        return Math.round((salePrice + salePrice * gst / 100) * qty);
    }

    return (
        <>
            {
                !haveAccess && (
                    <div className="shoppingCart orderTakingApp">
                        <div className="wrapper">
                            <section className="cartItem mt-4 mt-md-5">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <h1 className="fs-40 font-b text-color-2 list-inline-item">ORDER TAKING APP</h1>
                                        <hr />
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h2 className="fs-32 font-b text-color-2 list-inline-item">Login</h2>
                                <br />
                                <br />
                                <div className="row">
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-4">
                                        <form action="#">
                                            <div className="form-group">
                                                <label htmlFor="username">Username:</label>
                                                <input type="text" className="form-control" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pwd">Password:</label>
                                                <input type="password" className="form-control" id="pwd" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <br />
                                            <button type="submit" className="btn btn-default btn-sm" onClick={() => getAccess()}>Get Access</button>
                                        </form>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </section>
                        </div>
                    </div>
                )
            }
            {
                haveAccess && isEligibleForTxn && (
                    <div className="shoppingCart orderTakingApp">
                        <div className="wrapper">
                            <section className="cartItem mt-4 mt-md-5">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <h1 className="fs-40 font-b text-color-2 list-inline-item">ORDER TAKING APP</h1>
                                        <hr />
                                    </div>
                                    <div className="col-lg-12 text-end"><button type="button" className="btn btn-sm" onClick={() => logout()}>Logout</button></div>
                                </div>
                            </section>
                            <section>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <h3 className="fs-32 font-b text-color-2 list-inline-item">CREATE ORDER</h3>
                                    </div>
                                    <div className="col-lg-3">
                                        <select className="form-control" value={sellerId} onChange={(e) => {
                                                setSellerId(e.target.value);
                                                getCreditEligibility(e.target.value);
                                            }}>
                                            <option value={""}>-- SELECT SELLER --</option>
                                            {
                                                sellerList?.map( (item: any, index: number) => {
                                                    return <option key={index} value={item.id}>{item.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={handleCalc}>
                                            {formValues.map((element: any, index: number) => (
                                                <div className="form-inline" key={index}>
                                                    <div className="row">
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>ProductID</label>}
                                                            <input type="text" className="form-control" name="productId" value={element.productId || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-2">
                                                            {index == 0 && <label>ProductName</label>}
                                                            <input type="text" className="form-control" name="productName" value={element.productName || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>VendorID</label>}
                                                            <input type="text" className="form-control" name="vendorId" value={element.vendorId || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>#SKU</label>}
                                                            <input type="text" className="form-control" name="sku" value={element.sku || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>QTY</label>}
                                                            <input type="number" className="form-control" name="qty" value={element.qty || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>Price</label>}
                                                            <input type="number" className="form-control" name="price" value={element.price || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>Discount(%)</label>}
                                                            <input type="number" className="form-control" name="discount" value={element.discount || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>Sale Price</label>}
                                                            <input readOnly={true} type="number" className="form-control" name="sellingPrice" value={getSalePrice(element.price, element.discount)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>GST(%)</label>}
                                                            <input type="number" className="form-control" name="gst" value={element.gst || ""} onChange={e => handleChange(index, e)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {index == 0 && <label>Total</label>}
                                                            <input readOnly={true} type="number" className="form-control" name="total" value={getTotal(getSalePrice(element.price, element.discount), element.gst, element.qty)} />
                                                        </div>
                                                        <div className="col-lg-1">
                                                            {
                                                                index ?
                                                                    <button type="button" className="btn btn-sm btn-red" onClick={() => removeFormFields(index)}>-</button>
                                                                    :
                                                                    <>
                                                                        <label>{" "}</label>
                                                                        <br />
                                                                        <button className="btn btn-sm btn-green" type="button" onClick={() => addFormFields()}>+</button>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="row">
                                                <div className="col-lg-11 text-end">
                                                    <label>GST Total</label>: <b>{gstTotal}</b>
                                                    &nbsp;&nbsp;
                                                    <label>Ordar Total</label>: <b>{orderTotal}</b>
                                                </div>
                                                <div className="col-lg-1"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12 text-center">
                                                    {
                                                        !displaPlaceOrder && <button className="btn btn-sm" type="submit">Calculate Total</button>
                                                    } 
                                                    {
                                                        displaPlaceOrder && <button className="btn btn-sm" type="button" onClick={() => handleSubmit()}>Place Order</button>
                                                    }
                                                </div>                                                
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default OrderTakingAppScreen;
