import React, { useState } from "react";
import MultiRangeSlider from "../elements/MultiRangeSlider";

const CategoryBox = (props: any) => {

  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="category-box">
      <h5 className="category-box-title">{props.title}
        <button type="button" className="float-end categoty-btn" onClick={() => setActive(!active)}>
          <i className="fas fa-angle-down fa-fw"></i>
        </button>
      </h5>
      <div className={"category-area" + (active ? " active" : "") + (props?.name == "color" ? " category-color" : "")}>
        {
          props?.data?.map((item: any, index: number) => {
            return (
              <label key={index} className="radio-container">{item.name}
                {
                  item?.color_code && (
                    <b className="color-radio" style={{ background: item.color_code }}></b>
                  )
                }
                <input type="radio" name={props.name} />
                <span className="radio-checkmark"></span>
              </label>
            )
          })
        }
        {
          props?.name == "price" && (
            <>
              <div style={{ marginTop: "15%" }} className="mb-4 price-range-filter">
                <MultiRangeSlider
                  min={1000}
                  max={10000}
                  onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                />
              </div>
              
              <button type="button" className="btn btn-sm w-100">
                Set Price
              </button>
             
            </>
          )
        }
      </div>
    </div>
  )
}

export default CategoryBox;