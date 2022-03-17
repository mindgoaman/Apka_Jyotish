import NetworkHandler from "../network/network";
import { SUBSCRIPTION_PLANS } from "../utils/apiconfig";

const getSubscriptionPlans = async params => {
    try {
      var response = await NetworkHandler(SUBSCRIPTION_PLANS, params, "get");
      const {
        plans
      } = response.data;
      return plans
    } catch (error) {
      console.log("ERROR:::::::", error);
    }
  };

  export default getSubscriptionPlans 