import NetworkHandler from "../network/network";
import { SUBSCRIBERS_LIST } from "../utils/apiconfig";

const getSubscriberListService = async params => {
  try {
    var response = await NetworkHandler(SUBSCRIBERS_LIST, params, "get");
    const {
      caravan,
      subscribers,
      page_data: { current_page, last_page }
    } = response.data;

    const canFetchMore = current_page !== last_page;
    return {
      Caravan: caravan,
      Subscribers: subscribers,
      canFetchMore
    };
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export { getSubscriberListService };
