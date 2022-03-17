import { GET_FOLLOWING_LIST } from "../actionTypes";

/**
* @description:This FollowingListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:26/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:26/02/2021
*/

const initialState = [];

//This is FollowingListReducer Method which take two parameters one initial state and second is action
const FollowingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWING_LIST:
            const returnable = {
                ...state,
                getFollowingListData: action.getFollowingList
            };
            return returnable;
        default:
            return state;
    }
};

export default FollowingListReducer;
