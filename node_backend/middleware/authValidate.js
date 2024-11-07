require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      const result = {
        success: false,
        message: "Authorization key",
      };
      res.json(result);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        const result = {
          success: false,
          message: err,
        };
        res.json(result);
      }
    });
    next();
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
};

module.exports = jwtValidate;
