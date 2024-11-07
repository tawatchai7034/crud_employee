require("dotenv").config();
let express = require("express");
let authRouter = express.Router();
const jwt = require("jsonwebtoken");

const users = [
  { id: 1, name: "John", refresh: null },
  { id: 2, name: "Tom", refresh: null },
  { id: 3, name: "Chris", refresh: null },
  { id: 4, name: "David", refresh: null },
];

const jwtGenerate = (user) => {
  const accessToken = jwt.sign(
    { name: user.name, id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h", algorithm: "HS256" }
  );

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(
    { name: user.name, id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d", algorithm: "HS256" }
  );

  return refreshToken;
};

const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      const result = {
        success: false,
        message: "Authorization key",
      };
      res.json(result);
    }
    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        const result = {
          success: false,
          message: err,
        };
        res.json(result);
      }

      req.user = decoded;
      req.user.token = token;
      delete req.user.exp;
      delete req.user.iat;
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

authRouter.post("/login", (req, res) => {
  try {
    const { name } = req.body;

    //find user
    const user = users.findIndex((e) => e.name === name);

    if (!name || user < 0) {
      return res.send(400);
    }

    const access_token = jwtGenerate(users[user]);
    const refresh_token = jwtRefreshTokenGenerate(users[user]);

    users[user].refresh = refresh_token;

    res.json({
      access_token,
      refresh_token,
    });
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

authRouter.get("/validate", (req, res) => {
  try {
    if (!req.headers["authorization"]) {
      const result = {
        success: false,
        message: "Authorization key",
      };
      res.json(result);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        const result = {
          success: false,
          message: err,
        };
        res.json(result);
      } else {
        const result = {
          success: true,
          message: "Success",
        };
        res.json(result);
      }
    });
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

module.exports = authRouter;
