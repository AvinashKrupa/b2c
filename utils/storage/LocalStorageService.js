class LocalStorageService {
  static getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  static setUserToken(tokenObj) {
    localStorage.setItem("user_token", tokenObj);
  }
  static setCustomerId(customer_id) {
    localStorage.setItem("customer_id", customer_id);
  }
  static setWishlistIDEntry_ID(data){
    localStorage.setItem("wishlist_id_entry_id", JSON.stringify({data}));

  }
  static getWishlistIDEntry_ID() {
    let data = localStorage.getItem("wishlist_id_entry_id");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  static setWishlist(ids) {
    localStorage.setItem("customer_wishlist", JSON.stringify(ids));
  }
  static getWishlist() {
    let data = localStorage.getItem("customer_wishlist");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  static setCartItems(ids) {
    localStorage.setItem("customer_cart_items", JSON.stringify(ids));
  }
  static getCartItems() {
    let data = localStorage.getItem("customer_cart_items");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  static clearCartItem(){
    localStorage.removeItem("customer_cart_items");
  }

  static getCustomerId() {
    return localStorage.getItem("customer_id");
  }
  static logoutUser() {
    localStorage.removeItem("user_token");
    localStorage.removeItem("customer_id");
  }
  static setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj);
    localStorage.setItem("refresh_token", tokenObj);
  }
  static getUserToken() {
    return localStorage.getItem("user_token");
  }
  static getAccessToken() {
    const ISSERVER = typeof window === "undefined";

    if (!ISSERVER) {
      return localStorage.getItem("access_token");
    } else {
      return null;
    }
  }
  static getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  static clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_token");
    localStorage.removeItem("customer_wishlist");
    localStorage.removeItem("customer_cart_items");
    localStorage.removeItem("cartRef");
    localStorage.removeItem("CART_ID");
    localStorage.removeItem("hashToken");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("accessToken");
  }
  static getCartRef() {
    let cartRef = localStorage.getItem("cartRef");
    if (cartRef == undefined) {
      const uid = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      };
      cartRef = uid();
      localStorage.setItem("cartRef", cartRef);
    }
    return cartRef;
  }

  static setRecentItem(id) {
    let recent_items = this.getRecentItems();
    console.log(recent_items)
    if(recent_items?.length>7){
      recent_items.slice(0,1)
    }
    if(recent_items.includes(id) == false){
      recent_items.push(id);
      localStorage.setItem("recent_items", JSON.stringify(recent_items));
    }  
  }
  static getRecentItems() {
    let data = localStorage.getItem("recent_items");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  static clearRecentItems(){
    localStorage.removeItem("recent_items");
  }
}
export default LocalStorageService;
