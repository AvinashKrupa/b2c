import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Header from "./components/Header";
import MenuCategorySlider from "./components/MenuCategorySlider";
import FestiveSaleBanner from "./components/FestiveSaleBanner";
import ShoppingBagBlock from "./components/ShoppingBagBlock";
import CompaignOnOutFit from "./components/CompaignOnOutFit";
import KurtisForOccassion from "./components/KurtisForOccassion";
import MustInWardrobe from "./components/MustInWardrobe";
import ShopByPrice from "./components/ShopByPrice";
import ShopVirtuallyWithExpert from "./components/ShopVirtuallyWithExpert";
import BringInEssence from "./components/BringInEssence";
import TopCollections from "./components/TopCollections";
import ShopByPreference from "./components/ShopByPreference";
import WhatsNewThisMonth from "./components/WhatsNewThisMonth";
import NavTatvaTopPicks from "./components/NavTatvaTopPicks";
import ComplimentYourOutfits from "./components/ComplimentYourOutfits";
import DesignersPick from "./components/DesignersPick";
import WhyNavTatva from "./components/WhyNavTatva";
import MostSearchedStyles from "./components/MostSearchedStyles";
import WeddingSeasonIsHere from "./components/WeddingSeasonIsHere";
import ForTheLookYouDesire from "./components/ForTheLookYouDesire";
import OurValuedCustomers from "./components/OurValuedCustomers";
import OurValuedCustomerSlider from "./components/OurValuedCustomerSlider";
import SpendMoreWinMore from "./components/SpendMoreWinMore";
import NewCollections from "./components/NewCollections";
import MoreBrandsToExplore from "./components/MoreBrandsToExplore";
import MakeYourOutfitSpecial from "./components/MakeYourOutfitSpecial";
import ForTheLookYouDesireFabric from "./components/ForTheLookYouDesireFabric";
import VideoBlock from "./components/VideoBlock";
import Footer from "../../components/common/Footer";
import FooterFixedButton from "./components/FooterFixedButton";
import { CatalogService } from "../../../network/gateway/Catalog";
import { Cart } from "../../../network/gateway/Cart";
import LocalStorageService from "../../../utils/storage/LocalStorageService";
import useUserStore from "../../../zustand/store";
import { Wishlist } from "../../../network/gateway/Wishlist";
import useWishlistStore from "../../../zustand/wishlist";

