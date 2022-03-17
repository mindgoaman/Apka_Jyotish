import { NavigationScreenProp, NavigationState } from "react-navigation";
import { RouteConfig } from "../utils/route_config";
import { userLogoutService } from "../services/userProfileService";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from "./storage";

class NavigatorServices {

  private static shareInstance: NavigatorServices;
  public switchNavigator?: NavigationScreenProp<NavigationState>;
  public static shared(): NavigatorServices {
    if (!NavigatorServices.shareInstance)
      NavigatorServices.shareInstance = new NavigatorServices();
    return NavigatorServices.shareInstance;
  }

  /******************* USR LOGOUT API CALLING ************************/
  public async logout() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    let params = {
      device_id: fcmToken ? fcmToken : ""
    };
    userLogoutService(params)
      .then(response => {
        this.removeUserDefaultsData();
        if (response.success) {
          this.switchNavigator!.navigate(RouteConfig.Loading.Login);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }

    removeUserDefaultsData = async () => {
      await AsyncStorage.removeItem("LoginInformation");
      const userInfo = await Storage.shared().getUserInformation();
      if (userInfo.shouldRememberUser == false) {
        await AsyncStorage.removeItem("UserInformation");
      }
    };
}
 
export default NavigatorServices;
