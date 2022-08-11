import React from "react";
import Slider from "react-slick";
import { preferenceSliderSetting } from "../../../../utils/sliderConfig";

const ComplimentYourOutfits = () => {
  return (
    <section className="mt-4 mt-md-5 complement pb-5">
      <div className="wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="heading2">
              <h2>Compliment your Outfits</h2>
            </div>
          </div>
          <div className="col-md-12 mt-4 mt-lg-5 position-relative sliderView">
            <div className="Preference-slider">
              <Slider {...preferenceSliderSetting}>
                <div className="thumb position-relative text-center">
                  <div className="bg1">
                    <img
                      className="w-100"
                      src="images/Compliment-bg-1-1.png"
                      alt=""
                    />
                    <div className="overlay text-start p-3">
                      <p className="fs-12 font-r text-color-1">
                        Women Teal Blue &amp; Beige Ethnic Motifs Printed
                        Straight Kurti
                      </p>
                    </div>
                  </div>
                </div>
                <div className="thumb position-relative text-center">
                  <div className="bg2">
                    <img
                      className="w-100"
                      src="images/Compliment-bg-2-2.png"
                      alt=""
                    />
                    <div className="overlay text-start p-3">
                      <p className="fs-12 font-r text-color-1">
                        Women Teal Blue &amp; Beige Ethnic Motifs Printed
                        Straight Kurti
                      </p>
                    </div>
                  </div>
                </div>
                <div className="thumb position-relative text-center">
                  <div className="bg3">
                    <img
                      className="w-100"
                      src="images/Compliment-bg-3-3.png"
                      alt=""
                    />
                    <div className="overlay text-start p-3">
                      <p className="fs-12 font-r text-color-1">
                        Women Teal Blue &amp; Beige Ethnic Motifs Printed
                        Straight Kurti
                      </p>
                    </div>
                  </div>
                </div>
                <div className="thumb position-relative text-center">
                  <div className="bg4">
                    <img
                      className="w-100"
                      src="images/Compliment-bg-4-4.png"
                      alt=""
                    />
                    <div className="overlay text-start p-3">
                      <p className="fs-12 font-r text-color-1">
                        Women Teal Blue &amp; Beige Ethnic Motifs Printed
                        Straight Kurti
                      </p>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplimentYourOutfits;
