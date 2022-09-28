import create from "zustand";
import { devtools } from "zustand/middleware";
import LocalStorageService from "../utils/storage/LocalStorageService";

const useCartStore = create((set) => ({
  count: false,
  cartItems: [],
  updateCartCount: (data: any) => {
    set((state) => ({
      ...state,
      count: false,
    }));
  },
  synchronized: (data: boolean) => {
    set((state) => ({
      count: LocalStorageService.getCartItems()?.length || 0,
      cartItems: LocalStorageService.getCartItems() || [],
    }));
  },
}));
export default useCartStore;
