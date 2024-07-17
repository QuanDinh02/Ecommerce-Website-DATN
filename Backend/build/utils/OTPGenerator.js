"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var generateOTP = function generateOTP(limit) {
  var digits = '0123456789';
  var OTP = '';
  for (var i = 0; i < limit; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
var _default = exports["default"] = generateOTP;