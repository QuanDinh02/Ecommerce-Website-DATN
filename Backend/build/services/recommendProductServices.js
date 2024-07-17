"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var db = require('../models/index.js');
var _require = require("sequelize"),
  Op = _require.Op;
var _ = require("lodash");
require('dotenv').config();
var _require2 = require("@aws-sdk/client-s3"),
  S3Client = _require2.S3Client,
  GetObjectCommand = _require2.GetObjectCommand;
var _require3 = require("@aws-sdk/s3-request-presigner"),
  getSignedUrl = _require3.getSignedUrl;
var bucketName = process.env.BUCKET_NAME;
var bucketRegion = process.env.BUCKET_REGION;
var accessKey = process.env.ACCESS_KEY;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
});
var createRecommendProducts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(customer_id, data) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(">>> create data predict.py : ", data);
          _context.next = 4;
          return db.RecommendProduct.bulkCreate(data);
        case 4:
          _context.next = 6;
          return updateTrainingRecommendItemStatus(+customer_id, 0);
        case 6:
          return _context.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Save recommend products !'
          });
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function createRecommendProducts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var create3SessionRecommendProducts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(customer_id, data) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(">>> create data after3Session.py : ", data);
          _context2.next = 4;
          return db.RecommendThreeSessionProduct.bulkCreate(data);
        case 4:
          _context2.next = 6;
          return updateTraining3SessionRecommendItemStatus(+customer_id, 0);
        case 6:
          return _context2.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Save recommend products !'
          });
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function create3SessionRecommendProducts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createHistoryRecommendItem = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(customer_id) {
    var productList_1, productList_2, productList, history_create_time, history_data, dataFormat, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return db.RecommendProduct.findAll({
            raw: true,
            attributes: ['id', 'product_id'],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          productList_1 = _context3.sent;
          _context3.next = 6;
          return db.RecommendThreeSessionProduct.findAll({
            raw: true,
            attributes: ['id', 'product_id'],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 6:
          productList_2 = _context3.sent;
          productList = [].concat(_toConsumableArray(_.cloneDeep(productList_2)), _toConsumableArray(_.cloneDeep(productList_1)));
          if (!(productList && productList.length > 0)) {
            _context3.next = 24;
            break;
          }
          history_create_time = new Date();
          history_data = productList.map(function (item) {
            return {
              product_id: +item.product_id,
              customerID: +customer_id,
              createdAt: history_create_time
            };
          });
          dataFormat = history_data.filter(function (item) {
            return item.product_id !== 0;
          });
          _context3.next = 14;
          return db.HistoryRecommendProduct.bulkCreate(dataFormat);
        case 14:
          result = _context3.sent;
          if (!result) {
            _context3.next = 23;
            break;
          }
          _context3.next = 18;
          return db.RecommendProduct.destroy({
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 18:
          _context3.next = 20;
          return db.RecommendThreeSessionProduct.destroy({
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 20:
          return _context3.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Backup recommend item successfully !'
          });
        case 23:
          return _context3.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Backup recommend item failed !'
          });
        case 24:
          return _context3.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Save recommend products !'
          });
        case 27:
          _context3.prev = 27;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 31:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 27]]);
  }));
  return function createHistoryRecommendItem(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var clearHistoryRecommendItem = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(customer_id) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return db.HistoryRecommendProduct.destroy({
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          return _context4.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Clear Backup recommend item successfully !'
          });
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return function clearHistoryRecommendItem(_x6) {
    return _ref4.apply(this, arguments);
  };
}();
var updateTrainingRecommendItemStatus = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(customer_id, status_code) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return db.TrainingWebData.update({
            activePredict: status_code
          }, {
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          return _context5.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Update training customer recommend item status !'
          });
        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function updateTrainingRecommendItemStatus(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
var updateTraining3SessionRecommendItemStatus = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(customer_id, status_code) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return db.TrainingWebData.update({
            activePredict3Session: status_code
          }, {
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          return _context6.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Update training customer recommend item status !'
          });
        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return function updateTraining3SessionRecommendItemStatus(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var getTrainingRecommendItemStatus = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(customer_id) {
    var result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return db.TrainingWebData.findOne({
            raw: true,
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          result = _context7.sent;
          if (!result) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", {
            EC: 0,
            DT: result,
            EM: 'Training customer recommend item status !'
          });
        case 6:
          return _context7.abrupt("return", {
            EC: -1,
            DT: [],
            EM: 'Training customer recommend item is not existed !'
          });
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function getTrainingRecommendItemStatus(_x11) {
    return _ref7.apply(this, arguments);
  };
}();
var getBothRecommendProducts = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(customer_id) {
    var productListRaw_1, productListRaw_2, productListRaw, productListFinal, productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return db.RecommendProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: [{
                model: db.Seller,
                attributes: ['id', 'shopName']
              }, {
                model: db.ProductRating,
                attributes: ['rating']
              }]
            }],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          productListRaw_1 = _context9.sent;
          _context9.next = 6;
          return db.RecommendThreeSessionProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: [{
                model: db.Seller,
                attributes: ['id', 'shopName']
              }, {
                model: db.ProductRating,
                attributes: ['rating']
              }]
            }],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 6:
          productListRaw_2 = _context9.sent;
          productListRaw = [].concat(_toConsumableArray(_.cloneDeep(productListRaw_2)), _toConsumableArray(_.cloneDeep(productListRaw_1)));
          _context9.next = 10;
          return productListRaw.map(function (item) {
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              seller_info: seller_info,
              rating: item.Product.ProductRating.rating
            };
          });
        case 10:
          productListFinal = _context9.sent;
          handleSaveRecommendCount(productListFinal);
          _context9.next = 14;
          return Promise.all(productListFinal.map( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(item) {
              var productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productType = _context8.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context8.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context8.sent;
                    return _context8.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      quantity: productType.quantity
                    }));
                  case 9:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x13) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 14:
          productListFinalWithImage = _context9.sent;
          return _context9.abrupt("return", {
            EC: 0,
            DT: {
              product_list: productListFinalWithImage
            },
            EM: 'Get recommend products from 2 training !'
          });
        case 18:
          _context9.prev = 18;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 22:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 18]]);
  }));
  return function getBothRecommendProducts(_x12) {
    return _ref8.apply(this, arguments);
  };
}();
var getRecommendProducts = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(customer_id) {
    var productListRaw, productListFinal, productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return db.RecommendProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: [{
                model: db.Seller,
                attributes: ['id', 'shopName']
              }, {
                model: db.ProductRating,
                attributes: ['rating']
              }]
            }],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          productListRaw = _context11.sent;
          _context11.next = 6;
          return productListRaw.map(function (item) {
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              seller_info: seller_info,
              rating: item.Product.ProductRating.rating
            };
          });
        case 6:
          productListFinal = _context11.sent;
          handleSaveRecommendCount(productListFinal);
          _context11.next = 10;
          return Promise.all(productListFinal.map( /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(item) {
              var productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productType = _context10.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context10.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context10.sent;
                    return _context10.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      quantity: productType.quantity
                    }));
                  case 9:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x15) {
              return _ref11.apply(this, arguments);
            };
          }()));
        case 10:
          productListFinalWithImage = _context11.sent;
          return _context11.abrupt("return", {
            EC: 0,
            DT: {
              product_list: productListFinalWithImage
            },
            EM: 'Get recommend products from training predict !'
          });
        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 18:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function getRecommendProducts(_x14) {
    return _ref10.apply(this, arguments);
  };
}();
var get3SessionRecommendProducts = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(customer_id) {
    var productListRaw, productListFinal, productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return db.RecommendThreeSessionProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: [{
                model: db.Seller,
                attributes: ['id', 'shopName']
              }, {
                model: db.ProductRating,
                attributes: ['rating']
              }]
            }],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          productListRaw = _context13.sent;
          _context13.next = 6;
          return productListRaw.map(function (item) {
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              seller_info: seller_info,
              rating: item.Product.ProductRating.rating
            };
          });
        case 6:
          productListFinal = _context13.sent;
          handleSaveRecommendCount(productListFinal);
          _context13.next = 10;
          return Promise.all(productListFinal.map( /*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(item) {
              var productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.next = 2;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productType = _context12.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context12.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context12.sent;
                    return _context12.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      quantity: productType.quantity
                    }));
                  case 9:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            return function (_x17) {
              return _ref13.apply(this, arguments);
            };
          }()));
        case 10:
          productListFinalWithImage = _context13.sent;
          return _context13.abrupt("return", {
            EC: 0,
            DT: {
              product_list: productListFinalWithImage
            },
            EM: 'Get recommend products from training predict 3 session !'
          });
        case 14:
          _context13.prev = 14;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 18:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 14]]);
  }));
  return function get3SessionRecommendProducts(_x16) {
    return _ref12.apply(this, arguments);
  };
}();
var getHistoryRecommendProducts = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(customer_id) {
    var productListRaw, productListFinal, arrayOfObjAfter, productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return db.HistoryRecommendProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: [{
                model: db.Seller,
                attributes: ['id', 'shopName']
              }, {
                model: db.ProductRating,
                attributes: ['rating']
              }]
            }],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          productListRaw = _context15.sent;
          _context15.next = 6;
          return productListRaw.map(function (item) {
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              seller_info: seller_info,
              rating: item.Product.ProductRating.rating
            };
          });
        case 6:
          productListFinal = _context15.sent;
          handleSaveRecommendCount(productListFinal);
          arrayOfObjAfter = _.map(_.uniq(_.map(productListFinal, function (obj) {
            return JSON.stringify(obj);
          })), function (obj) {
            return JSON.parse(obj);
          });
          _context15.next = 11;
          return Promise.all(arrayOfObjAfter.map( /*#__PURE__*/function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(item) {
              var productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.next = 2;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productType = _context14.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context14.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context14.sent;
                    return _context14.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      quantity: productType.quantity
                    }));
                  case 9:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14);
            }));
            return function (_x19) {
              return _ref15.apply(this, arguments);
            };
          }()));
        case 11:
          productListFinalWithImage = _context15.sent;
          return _context15.abrupt("return", {
            EC: 0,
            DT: {
              product_list: productListFinalWithImage
            },
            EM: "Recommend data backup !"
          });
        case 15:
          _context15.prev = 15;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          return _context15.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 19:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 15]]);
  }));
  return function getHistoryRecommendProducts(_x18) {
    return _ref14.apply(this, arguments);
  };
}();
var getRelevantRecommendProducts = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(item_id) {
    var relevant_product_list, productList, productFinal;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return db.SimItem.findAll({
            raw: true,
            attributes: ['id', 'item_rec'],
            where: {
              item_id: _defineProperty({}, Op.eq, item_id)
            }
          });
        case 3:
          relevant_product_list = _context17.sent;
          handleSaveRelevantItemRecommendCount(relevant_product_list);
          _context17.next = 7;
          return Promise.all(relevant_product_list.map( /*#__PURE__*/function () {
            var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(item) {
              var productExist, productInfo, seller_info, productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                while (1) switch (_context16.prev = _context16.next) {
                  case 0:
                    _context16.next = 2;
                    return db.Product.findOne({
                      raw: true,
                      attributes: ['id'],
                      where: {
                        id: _defineProperty({}, Op.eq, item.item_rec)
                      }
                    });
                  case 2:
                    productExist = _context16.sent;
                    if (!productExist) {
                      _context16.next = 19;
                      break;
                    }
                    _context16.next = 6;
                    return db.Product.findOne({
                      raw: true,
                      nest: true,
                      attributes: ['id', 'name', 'summary', 'shop_id'],
                      include: [{
                        model: db.Seller,
                        attributes: ['id', 'shopName']
                      }, {
                        model: db.ProductRating,
                        attributes: ['rating']
                      }],
                      where: {
                        id: _defineProperty({}, Op.eq, item.item_rec)
                      }
                    });
                  case 6:
                    productInfo = _context16.sent;
                    seller_info = {
                      id: productInfo.Seller.id,
                      name: productInfo.Seller.shopName
                    };
                    _context16.next = 10;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.item_rec)
                      }
                    });
                  case 10:
                    productType = _context16.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.item_rec, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context16.next = 15;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 15:
                    url = _context16.sent;
                    return _context16.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      seller_info: seller_info,
                      summary: productInfo.summary,
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      rating: productInfo.ProductRating.rating,
                      quantity: productType.quantity
                    });
                  case 19:
                    return _context16.abrupt("return", null);
                  case 20:
                  case "end":
                    return _context16.stop();
                }
              }, _callee16);
            }));
            return function (_x21) {
              return _ref17.apply(this, arguments);
            };
          }()));
        case 7:
          productList = _context17.sent;
          productFinal = productList.filter(function (item) {
            return item !== null;
          });
          return _context17.abrupt("return", {
            EC: 0,
            DT: {
              product_list: productFinal
            },
            EM: "Recommend relevant products !"
          });
        case 12:
          _context17.prev = 12;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);
          return _context17.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 16:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 12]]);
  }));
  return function getRelevantRecommendProducts(_x20) {
    return _ref16.apply(this, arguments);
  };
}();
var handleSaveRecommendCount = function handleSaveRecommendCount(product_list) {
  try {
    product_list.map(function (product) {
      db.ProductTracking.increment({
        recommend: 1
      }, {
        where: {
          productID: product.id
        }
      });
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
var handleSaveRelevantItemRecommendCount = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(product_list) {
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return Promise.all(product_list.map( /*#__PURE__*/function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(product) {
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.next = 2;
                    return db.ProductTracking.increment({
                      recommend: 1
                    }, {
                      where: {
                        productID: product.item_rec
                      }
                    });
                  case 2:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18);
            }));
            return function (_x23) {
              return _ref19.apply(this, arguments);
            };
          }()));
        case 3:
          _context19.next = 9;
          break;
        case 5:
          _context19.prev = 5;
          _context19.t0 = _context19["catch"](0);
          console.log(_context19.t0);
          return _context19.abrupt("return", null);
        case 9:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 5]]);
  }));
  return function handleSaveRelevantItemRecommendCount(_x22) {
    return _ref18.apply(this, arguments);
  };
}();
module.exports = {
  createRecommendProducts: createRecommendProducts,
  getTrainingRecommendItemStatus: getTrainingRecommendItemStatus,
  updateTrainingRecommendItemStatus: updateTrainingRecommendItemStatus,
  getHistoryRecommendProducts: getHistoryRecommendProducts,
  createHistoryRecommendItem: createHistoryRecommendItem,
  create3SessionRecommendProducts: create3SessionRecommendProducts,
  updateTraining3SessionRecommendItemStatus: updateTraining3SessionRecommendItemStatus,
  getRecommendProducts: getRecommendProducts,
  get3SessionRecommendProducts: get3SessionRecommendProducts,
  getBothRecommendProducts: getBothRecommendProducts,
  clearHistoryRecommendItem: clearHistoryRecommendItem,
  getRelevantRecommendProducts: getRelevantRecommendProducts
};