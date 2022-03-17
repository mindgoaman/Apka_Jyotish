import NetworkHandler from "../network/network";
import {
  PROPERTY_LIST,
  SPONSORS_LIST,
  ADD_NEW_PROPERTY,
  UPLOAD_PROPERTY_IMAGE,
  VIEW_SHORTLISTED_PROPERTIES,
  TOGGLE_SHORTLIST_PROPERTIES,
  VIEW_FAV_PROPERTIES,
  PROPERTY_DETAIL,
  ADD_NOTE,
  DELETE_NOTE,
  SUBSCRIBED_CARAVAN,
  THIRTY_DAYS_PROP_HISTORY,
  THIRTY_DAYS_SPONSORS
} from "../utils/apiconfig";

//Add New Property
const addNewPropertyService = async params => {
 
  try {
    var response = await NetworkHandler(ADD_NEW_PROPERTY, params, "post");
  
    return response;
   
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const uploadPropertyImagesService = async params => {
  try {
    var response = await NetworkHandler(UPLOAD_PROPERTY_IMAGE, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

// Property List
const getPropertyListService = async params => {
  const propertyListUrl = params.isViewProperty == false ? THIRTY_DAYS_PROP_HISTORY : PROPERTY_LIST
  try {
    var response = await NetworkHandler(propertyListUrl, params, "post");
    const {
      properties,
      page_data: { current_page, last_page }
    } = response.data;
console.log('ReS:::::',response)
    const canFetchMore = current_page !== last_page;
    return {
      Properties: properties,
      canFetchMore
    };
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const getSponsorListService = async params => {
  let finalUrl = params.isViewProperty == true ? SPONSORS_LIST : THIRTY_DAYS_SPONSORS
  try {
    var response = await NetworkHandler(finalUrl, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::SPO", error);
  }
};

/***************** View Shortlisted Properties *********************/

const viewShortListedProperties = async params => {
  try {
    var response = await NetworkHandler(
      VIEW_SHORTLISTED_PROPERTIES,
      params,
      "get"
    );
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/***************** Toggle Shortlist Properties *********************/

const toggleShortlistPropertiesService = async params => {
  try {
    var response = await NetworkHandler(
      TOGGLE_SHORTLIST_PROPERTIES,
      params,
      "post"
    );
    return response;
  } catch (error) {
    console.log("ERROR:::::::FAv", error);FAV_UNFAV_PROPERTY
  }
};

/***************** View your Favorite Properties *********************/

const viewFavPropertiesService = async params => {
  try {
    var response = await NetworkHandler(VIEW_FAV_PROPERTIES, params, "get");
    const {
      properties,
      page_data: { current_page, last_page }
    } = response.data;

    const canFetchMore = current_page !== last_page;

    return {properties, canFetchMore};
  } catch (error) {
    console.log("FAv:", error);
  }
};

/*****************     Add Note      ****************/
const addNote = async params => {
  try {
    var response = await NetworkHandler(ADD_NOTE, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/*****************  Delete Note ****************/
const deleteNoteService = async params => {
  try {
    var response = await NetworkHandler(DELETE_NOTE, params, "post");
    // console.log("response:::::::", response);
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/***************** get property Detail *********************/
const propertyDetailService = async id => {
  try {
    var response = await NetworkHandler(PROPERTY_DETAIL + id, "", "get");
    // console.log("response:::::::", response);
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/***************** get property History *********************/
const propertyHistoryService = async params => {
  try {
    var response = await NetworkHandler(SUBSCRIBED_CARAVAN, params, "get");
    const {
      subscribedCaravans,
      page_data: { current_page, last_page }
    } = response.data;

    const f = subscribedCaravans.map(item => ({
      id: item.id,
      name: item.name,
      address: item.address,
      zipcode: item.zipcode
    }));
    const canFetchMore = current_page !== last_page;
    return {
      caravans: f,
      canFetchMore
    };
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export {
  getPropertyListService,
  getSponsorListService,
  addNewPropertyService,
  uploadPropertyImagesService,
  viewShortListedProperties,
  toggleShortlistPropertiesService,
  viewFavPropertiesService,
  propertyDetailService,
  addNote,
  deleteNoteService,
  propertyHistoryService
};
