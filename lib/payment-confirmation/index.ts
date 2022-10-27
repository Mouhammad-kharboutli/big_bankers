import Stripe from "stripe";

export const paymentConfirmation = async (event: any) => {
  try {
    const stripe = new Stripe(process.env.stripe_api_key as string, {
      apiVersion: "2022-08-01",
      typescript: true,
    });

    const charge = await stripe.charges.capture(event.token);

    const result = {
      bookingId: "",
      amount: "",
      userId: "",
    };

    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
