import React, { useState, CSSProperties } from "react";
import { menuSliderSettings } from "../../../../utils/sliderConfig";
import { useDebouncedEffect } from "../../../../utils/useDebouncedEffect";
import NavMenuCategory from "../../../components/layouts/category";
import Slider from "react-slick";
import Permalink from "../../../../utils/Permalink";
import CategoryLoader from "../../../components/loader/CategoryLoader";
import { useRouter } from "next/router";
import Image from 'next/image';
import CategoryDefautImage from '../../../../public/images/cate-1.jpg';
import SubCategoryDefautImage from '../../../../public/images/sub-category.png';


interface IProps {
  category: Array<any>;
  loading: boolean;
}
const MenuCategorySlider = (props: IProps) => {
  const router = useRouter();
  const [tempselectedSubCat, setTempSelectedSubCat] = useState<any>([]);
  const [selectedSubCat, setSelectedSubCat] = useState<any>([]);
  const [sideImageOnHover, setSideImageOnHover] = useState<any>([]);
  // useDebouncedEffect(() => console.log(selectedSubCat), [selectedSubCat], 1000);

  return (
    <>
      {props.loading ? (
        <CategoryLoader />
      ) : (
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
                        image={info?.image ?? CategoryDefautImage}
                        onClick={() => {
                          if (selectedSubCat.length == 0) {
                            setTempSelectedSubCat(info.children);
                            setSelectedSubCat(info.children || []);
                          } else {
                            setTempSelectedSubCat(selectedSubCat);
                            setSelectedSubCat([]);
                          }
                        }}
                        onMouseLeave={() => {
                          setSelectedSubCat([]);
                        }}
                      />
                    );
                  })}
                </Slider>
              </div>
              <div
                onMouseEnter={() => {
                  setSelectedSubCat(tempselectedSubCat);
                }}
                onMouseLeave={() => {
                  setSelectedSubCat([]);
                }}
                className="bg-white subcategory p-4"
                style={{
                  display: selectedSubCat.length == 0 ? "none" : "block",
                }}
              >
                <div className="row">
                  <div className="col-md-8 d-block d-lg-flex">
                    {selectedSubCat.map((info: any, index: number) => {
                      return (
                        <ul className="me-5" key={index}>
                          <li>
                            <h4>{info.name}</h4>
                          </li>
                          {info?.children?.map((info: any, index2: number) => {
                            return (
                              <li
                                onClick={() => {}}
                                key={index2}
                                onMouseEnter={() => {
                                  setSideImageOnHover(info);
                                }}
                              >
                                <a onClick={ () => router.replace(Permalink.ofCategory(info))}>
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
                    <Image
                      className="h-100 category-hover-image"
                      src={sideImageOnHover?.image ?sideImageOnHover?.image: SubCategoryDefautImage}
                      alt=""
                      width={450}
                      height={357}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MenuCategorySlider;
