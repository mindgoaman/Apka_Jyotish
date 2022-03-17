import NetworkHandler from "../network/network";
import {
  CARAVAN_LIST,
  CARAVAN_DETAIL,
  SUBSCRIBE_CARAVAN,
  SUBSCRIBED_CARAVAN,
  SPONSOR_AVAILABLE,
  SPONSOR_CARAVAN,
  GET_UPCOMING_SCHEDULE_DATES
} from "../utils/apiconfig";

// Caravan List
const getCaravanListService = async params => {
  try {
    var response = await NetworkHandler(CARAVAN_LIST, params, "get");
    const {
      caravans,
      page_data: { current_page, last_page }
    } = response.data;
//  alert(response.data)
    const f = caravans.map(item => ({
      id: item.id,
      name: item.name,
      address: item.address,
      zipcode: item.zipcode
    }));
  
    const canFetchMore = current_page !== last_page;
    return {
      caravan: f,
      canFetchMore
    };
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const getSearchedCaravanListService = async params => {
  try {
    var response = await NetworkHandler(CARAVAN_LIST, params, "get");
    const { caravans } = response.data;

    const f = caravans.map(item => ({
      id: item.id,
      name: item.name,
      address: item.address,
      zipcode: item.zipcode
    }));
    return f;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const getCaravanDetailService = async id => {
  try {
    var response = await NetworkHandler(CARAVAN_DETAIL + "/" + id, "", "get");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const subscribeCaravanService = async params => {
  try {
    var response = await NetworkHandler(SUBSCRIBE_CARAVAN, params, "post");

    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/**************************  Subscribed Caravan Service ***************************/
const  subscribedCaravanService = async params => {
  try {
    var response = await NetworkHandler(SUBSCRIBED_CARAVAN, params, "get");
    const {
      subscribedCaravans,
      page_data: { current_page, last_page }
    } = response.data;
    const canFetchMore = current_page !== last_page;
    return { subscribedCaravans, canFetchMore };
  }
   catch (error) {
    console.log("ERROR:::::::", error);
  }
};

const getSponsorsAvailability = async params => {
  try {
    var response = await NetworkHandler(SPONSOR_AVAILABLE,params, "post");
    console.log("RESPONSE:::::::", response);

    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/**************************  SPONSOR A CARAVAN ***************************/
const sponsorCaravanService = async params => {
  try {
    var response = await NetworkHandler(SPONSOR_CARAVAN, params, "post");
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

/**************************  GET UPCOMING CARAVAN SHEDULES ***************************/
const getUpcomingCaravanSchedulesService = async params => {
  try {
    var response = await NetworkHandler(GET_UPCOMING_SCHEDULE_DATES, params, "post");
    // console.log(JSON.stringify(response))
    console.log("RES::::::",response)
    return response;
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export {
  getCaravanListService,
  getSearchedCaravanListService,
  getCaravanDetailService,
  subscribeCaravanService,
  getSponsorsAvailability,
  subscribedCaravanService,
  sponsorCaravanService,
  getUpcomingCaravanSchedulesService
};
