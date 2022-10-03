import { useRouter } from "next/router";
import React from "react";
import Slider from "react-slick";
import Permalink from "../../../utils/Permalink";
import { occasionSetting } from "../../../utils/sliderConfig";
import RecentlyViewedItem from "./RecentlyViewedItem";

const DetailRecentlyViewed = (props: any) => {
  const route = useRouter();
  return (
    <section className="mt-4 mt-md-5 pb-5">
      <div className="row">
        <div className="col-md-12">
          <div className="heading3">
            <h2>
              <span className="bg9">Recently Viewed Items</span>
            </h2>
          </div>
        </div>
        <div className="col-md-12 mt-4 mt-lg-5 position-relative sliderView Occasion">
          <div className="ocassion-slider">
            <Slider {...occasionSetting}>
              {
                props?.items?.map((item: any, index: number) => {
                  return (
                    <RecentlyViewedItem key={index} id={item} {...props}/>
                  )
                })
              }
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailRecentlyViewed;
