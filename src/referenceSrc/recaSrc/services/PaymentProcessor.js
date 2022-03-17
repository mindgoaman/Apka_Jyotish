import getSubscriptionPlans from "./SubscriptionServices";
import { Platform } from "react-native";
import { CardIOUtilities, CardIOModule } from "react-native-awesome-card-io";
import { localization } from "../utils/localization";
import Stripe from "react-native-stripe-api";
import { stripePaymentService } from "./subscriptionService";

function PaymentProcessor() {
  //private vars
  let stripeClient = new Stripe(localization.STRIPE_PUBLISH_KEY);

  //public methods
  this.fetchSilverPlan = async () => {
    const plans = await getSubscriptionPlans({});
    const silverPlan = plans.find(item => {
      return item;
    });
    if (!silverPlan) {
      throw new Error("Couldn't find the appropriate payment plan.");
    }
    return silverPlan;
  };

  this.processSponsorship = async (caravanID, scheduleDate, userEmail) => {
    /*
            1. Fetch plans
            2. Determin cost of silver plan.
            3. Initialize stripe SDK.
            4. Collect payment from stripe SDK for silver plan and caravan ID.
            5. Observe status.
            6. Record sponsorship if everything is successful.
        */

    const silverPlan = await this.fetchSilverPlan();
    const cardToken = await processPaymentMethod();

    const parameters = {
      stripe_token_id: cardToken,
      email: userEmail,
      plan_id: silverPlan.id,
      caravan_id: caravanID,
      caravan_schedule_date: scheduleDate
    };

    console.log("Hitting payments using params", parameters);

    const response = await stripePaymentService(parameters);

    if (response) {
      if (response.success) {
        return {
          success: true,
          message: "Your sponsorship has been recorded"
        };
      } else {
        const { message } = response;
        throw new Error(
          message || "We encountered an error while processing your sponsorship"
        );
      }
    } else {
      throw new Error("Null response encountered");
    }
  };

  //Private members
  let processPaymentMethod = async () => {
    try {
      const card = await objtainCardInfo();
      const cardToken = await tokenizeCard(card);
      return cardToken;
    } catch (error) {
      throw error;
    }
  };

  let preloadCardUtilities = () => {
    if (Platform.OS === "ios") {
      CardIOUtilities.preload();
    }
  };

  let objtainCardInfo = async () => {
    preloadCardUtilities();
    try {
      const card = await CardIOModule.scanCard({ hideCardIOLogo: true });
      return card;
    } catch (error) {
      throw error;
    }
  };

  let tokenizeCard = async ({
    cardNumber,
    cvv,
    expiryMonth,
    expiryYear,
    postalCode
  }) => {
    try {
      const token = await stripeClient.createToken({
        number: cardNumber,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        cvc: cvv,
        address_zip: postalCode ? postalCode : ""
      });
      const { id, error } = token;
      if (!error && id.trim().length > 0) {
        return id;
      } else {
        if (error) {
          throw error;
        } else {
          throw new Error("invalid card token");
        }
      }
      return token;
    } catch (error) {
      throw error;
    }
  };
}

export default PaymentProcessor;
