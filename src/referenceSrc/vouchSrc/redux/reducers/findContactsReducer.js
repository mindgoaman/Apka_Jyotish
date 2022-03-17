import { FIND_CONTACT_LIST } from "../actionTypes";
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
const FindContactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_CONTACT_LIST:
            const returnable = {
                ...state,
                findContactListData: action.findContactList
            };
            return returnable;
        default:
            return state;
    }
};

export default FindContactsReducer;
