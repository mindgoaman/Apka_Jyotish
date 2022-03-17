import { createAppContainer, createStackNavigator } from "react-navigation";

import React from "react";
import { RECANavigation } from "../common";
import DashboardComponent from "../modules/home/dashboard.component";
import { menu, backButton, notifications } from "../utils/images";
import CaravanDetailComponent from "../modules/CaravanDetail/CaravanDetail.component";
import CaravanSubscribersListComponent from "../modules/CaravanDetail/caravanSubscribersList.component";
import PropertyListComponent from "../modules/property/propertyList.component";
import AddNewPropertyComponent from "../modules/property/addNewProperty.component";
import CaravanPropertyDetail from "../modules/property/caravanPropertyDetail";
import sponsorsProfile from "../modules/Sponsers Profile/sponsorsProfile";
import NavigatorService from "../utils/NavigatorService";
import SubscriptionPlanComponent from "../modules/Sponship Plans/SubscriptionPlan.component";

const DashboardNavigator = createStackNavigator({
  dashboard: {
    screen: DashboardComponent,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={menu}
          rightIcon={notifications}
          title="RECA"
          onPress={() => {
            NavigatorService.toggleMenu();
          }}
          onRightPress={() => {
            navigation.navigate("notificationDash");
          }}
        />
      )
    })
  },
  propertyDetails: {
    screen: CaravanDetailComponent,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={backButton}
          title={navigation.state.params.title}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    })
  },
  SubscriptionPlan: {
    screen: SubscriptionPlanComponent,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  },
  subscribersList: {
    screen: CaravanSubscribersListComponent,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={backButton}
          title="Subscribers"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    })
  },
  propertyList: {
    screen: PropertyListComponent,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={backButton}
          title="Property Listing"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    })
  },
  caravanPropertyDetails: {
    screen: CaravanPropertyDetail,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  },
  addProperty: {
    screen: AddNewPropertyComponent,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={backButton}
          title="Add New Property"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    })
  },
  viewSponserProfile: {
    screen: sponsorsProfile,
    navigationOptions: ({ navigation, screenProps }) => ({
      header: props => (
        <RECANavigation
          {...props}
          leftIcon={backButton}
          title=""
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    })
  }
});

const Container = createAppContainer(DashboardNavigator);
export default Container;
