import jwt from "jsonwebtoken";

const SECRET_KEY = "qwerty123456poiu0987!^@";

export const decode = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }
  const authToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(authToken, SECRET_KEY);
    req.userData = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentification Failed",
      error: error.message,
    });
  }
};
