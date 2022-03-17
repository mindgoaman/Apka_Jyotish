import { GET_FOLLOWERS_LIST } from "../actionTypes";

/**
* @description:This FollowesListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:26/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:26/02/2021
*/

const initialState = [];

//This is FollowesListReducer Method which take two parameters one initial state and second is action
const FollowesListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWERS_LIST:
            const returnable = {
                ...state,
                getFollowersListData: action.getFollowersList
            };
            return returnable;
        default:
            return state;
    }
};

export default FollowesListReducer;
