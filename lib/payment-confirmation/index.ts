import Stripe from "stripe";

interface Event {
  bookingId: string;
  chargeToken: any;
  userId: string;
  price: number;
}

export const paymentConfirmation = async (event: Event) => {
  try {
    const stripe = new Stripe(process.env.stripe_api_key as string, {
      apiVersion: "2022-08-01",
      typescript: true,
    });

    const charge = await stripe.charges.capture(event.chargeToken);

    const result = {
      bookingId: event.bookingId,
      amount: charge.amount,
      userId: event.userId,
      status: 200
    };

    return result;

  } catch (error) {
    
    return {
      bookingId: event.bookingId,
      statusMessage: error.message,
      userId: event.userId,
      status: error.code
    };
  }
};
