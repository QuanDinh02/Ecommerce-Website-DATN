"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var nonSecurePaths = ['/', '/login', '/register', '/logout'];
var createToken = function createToken(payload) {
  var token = null;
  try {
    var key = process.env.JWT_SECRET;
    token = _jsonwebtoken["default"].sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRE
    });
  } catch (error) {
    console.log(error);
    return null;
  }
  return token;
};
var verifyToken = function verifyToken(token) {
  var data = null;
  var key = process.env.JWT_SECRET;
  try {
    var decoded = _jsonwebtoken["default"].verify(token, key);
    data = decoded;
  } catch (error) {
    //console.log(error)
  }
  return data;
};
var checkUserJWT = function checkUserJWT(req, res, next) {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  var cookies = req.cookies;
  if (cookies && cookies.jwt) {
    var decoded = verifyToken(cookies.jwt);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: {},
        EM: "The user is unauthenticated !"
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: {},
      EM: "The user is unauthenticated !"
    });
  }
};
module.exports = {
  createToken: createToken,
  verifyToken: verifyToken,
  checkUserJWT: checkUserJWT
};