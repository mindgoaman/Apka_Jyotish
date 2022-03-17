import { TRY_LIST_CATEGORY_ID } from "../actionTypes";

/**
* @description:This TryListCategoryAction which return type and payload(data) to reducer to update store which get from api on feedScreen
* @author:Vibhishan
* @created_on:22/02/2021
* @param:Payload(data)
* @return:
* @modified_by:Vibhishan
* @modified_on:22/02/2021
*/

//This is TryListCategoryAction method which take payload as an argument and return type and payload
const TryListCategoryAction = (tryListCategoryId) => {
  return {
    type: TRY_LIST_CATEGORY_ID,
    tryListCategoryId: tryListCategoryId
  };
};

export default TryListCategoryAction;
