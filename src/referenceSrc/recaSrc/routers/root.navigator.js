import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import MenuContainerComponent from '../modules/menu/MenuContainer.component'

import LoadingNavigator from "./loading.navigator";
import LoadinComponent from "../modules/loading/loading.component";

const RootNavigator = createSwitchNavigator({
  Loading: LoadingNavigator,
  Landing: LoadinComponent,
  Home: MenuContainerComponent
});
const Container = createAppContainer(RootNavigator);
export default Container;