const ThemeOne: NextPage = () => {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [material, setMaterial] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [categoryByOccasion, setCategoryByOccasion] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [currentMonth, setCurrentMonth] = useState([]);
  const [shopPreference, setShopPreference] = useState([]);
  const [topPick, setTopPick] = useState([]);
  const [topCollection, setTopCollection] = useState([]);
  const [topCompliment, setTopCompliment] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [productId, setProductId] = useState<string>("");
  const userData = useUserStore((state: any) => state.userInfo);
  const setLoginPopup = useUserStore((state: any) => state.showLogin);
  const [festivalProducts, setFestivalProducts] = useState([])

  const [loading, setLoading] = useState(true);
  const wishItems = useWishlistStore((state: any) => state.wishlistItems);

  useEffect(() => {
    fetchDataFromServer();
    return () => { };
  }, []);

  async function fetchDataFromServer() {
    await getCatalog();
    await getHomeContent("top_collection");
    await getHomeContent("shop_preference");
    await getHomeContent("festival_products");
    await getHomeContent("outflit_products");
    await getHomeContent("occassion_products");
    await getHomeContent("this_month");
    await getHomeContent("top_pick");
    await getHomeContent("compliment");
    await getHomeContent("new_collection");
  }

  function getCatalog() {
    return new Promise((resolve, reject) => {
      CatalogService.getInstance()
        .getAllCategory()
        .then((response: any) => {
          setLoading(false);
          if (response.data) {
            setCategory(response.data.data["Category By Style"].children);
            setBrand(response.data.data["Brands"].children);
            setMaterial(response.data.data["Material"].children);
            setOccasion(response.data.data["Occasion"].children);
            setCategoryByOccasion(
              response.data.data["Category By Occasion"].children
            );

            resolve(response);
          } else {
            resolve([]);
            console.log("ERROR:", response.data);
          }
        })
        .catch((error) => {
          reject();
        });
    });
  }

  function getHomeContent(type: string) {
    return new Promise((resolve, reject) => {
      CatalogService.getInstance()
        .getHomeContent(type)
        .then((response: any) => {
          setLoading(false);
          if (response.data) {
            switch (type) {
              case "outflit_products":
                setOutfits(response.data.data);
                break;
              case "occassion_products":
                setOccasion(response.data.data);
                break;
              case "top_collection":
                setTopCollection(response.data.data);
                break;
              case "shop_preference":
                setShopPreference(response.data.data);
                break;
              case "top_pick":
                setTopPick(response.data.data);
                break;
              case "this_month":
                setCurrentMonth(response.data.data);
                break;
              case "compliment":
                setTopCompliment(response.data.data);
                break;
              case "new_collection":
                setNewCollection(response.data.data);
                break;
              case "festival_products":
                setFestivalProducts(response.data.data);
                break;

              default:
                break;
            }
            resolve(response);
          } else {
            reject(response);
            console.log("ERROR:", response.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function addToCart(id: string) {
    const params = {
      data: {
        id: id,
        type: "cart_item",
        quantity: 1,
      },
    };
    Cart.getInstance()
      .addToCart(params)
      .then((info: any) => {
        console.log("info", info);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function addToWishList(id: string) {
    Wishlist.getInstance()
      .createWishlistEntry()
      .then((info) => {
        console.log("info", info);
      }).then(() => {
        Wishlist.getInstance()
          .addToWishList(id)
          .then((info) => {
            console.log("info", info);
            localStorage.removeItem("WISHLIST_ENTRY")
          })
          .catch((error) => {
            console.log("error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function deletwishlistItem(id: string) {
    let entry_id
    LocalStorageService.getWishlistIDEntry_ID().data?.map((each: any) => {
      if (each.id === id) {
        return entry_id = each.entry_id
      }
    })
    Wishlist.getInstance()
      .deleteWishListItem(entry_id, id)
      .then((response: any) => {
      })
      .catch((error) => {
        console.log("error", error);
      });

  }

  return (
    <div className="home">
      <div className="wrapper">
        <Header />
        {/* category start */}
        <MenuCategorySlider category={category} loading={loading} />
        {/* banner start */}
        <FestiveSaleBanner />
        {/*  Shopping Bag start & Review */}
        {/* <ShoppingBagBlock /> */}
      </div>
      {/* Select your companion to try on your Outfit */}
      <CompaignOnOutFit data={outfits} />
      {/* Kurtis For Every Occassion */}
      <KurtisForOccassion data={occasion}
        onAddCart={(id) => {
          if (LocalStorageService.getAccessToken()) {
            addToCart(`${id}`);
          } else {
            setProductId(`${id}`);
            setLoginPopup(true);
          }
        }}
        onWishlist={(id) => {
          if (LocalStorageService.getAccessToken()) {
            addToWishList(`${id}`)
          } else {
            setLoginPopup(true);
          }
        }}
        onDeletwishlistItem={(id) => {
          if (LocalStorageService.getAccessToken()) {
            deletwishlistItem(`${id}`)
          } else {
            setLoginPopup(true);
          }

        }}

      />
      {/* Must haves In Your Wardrobe section */}
      {/* <MustInWardrobe /> */}
      <div className="wrapper">
        {/* Shop By Price */}
        <ShopByPrice />
        {/* Shop virtually  with a Product Expert. */}
        {/* <ShopVirtuallyWithExpert /> */}
        {/* Bring in the Essence of  Holi to your wardrobe*/}
        <BringInEssence
          data={festivalProducts}
          onAddCart={(id) => {
            if (LocalStorageService.getAccessToken()) {
              addToCart(`${id}`);
            } else {
              setProductId(`${id}`);
              setLoginPopup(true);
            }

          }}
          onWishlist={(id) => {
            if (LocalStorageService.getAccessToken()) {
              addToWishList(`${id}`)
            } else {
              setLoginPopup(true);
            }
          }}
          onDeletwishlistItem={(id) => {
            if (LocalStorageService.getAccessToken()) {
              deletwishlistItem(`${id}`)
            } else {
              setLoginPopup(true);
            }

          }}

        />
        {/* Top Collections */}
        <TopCollections
          data={topCollection}
          onAddCart={(id) => {
            if (LocalStorageService.getAccessToken()) {
              addToCart(`${id}`);
            } else {
              setProductId(`${id}`);
              setLoginPopup(true);
            }
          }}
          onWishlist={(id) => {
            if (LocalStorageService.getAccessToken()) {
              addToWishList(`${id}`)
            } else {
              setLoginPopup(true);
            }

          }}
          onDeletwishlistItem={(id) => {
            if (LocalStorageService.getAccessToken()) {
              deletwishlistItem(`${id}`)
            } else {
              setLoginPopup(true);
            }

          }}
        />
        {/* Shop By Preference */}
        <ShopByPreference
          data={shopPreference}
          onAddCart={() => { }}
          onWishlist={() => { }}
        />
        {/* What’s New This Month */}
        <WhatsNewThisMonth data={currentMonth} />
        {/* NavTatva’s Top Picks */}
        <NavTatvaTopPicks data={topCompliment}
          onAddCart={(id) => {
            if (LocalStorageService.getAccessToken()) {
              addToCart(`${id}`);
            } else {
              setProductId(`${id}`);
              setLoginPopup(true);
            }
          }}
          onWishlist={(id) => {
            if (LocalStorageService.getAccessToken()) {
              addToWishList(`${id}`)
            } else {
              setLoginPopup(true);
            }

          }}
          onDeletwishlistItem={(id) => {
            if (LocalStorageService.getAccessToken()) {
              deletwishlistItem(`${id}`)
            } else {
              setLoginPopup(true);
            }

          }}
        />
        {/* Compliment your Outfits */}
        <ComplimentYourOutfits data={topCompliment} />
      </div>
      {/* Designer’s Pick */}
      {/* <DesignersPick /> */}
      {/* Why NavTatva? */}
      {/* <WhyNavTatva /> */}
      {/* Most Searched Styles*/}
      {/* <MostSearchedStyles /> */}
      {/* Wedding Season Is Almost Here*/}
      {/* <WeddingSeasonIsHere /> */}
      {/* For the look you desire*/}
      {/* <ForTheLookYouDesire /> */}
      {/* Our Valued Customers*/}
      {/* <OurValuedCustomers /> */}
      {/* Our Valued Customer Slider*/}
      {/* <OurValuedCustomerSlider /> */}
      {/* Spend More, Win More*/}
      {/* <SpendMoreWinMore /> */}
      {/* New Collections*/}
      <NewCollections data={newCollection} />
      {/* More Brands To Explore*/}
      <MoreBrandsToExplore brand={brand} loading={loading} />
      {/* Make your outfits special */}
      {/* <MakeYourOutfitSpecial /> */}
      {/* For the look you desire */}
      {/* <ForTheLookYouDesireFabric /> */}
      {/* Video Block */}
      {/* <VideoBlock /> */}
      {/* End Video Block */}
      {/* Footer */}
      <Footer />
      {/* End Footer */}
      {/* Fixed Button */}
      <FooterFixedButton />
      {/* End Fixed Button */}
    </div>
  );
};

export default ThemeOne;
