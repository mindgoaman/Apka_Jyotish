import { GET_SUGGESTION_LIST } from "../actionTypes";

/**
* @description:This SuggestionListReducer which get two things from action type and payload and after geting the same update the store
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

const initialState = [];

//This is SuggestionListReducer Method which take two parameters one initial state and second is action
const SuggestionListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUGGESTION_LIST:
            const returnable = {
                ...state,
                suggestionListData: action.getSuggestionFeedList
            };
            return returnable;
        default:
            return state;
    }
};

export default SuggestionListReducer
    ;
