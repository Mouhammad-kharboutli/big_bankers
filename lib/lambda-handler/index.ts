export const preAuthorization = async () => {
  try {
    return { statusCode: 200, body: JSON.stringify("Hello Bankers") };
  } catch (dbError) {
    return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};
