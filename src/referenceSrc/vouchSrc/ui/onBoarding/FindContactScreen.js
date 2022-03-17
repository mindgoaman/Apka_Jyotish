import React from 'react';
import FindContacts from "../../ui/settings/FindContacts";
import {View,Text,Platform} from 'react-native';
import { check, PERMISSIONS, openSettings } from "react-native-permissions";

/**
* @description:This is find contact screen while sign up where user can find their contacts who are using vouch
* @author:Vibhishan 
* @created_on
* @param:
* @return:
* @modified_by:Vibhishan
* @modified_on:16/04/2021
*/

class FindContactScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isContactPermission : ""
    }
  }



  render() {
    let {isContactPermission} = this.state;
    return (
        <FindContacts isFromSignUp={true} {...this.props} isContactPermission={isContactPermission}/>
    );
  }
}

export default FindContactScreen