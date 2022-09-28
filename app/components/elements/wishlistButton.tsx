import React, { useEffect } from "react";
import shallow from "zustand/shallow";
import Badge from "react-bootstrap/Badge";
import { useRouter } from "next/router";
import Permalink from "../../../utils/Permalink";
import useUserStore from "../../../zustand/store";
import useWishlistStore from "../../../zustand/wishlist";

function WishlistButton() {
  const router = useRouter();
  const wishItems = useWishlistStore(
    (state: any) => state.wishlistItems,
    shallow
  );
  const isLogin = useUserStore((state: any) => state.isLogin, shallow);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <li className="list-inline-item">
      {Object.entries(wishItems).length > 0 ? (
        <Badge bg="danger">{Object.entries(wishItems).length}</Badge>
      ) : null}
      <a
        className="cart rounded-circle d-block"
        onClick={() => {
          if (isLogin) {
            router.replace(Permalink.ofWishlist());
          } else {
            useUserStore.setState({ loginPopup: true });
          }
        }}
        title={""}
      >
        <img src="/images/wishlist.png" alt="" />
      </a>
    </li>
  );
}

export default WishlistButton;
