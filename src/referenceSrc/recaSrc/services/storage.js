import AsyncStorage from "@react-native-community/async-storage";

/******************** LOCAL STORAGE FILE  ************************/
class Storage {
  static sharedInstance;

  static shared() {
    if (!Storage.sharedInstance) Storage.sharedInstance = new Storage();
    return Storage.sharedInstance;
  }
   async storeUserInformation(information) {
    try {
        await AsyncStorage.setItem("UserInformation", JSON.stringify(information));
    } catch (error) {
        throw error;
    }
}
  async storeLoginInformation(information) {
    try {
      await AsyncStorage.setItem(
        "LoginInformation",
        JSON.stringify(information)
      );
    } catch (error) {
      throw error;
    }
  }

  async getLoginInformation() {
    const loginInformationString = await AsyncStorage.getItem(
      "LoginInformation"
    );
    if (loginInformationString) {
      let parsed = JSON.parse(loginInformationString);
      return {
        token: parsed.token,
        user: parsed.user
      };
    }
    return undefined;
  }
  
   async getUserInformation(){
    const userInformationString = await AsyncStorage.getItem("UserInformation");
    if (userInformationString) {
        let parsed = JSON.parse(userInformationString);
        return {
            email: parsed.email,
            password: parsed.password,
            shouldRememberUser:parsed.shouldRememberUser
        };
    }
    return undefined;
}
}

export default Storage;
