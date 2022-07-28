import React from "react";
import Slider from "react-slick";
import { preferenceSliderSetting } from "../../../utils/sliderConfig";

const NewCollections = () => {
    return (
        <section className="mt-4 mt-md-5 mostSearch">
            <div className="wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading2">
                            <h2>New Collections</h2>
                        </div>
                    </div>
                    <div className="col-md-12 sliderView">
                        <div className="Preference-slider mt-4 mt-lg-5">
                            <Slider {...preferenceSliderSetting}>
                                <div className="collection mx-3 position-relative">
                                    <a href="/shop">
                                        <img
                                            className="w-100"
                                            src="images/collection.png"
                                            alt=""
                                        />
                                        <div className="overlay text-start">
                                            <p className="fs-32 pb-4 font-Bsoul text-white d-flex align-items-end justify-content-center h-100 w-50 mx-auto text-center">
                                                Pooja Collection
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div className="collection mx-3 position-relative">
                                    <a href="/shop">
                                        <img
                                            className="w-100"
                                            src="images/collection.png"
                                            alt=""
                                        />
                                        <div className="overlay text-start">
                                            <p className="fs-32 pb-4 font-Bsoul text-white d-flex align-items-end justify-content-center h-100 w-50 mx-auto text-center">
                                                Pooja Collection
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div className="collection mx-3 position-relative">
                                    <a href="/shop">
                                        <img
                                            className="w-100"
                                            src="images/collection.png"
                                            alt=""
                                        />
                                        <div className="overlay text-start">
                                            <p className="fs-32 pb-4 font-Bsoul text-white d-flex align-items-end justify-content-center h-100 w-50 mx-auto text-center">
                                                Pooja Collection
                                            </p>
                                        </div>
                                    </a>
                                </div>
                                <div className="collection mx-3 position-relative">
                                    <a href="/shop">
                                        <img
                                            className="w-100"
                                            src="images/collection.png"
                                            alt=""
                                        />
                                        <div className="overlay text-start">
                                            <p className="fs-32 pb-4 font-Bsoul text-white d-flex align-items-end justify-content-center h-100 w-50 mx-auto text-center">
                                                Pooja Collection
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewCollections;