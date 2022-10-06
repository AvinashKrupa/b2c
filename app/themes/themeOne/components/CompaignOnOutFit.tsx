import React from "react";
import Slider from "react-slick";
import Permalink from "../../../../utils/Permalink";
import { kurtiSettings } from "../../../../utils/sliderConfig";
import { useRouter } from "next/router";
import SectionHeader from "./SectionHeader";
import Image from 'next/image';

interface iProps {
  data: any;
}

const CompaignOnOutFit = (props: iProps) => {
  const router = useRouter();
  return (
    <section className="mt-4 mt-md-5 pb-5">
      <div className="wrapper">
        <div className="row">
          <SectionHeader title={"Select your companion to try on your Outfit"} />
          <div className="col-md-12 mt-4 mt-lg-5 position-relative sliderView">
            <div className="kurtis-slider">
              <Slider {...kurtiSettings}>
                {props.data.map((item: any, index: number) => {
                  return (
                    <a onClick={() => router.replace(Permalink.ofProduct(item))} key={index}>
                      <div className="thumb position-relative text-center" >
                        <Image
                          className="w-100"
                          src={item.image}
                          alt=""
                          style={{ objectFit: "contain" }}
                          width={330}
                          height={423}
                        />
                        <div className="overlay text-start">
                          {/* {item.height && <p className="fs-22 font-r">
                            Height<span className="font-sb ms-3">{item.height}</span>
                          </p>}
                          {item.weight && <p className="fs-22 font-r">
                            Weight<span className="font-sb ms-3">{item.weight}</span>
                          </p>} */}
                          {item.size && <p className="fs-22 font-r">
                            Size<span className="font-sb ms-3">{item.size}</span>
                          </p>}
                        </div>
                      </div>
                    </a>)
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaignOnOutFit;
