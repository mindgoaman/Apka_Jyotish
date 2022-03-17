import NetworkHandler from "../network/network";
import { STRIPE_PAYMENT } from "../utils/apiconfig";

/**************   STRIPE PAYMENT SERVICE       ******************/

const stripePaymentService = async params => {
  try {
    var response = await NetworkHandler(STRIPE_PAYMENT, params, "post");
    return response
  } catch (error) {
    console.log("ERROR:::::::", error);
  }
};

export { stripePaymentService };
