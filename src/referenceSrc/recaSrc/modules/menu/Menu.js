import React, { Component } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import Colors from "../../utils/colors";
import {
  home_unselected,
  account,
  profile_pic,
  notifications,
  history,
  contact_us,
  logout,
  tnc,
  not_approved
} from "../../utils/images";
import { RECAText } from "../../common";
import BaseContainer from "../base_container/base.container";
import Storage from "../../services/storage";
import NavigatorService from '../../utils/NavigatorService';

const MENU_DATA = [
  { icon: home_unselected, title: "Home", selected: true, id: 0 },
  { icon: account, title: "My Account", selected: false, id: 1 },
  { icon: notifications, title: "Notifications", selected: false, id: 3 },
  { icon: account, title: "About Us", selected: false, id: 4 },
  { icon: tnc, title: "Terms and Conditions", selected: false, id: 5 },
  { icon: tnc, title: "Privacy Policy", selected: false, id: 6 },
  { icon: contact_us, title: "Contact Us", selected: false, id: 7 },
  { icon: logout, title: "Logout", selected: false, id: 8 }
];

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: MENU_DATA,
      userImage: "",
      userName: "",
      isDrawerOpen: true
    };
  }

  componentDidMount() {
    this.get_userInfo();
    let temp = this.state.data;
            temp.map(i => {
              i.selected = i.id === 0 ? true : false;
            });
            this.setState({ data: temp });
            NavigatorService.updateuserDetailsMenu = (image, name) => {
              this.setState({userImage: image, userName: name })
            };

  }

  // componentDidMount() {
   
  // }
 
  get_userInfo = async () => {
    try {
      const loginInfo = await Storage.shared().getLoginInformation();
      const userData = loginInfo.user;
      const userImage = userData ? userData.image : "";
      const name = userData ? userData.name : "";

      this.setState({
        userImage: userImage
      });
      this.setState({
        userName: name
      });

    } catch (error) {
      console.log(error);
    }
  };

 

  _keyExtractor = (item, index) => item.id.toString();

  _renderHeader = () => {
    return (
      <View
        style={{
          height: 180,
          backgroundColor: Colors.CLEAR,
          justifyContent: "center",
          paddingHorizontal: 20,
          marginTop: 20
        }}
      >
        <View style={{ width: 90, height: 90 }}>
          <Image
            source={
              this.state.userImage != ""
                ? { uri: this.state.userImage }
                : profile_pic
            }
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              position: "absolute",
            }}
          />
          <TouchableOpacity
            style={{ backgroundColor: "transparent", width: 90, height: 90 }}
            onPress={()=>this.props.moveToMyprofile()}
          ></TouchableOpacity>
        </View>

        <RECAText
          style={{
            marginVertical: 5,
            color: Colors.WHITE,
            fontSize: 22,
            fontWeight: "700",
            
          }}
        >
          {this.state.userName}
        </RECAText>
      </View>
    );
  };
  _renderItem = ({ item, index }) => {
    return (
      <BaseContainer
        ref={ref => {
          this.baseContainer = ref;
        }}
      >
        <TouchableOpacity
          onPress={() => {
            let temp = this.state.data;
            temp.map(i => {
              i.selected = i.id === item.id ? true : false;
            });
            this.setState({ data: temp });

            this.props.onPressItem(index);
          }}
          style={{
            backgroundColor: item.selected ? Colors.WHITE : Colors.CLEAR,
            height: 50,
            paddingLeft: 20,
            justifyContent: "center",
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            marginVertical: 5
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={item.icon}
              style={{ tintColor: item.selected ? Colors.PINK : Colors.WHITE }}
            />
            {/* {item.title == "Notifications"?
             <RECAText
              style={{
                marginTop:-22,
                marginLeft:-7,
                color:  Colors.FAILURE ,
                fontSize: 14,
                fontWeight: "400"
              }}
            >
              {"1"}
            </RECAText>
            :null} */}
            <RECAText
              style={{
                marginHorizontal: 12,
                color: item.selected ? Colors.PINK : Colors.WHITE,
                fontSize: 16,
                fontWeight: "400"
              }}
            >
              {item.title}
            </RECAText>
          </View>
        </TouchableOpacity>
      </BaseContainer>
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.CLEAR,
          position: "absolute",
          left: 0,
          height: "100%",
          // width: '90%'
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
            ListHeaderComponent={this._renderHeader}
          />
            <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              width: 45,
              height: 45,
              justifyContent: "flex-end",
              marginTop: 60,
              marginLeft: 50
            }}
            onPress={this.props.dismissmenu}
          >
            <Image
              source={not_approved}
              style={{
                width: 50,
                height: 50,
                position: "absolute",
                tintColor: Colors.WHITE
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Menu;
