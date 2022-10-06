const PromotionCard = (props: any) => {

    const 
    return (
        <div className="position-relative mt-4">
            <a href="#">
                <img className="w-100" src="images/card-1.png" alt="" />
                <div className="carddata align-items-start d-flex flex-column h-100 justify-content-between w-100 ">
                    <div>
                        <h4 className="fs-24 font-sb text-white">Upto 20% off</h4>
                        <p className="fs-16 font-r text-color-8">
                            {props?.name}
                        </p>
                    </div>
                    <div className="d-flex w-100">
                        <p className="fs-16 font-sb text-white ltr-space">
                            NAVTATVA2022 <img src="images/card-icon.png" alt="" />
                        </p>
                        <p className="fs-12 font-r text-color-8 ms-auto">
                            Valid till{" "}
                            <small className="fs-16 font-r text-white">30th July</small>
                        </p>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default PromotionCard;