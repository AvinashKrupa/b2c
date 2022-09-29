import create from "zustand";
import { devtools } from "zustand/middleware";
import LocalStorageService from "../utils/storage/LocalStorageService";

const useUserStore = create((set) => ({
  isLogin: false, //LocalStorageService.getAccessToken() ? true : false,
  loginPopup: false,
  userInfo: null,
  setUserInfo: (data: any) => {
    set((state) => ({
      loginPopup: false,
      isLogin: true,
      userInfo: data,
    }));
  },
  removeUserInfo: (data: any) => {
    set((state) => ({
      isLogin: false,
    }));
  },
  showLogin: (data: boolean) => {
    set((state) => ({
      ...state,
      loginPopup: data,
    }));
  },
  synchronized: (data: boolean) => {
    set((state) => ({
      isLogin: LocalStorageService.getAccessToken() ? true : false,
      loginPopup: false,
      userInfo: null,
    }));
  },
}));
export default useUserStore;
