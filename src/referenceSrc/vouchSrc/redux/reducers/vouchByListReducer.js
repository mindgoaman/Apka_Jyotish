import { GET_VOUCH_BY_LIST } from "../actionTypes";

/**
* @description:This VouchByListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:26/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:26/02/2021
*/

const initialState = [];

//This is VouchByListReducer Method which take two parameters one initial state and second is action
const VouchByListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VOUCH_BY_LIST:
      const returnable = {
        ...state,
        getVouchByListData: action.getVouchByList
      };
      return returnable;
    default:
      return state;
  }
};

export default VouchByListReducer;
