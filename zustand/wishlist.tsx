import create from "zustand";
import { devtools } from "zustand/middleware";
import LocalStorageService from "../utils/storage/LocalStorageService";

const useWishlistStore = create((set) => ({
  count: 0,
  wishlistItems: [],
  updateCartCount: (data: any) => {
    set((state) => ({
      ...state,
      count: false,
    }));
  },

  synchronized: (data: boolean) => {
    set((state) => ({
      count: LocalStorageService.getWishlist()?.length || 0,
      wishlistItems: LocalStorageService.getWishlist() || [],
    }));
  },
}));
export default useWishlistStore;
