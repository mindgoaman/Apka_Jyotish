import { PROFILE_IMAGE } from "../actionTypes";
/**
* @description:This FindContactsReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:05/03/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:05/03/2021
*/

const initialState = [];


//This is FindContactsReducer Method which take two parameters one initial state and second is action
const ProfileImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_IMAGE:
            const returnable = {
                ...state,
                profileImage: action.payload
            };
            return returnable;
        default:
            return state;
    }
};

export default ProfileImageReducer;
