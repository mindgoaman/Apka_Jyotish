import { LOGIN } from "../types/actionTypes";

/**
* @description:This FeedListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:11/04/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:11/04/2021
*/

const initialState = [];

//This is FeedListReducer Method which take two parameters one initial state and second is action
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const returnable = {
        ...state,
        payload: action.payload
      };
      return returnable;
    default:
      return state;
  }
};

export default loginReducer;
