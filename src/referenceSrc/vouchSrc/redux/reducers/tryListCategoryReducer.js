import { TRY_LIST_CATEGORY_ID } from "../actionTypes";
/**
* @description:This TryListCategoryReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

const initialState = {
    tryListCategoryId: 0
};

//This is TryListCategoryReducer Method which take two parameters one initial state and second is action
const TryListCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRY_LIST_CATEGORY_ID:
            const returnable = {
                ...state,
                tryListCategoryId: action.tryListCategoryId
            };
            return returnable;
        default:
            return state;
    }
};

export default TryListCategoryReducer;
