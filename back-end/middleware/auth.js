import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;  // Get the token from request headers

  

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, login again" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
    req.userId = decodedToken.id;  // Attach user ID to the request object
    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    console.error(error);  // Log the error for debugging
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
