import React, { useState } from "react";
import { menuSliderSettings } from "../../../utils/sliderConfig";
import { useDebouncedEffect } from "../../../utils/useDebouncedEffect";
import NavMenuCategory from "../../../components/layouts/category";
import Slider from "react-slick";

interface IProps {
  category: Array<any>;
}

const MenuCategorySlider = (props: IProps) => {
  const [selectedSubCat, setSelectedSubCat] = useState<any>([]);
  useDebouncedEffect(() => console.log(selectedSubCat), [selectedSubCat], 1000);

  return (
    <section className="category mt-4 mt-md-5 position-relative side-category">
      <div className="row mx-0 justify-content-center">
        <div className="col-lg-12 px-0">
          <div className="testimonial-slider">
            <Slider {...menuSliderSettings}>
              {props.category.map((info: any, index: number) => {
                return (
                  <NavMenuCategory
                    key={index}
                    title={info.name}
                    image={info.image || "images/cate-1.jpg"}
                    onClick={() => {
                      if (selectedSubCat.length == 0) {
                        setSelectedSubCat(info.children || []);
                      } else {
                        setSelectedSubCat([]);
                      }
                    }}
                  />
                );
              })}
            </Slider>
          </div>

          <div
            className="bg-white subcategory p-4"
            style={{
              display: selectedSubCat.length == 0 ? "none" : "block",
            }}
          >
            <div className="row">
              <div className="col-md-8 d-block d-lg-flex">
                {selectedSubCat.map((info: any) => {
                  return (
                    <ul className="me-5">
                      <li>
                        <h4>{info.name}</h4>
                      </li>
                      {info?.children?.map((info: any) => {
                        return (
                          <li>
                            <a href={`/shop/${info.slug}?category=${info.id}`}>
                              {info.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
              <div className="col-md-12 col-lg-4 mt-4 mt-lg-0">
                <img className="w-100" src="images/sub-category.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuCategorySlider;
