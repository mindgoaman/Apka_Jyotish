import { GET_FOLLOW_REQUEST_LIST } from "../actionTypes";

/**
* @description:This FollowRequestListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

const initialState = [];

//This is FollowRequestListReducer Method which take two parameters one initial state and second is action
const FollowRequestListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOW_REQUEST_LIST:
            const returnable = {
                ...state,
                followRequestListData: action.getFollowRequestList
            };
            return returnable;
        default:
            return state;
    }
};

export default FollowRequestListReducer
    ;
