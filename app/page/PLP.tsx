import React, { useEffect, useState } from "react";
import ProductSmallBlock from "../../app/components/product/ProductSmallBlock";
import { products } from "../../app/constants/sampleData";
import GroupProductBlock from "../../app/components/product/GroupProductBlock";
import ProductQuickView from "../../app/components/product/ProductQuickView";
import Header from "../../app/components/common/Header";
import Footer from "../../app/components/common/Footer";
import CartPopup from "../../app/components/common/CartPopup";
import SearchPopup from "../../app/components/common/SearchPopup";
import CategoryFilter from "../../app/components/common/CategoryFilter";
import SearchBlock from "../../app/components/common/SearchBlock";
import SortingBlock from "../../app/components/common/SortingBlock";
import SortByBlock from "../../app/components/common/SortByBlock";
import Paging from "../../app/components/common/Paging";
import { useRouter } from "next/router";
import { CatalogService } from "../network/gateway/Catalog";
import Login from "../../pages/login";

const PLP = () => {
  const router = useRouter();

  const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);
  const [openProductQuickView, setOpenProductQuickView] =
    useState<boolean>(false);

  const [login, setLogin] = useState<boolean>(false);
  const [openCartPopup, setOpenCartPopup] = useState<boolean>(false);
  const [productListing, setProductListing] = useState<Array<any>>([]);
  const [selectedProductData, setSelectedProductData] = useState<Array<any>>(
    []
  );

  useEffect(() => {
    getProductList();
    return () => {};
  }, []);

  function getProductList() {
    CatalogService.getInstance()
      .getProductListing()
      .then((response: any) => {
        if (response.data) {
          setProductListing(response.data.data);
        } else {
          console.log("ERROR:", response.data);
        }
      })
      .catch((error) => {});
  }

  function getProductDetail(id: any) {
    CatalogService.getInstance()
      .getProducDetail(id)
      .then((response: any) => {
        if (response.data) {
          setSelectedProductData(response.data.data);
          setOpenProductQuickView(true);
        } else {
          console.log("ERROR:", response.data);
        }
      })
      .catch((error) => {});
  }

  return (
    <>
      <div className="wrapper">
        {/* Header */}
        <Header />
        {/* End Header */}
        {/* Category */}
        <Login visible={login} onClose={() => setLogin(false)} />
        <section className="category-section">
          <div className="container-fluid">
            <div className="row">
              <CategoryFilter />
              <div className="col-lg-9 col-xl-10">
                <div className="rightside-bar">
                  <SearchBlock setOpenSearchBox={setOpenSearchBox} />
                  <SortByBlock />
                  <div className="row">
                    {productListing.map((item: any, index: number) => {
                      if (
                        item.attributes.children &&
                        item.attributes.children.length > 0
                      ) {
                        console.log("itemitemaaa", item.attributes.children);
                        return (
                          <ProductSmallBlock
                            key={index}
                            {...item.attributes.children[0]}
                            {...item.attributes.children[0].attributes}
                            onClickQuickView={(id: any) => {
                              getProductDetail(id);
                            }}
                            setOpenCartPopup={setOpenCartPopup}
                            addToCart={() => {
                              setLogin(true);
                            }}
                          />
                        );
                      } else {
                        return;
                      }
                    })}
                    {/* <GroupProductBlock
                      setOpenProductQuickView={setOpenProductQuickView}
                      setOpenCartPopup={setOpenCartPopup}
                    /> */}
                    {/* {products?.slice(2, 4)?.map((item: any, index: number) => {
                      return (
                        <ProductSmallBlock
                          key={index}
                          {...item}
                          setOpenProductQuickView={setOpenProductQuickView}
                          setOpenCartPopup={setOpenCartPopup}
                        />
                      );
                    })} */}
                  </div>
                </div>
                {/* <SortingBlock />
                <div className="rightside-bar">
                  <div className="row">
                    {products?.slice(4, 5)?.map((item: any, index: number) => {
                      return (
                        <ProductSmallBlock
                          key={index}
                          {...item}
                          setOpenProductQuickView={setOpenProductQuickView}
                          setOpenCartPopup={setOpenCartPopup}
                        />
                      );
                    })}
                    {products?.slice(5, 6)?.map((item: any, index: number) => {
                      return (
                        <ProductSmallBlock
                          key={index}
                          {...item}
                          setOpenProductQuickView={setOpenProductQuickView}
                          setOpenCartPopup={setOpenCartPopup}
                        />
                      );
                    })}
                  </div>
                </div>*/}
                <Paging />
              </div>
            </div>
          </div>
        </section>
        {/* End Category */}
        {/* Footer */}
        <Footer />
        {/* End Footer */}
      </div>
      {/* Cart Popup */}
      <CartPopup
        openCartPopup={openCartPopup}
        setOpenCartPopup={setOpenCartPopup}
      />
      {/* Search Popup */}
      <SearchPopup
        openSearchBox={openSearchBox}
        setOpenSearchBox={setOpenSearchBox}
      />
      {openProductQuickView && (
        <ProductQuickView
          openProductQuickView={openProductQuickView}
          setOpenProductQuickView={() => setOpenProductQuickView(false)}
          data={selectedProductData}
          onSelectedProduct={(id: any) => {
            getProductDetail(id);
          }}
        />
      )}
    </>
  );
};

export default PLP;
