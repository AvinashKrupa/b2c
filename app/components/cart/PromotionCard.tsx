import { useEffect, useRef, useState } from "react";
import { Cart } from "../../../network/gateway/Cart";
import Toast from "../../../utils/Toast";

const PromotionCard = (props: any) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [code, setCode] = useState<any>();

    useEffect(() => {
        if (props.id) {
            getPromotionCode(props.id);
        }
        return () => { };
    }, [props.id]);

    function getPromotionCode(id: any) {
        Cart.getInstance()
            .getPromotionCode(id)
            .then((response: any) => {
                if(response?.data?.data){
                    setCode(response?.data?.data[0])
                }                
            });
    }

    function ordinal_suffix_of(i: number) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    const copyToClipboard = (code: any) => {
        navigator.clipboard.writeText(code);
        Toast.showSuccess("Copied!")
    };

    return (
        <>
            {
                code?.code && (
                    <div className="position-relative mt-4">
                        <a href="#">
                            <img className="w-100" src="images/card-1.png" alt="" />
                            <div className="carddata align-items-start d-flex flex-column h-100 justify-content-between w-100 ">
                                <div>
                                    <h4 className="fs-24 font-sb text-white">{props?.name}</h4>
                                    <p className="fs-16 font-r text-color-8">
                                        {props?.description}
                                    </p>
                                </div>
                                <div className="d-flex w-100">
                                    <p className="fs-16 font-sb text-white ltr-space">
                                        {code?.code} <img src="images/card-icon.png" alt="" onClick={(e) => copyToClipboard(code?.code)}/>
                                    </p>
                                    <p className="fs-12 font-r text-color-8 ms-auto">
                                        Valid till{" "}
                                        <small className="fs-16 font-r text-white">{ordinal_suffix_of((new Date(props.end)).getDate())} {monthNames[(new Date(props.end)).getMonth()]}</small>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            }
        </>
    )
}

export default PromotionCard;