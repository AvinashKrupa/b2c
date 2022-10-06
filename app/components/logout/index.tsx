import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import useUserStore from "../../../zustand/store";
import LocalStorageService from "../../../utils/storage/LocalStorageService";
import useCartStore from "../../../zustand/cart";
import Permalink from "../../../utils/Permalink";

const Logout = (props: any) => {
  const router = useRouter();
  const isRemoveUserInfo = useUserStore((state: any) => state.removeUserInfo);

  const logout = () => {
    LocalStorageService.clearToken();
    props.setIsShowing(false);
    isRemoveUserInfo(false);
    useCartStore.setState({ count: false, cartItems: [] });
    localStorage.clear();
    router.replace(Permalink.ofHomePage())
  };
  return (
    <Modal show={props.isShowing} animation={false} size={"sm"} id="checkOut">
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={() => {
          props.setIsShowing(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </button>
      <div className="modal-header">
        <h4>
          Logout <i className="fa fa-lock" />
        </h4>
      </div>
      <div className="modal-body"> Are you sure you want to logout?</div>
      <div className="modal-footer">
        <a className="btn btn-danger fs-13 p-2" onClick={()=> (props.setIsShowing(false))}>
          No
        </a>
        <a className="btn fs-13 p-2" onClick={logout}>
          Yes
        </a>
      </div>
    </Modal>
  );
};
export default Logout;
