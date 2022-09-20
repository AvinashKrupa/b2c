import React, { useEffect, useState } from "react";
import { addAbortSignal } from "stream";
import MultiRangeSlider from "../elements/MultiRangeSlider";
import { filters } from "../../constants/sampleData";
const {
  categories,
  colors,
  brands,
  discount_ranges,
  materials,
  occasions,
  prints,
  prices,
} = filters;

const CategoryBox = (props: any,) => {
  const [active, setActive] = useState<boolean>(true);
  const [propsData, setPropsData] = useState<any>([])


  useEffect(() => {
    if (props?.reset) {
      setActive(true)
      props.setReset(false)

    }
  })

  const handle = (index: any, id: any) => {


    if (props.data[index].isSelected) {
      props.data[index].isSelected = false;
      setPropsData([...propsData, props])

    }
    else {
      props.data[index].isSelected = true;
      setPropsData([...propsData, props])
    }
  }
//console.log("this is filters",filters)

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
                <input type="radio" name={props.name} value={item.name} defaultChecked={item.isSelected} onClick={() => handle(index, item.name)} />
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
                  onChange={({ min, max }) => {}}
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