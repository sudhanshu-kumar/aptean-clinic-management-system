// Verify Token
const verifyToken = (request, response, next) => {
  // Get auth header value
  const bearerHeader = request.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    request.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    response.sendStatus(403);
  }
}
module.exports = { verifyToken };