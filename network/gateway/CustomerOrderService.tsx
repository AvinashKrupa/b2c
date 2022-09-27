import API from "../../app/constants/APIEndpoints";
import constants from "../../app/constants/constant";
import { HTTPBaseService } from "../HTTPBaseService";
import Toast from "../../utils/Toast";
import LocalStorageService from "../../utils/storage/LocalStorageService";
export class CustomerOrderService extends HTTPBaseService {
  private static classInstance?: CustomerOrderService;
  constructor(token: string) {
    super(constants.baseURL, token);
  }

  public static getInstance(token?: string) {
    if (!this.classInstance) {
      this.classInstance = new CustomerOrderService(token ?? "");
    }
    return this.classInstance;
  }

  public getCustomerOrder = () => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .get(API.GET_CUSTOMER_ORDER)
        .then((response) => {
          if (response.status == 200) {
            let message = response.data.msg ?? "";
            //Toast.showSuccess(message);
            resolve(response);
          } else {
            let message = response.data.msg ?? "";
            Toast.showError(message);
            reject(response);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          Toast.showError(error.message);

          reject(error);
        });
    });
  };

  public cancelOrder = (id: any, data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .put(API.ORDER + "/" + id, data)
        .then((response) => {
          if (response.status == 200) {
            let message = response.data.msg ?? "";
            //Toast.showSuccess(message);
            resolve(response);
          } else {
            let message = response.data.msg ?? "";
            Toast.showError(message);
            reject(response);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public createCODPayment = (id: any, data: any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .post(API.ORDERS + "/" + id+ "/payments", data)
        .then((response) => {
          if (response.status == 200) {
            resolve(response);
          } else {
            let message = response.data.msg ?? "";
            Toast.showError(message);
            reject(response);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          Toast.showError(error.message);
          reject(error);
        });
    });
  };

  public getOrderItems = (id:any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .get(API.GET_ORDER_ITEMS+ "/" + id)
        .then((response) => {
          if (response.status == 200) {
            let message = response.data.msg ?? "";
            //Toast.showSuccess(message);
            resolve(response);
          } else {
            let message = response.data.msg ?? "";
            Toast.showError(message);
            reject(response);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          Toast.showError(error.message);

          reject(error);
        });
    });
  };

  public getOrderDetails = (id:any) => {
    return new Promise((resolve: any, reject: any) => {
      this.instance
        .get(API.ORDERS+ "/" + id)
        .then((response) => {
          if (response.status == 200) {
            let message = response.data.msg ?? "";
            //Toast.showSuccess(message);
            resolve(response);
          } else {
            let message = response.data.msg ?? "";
            Toast.showError(message);
            reject(response);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          Toast.showError(error.message);

          reject(error);
        });
    });
  };
}
