import { createAppContainer, createStackNavigator } from "react-navigation";

import {
  loadingcomponent,
  logincomponent,
  forgotpasswordcomponent,
  emailverificationcomponent,
  resetpasswordcomponent,
  registercomponent,
  businessInfocomponent,
  CMSComponent
} from "../utils/component";

const LoadingNavigator = createStackNavigator(
  {
    Loading: loadingcomponent,
    login: logincomponent,
    forgotpassword: forgotpasswordcomponent,
    emailverification: emailverificationcomponent,
    resetpassword: resetpasswordcomponent,
    register: registercomponent,
    businessInfo: businessInfocomponent,
    Terms: CMSComponent,
    Privacy: CMSComponent
  },
  {
    headerMode: "none"
  }
);
const Container = createAppContainer(LoadingNavigator);
export default Container;
