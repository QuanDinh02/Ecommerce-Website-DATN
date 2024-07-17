"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _sellerServices = _interopRequireDefault(require("../services/sellerServices"));
var _OTPGenerator = _interopRequireDefault(require("../utils/OTPGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
_dotenv["default"].config();
var OTP;
var OTP_LIMIT = 6;
var transporter = _nodemailer["default"].createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
var getProductPagination = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$query, limit, page, category_id, sub_category_id, sort_id, user, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, limit = _req$query.limit, page = _req$query.page, category_id = _req$query.category_id, sub_category_id = _req$query.sub_category_id, sort_id = _req$query.sort_id;
          user = req.user;
          _context.next = 5;
          return _sellerServices["default"].getProductPagination(+user.seller_id, +limit, +page, +category_id, +sub_category_id, +sort_id);
        case 5:
          result = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getProductPagination(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getProductSearch = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, user, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.query.id;
          user = req.user;
          _context2.next = 5;
          return _sellerServices["default"].getProductSearch(+user.seller_id, +id);
        case 5:
          result = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getProductSearch(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getOrderPagination = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$query2, limit, page, status, startDate, endDate, user, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query2 = req.query, limit = _req$query2.limit, page = _req$query2.page, status = _req$query2.status, startDate = _req$query2.startDate, endDate = _req$query2.endDate;
          user = req.user;
          _context3.next = 5;
          return _sellerServices["default"].getOrderPagination(+user.seller_id, +limit, +page, +status, startDate, endDate);
        case 5:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getOrderPagination(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getOrderReviewPagination = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$query3, limit, page, startDate, endDate, user, result;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query3 = req.query, limit = _req$query3.limit, page = _req$query3.page, startDate = _req$query3.startDate, endDate = _req$query3.endDate;
          user = req.user;
          _context4.next = 5;
          return _sellerServices["default"].getOrderReviewPagination(+user.seller_id, +limit, +page, startDate, endDate);
        case 5:
          result = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function getOrderReviewPagination(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getOrderReviewSearch = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user, id, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user = req.user;
          id = req.query.id;
          _context5.next = 5;
          return _sellerServices["default"].getOrderReviewSearch(+user.seller_id, +id);
        case 5:
          result = _context5.sent;
          return _context5.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function getOrderReviewSearch(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var createNewProduct = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body, name, summary, quantity, currentPrice, price, sub_category_id, user, data, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body = req.body, name = _req$body.name, summary = _req$body.summary, quantity = _req$body.quantity, currentPrice = _req$body.currentPrice, price = _req$body.price, sub_category_id = _req$body.sub_category_id;
          user = req.user;
          data = {
            name: name,
            summary: summary,
            seller_id: +user.seller_id,
            quantity: +quantity,
            currentPrice: +currentPrice,
            price: +price,
            sub_category_id: +sub_category_id
          };
          _context6.next = 6;
          return _sellerServices["default"].createNewProduct(data, req.file);
        case 6:
          result = _context6.sent;
          return _context6.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function createNewProduct(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var updateProduct = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body2, id, name, summary, quantity, currentPrice, price, sub_category_id, user, data, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body2 = req.body, id = _req$body2.id, name = _req$body2.name, summary = _req$body2.summary, quantity = _req$body2.quantity, currentPrice = _req$body2.currentPrice, price = _req$body2.price, sub_category_id = _req$body2.sub_category_id;
          user = req.user;
          data = {
            id: id,
            name: name,
            summary: summary,
            seller_id: +user.seller_id,
            quantity: +quantity,
            currentPrice: +currentPrice,
            price: +price,
            sub_category_id: +sub_category_id
          };
          _context7.next = 6;
          return _sellerServices["default"].updateProduct(data);
        case 6:
          result = _context7.sent;
          return _context7.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function updateProduct(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteProduct = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          _context8.next = 4;
          return _sellerServices["default"].deleteProduct(id);
        case 4:
          result = _context8.sent;
          return _context8.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function deleteProduct(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getCategoryList = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _sellerServices["default"].getAllCategories();
        case 3:
          result = _context9.sent;
          return _context9.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function getCategoryList(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var getSubCategoryList = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var category_id, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          category_id = req.params.category_id;
          _context10.next = 4;
          return _sellerServices["default"].getSubCategoriesByCategory(category_id);
        case 4:
          result = _context10.sent;
          return _context10.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function getSubCategoryList(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var sendVertificatedCode = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var data, email_res, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          data = req.body;
          OTP = (0, _OTPGenerator["default"])(OTP_LIMIT);
          _context11.next = 5;
          return transporter.sendMail({
            from: '"FoxMart "',
            // sender address
            to: "".concat(data.email),
            // list of receivers
            subject: "FoxMart Ecommerce Verification Code",
            // Subject line
            html: "\n            <p font-size: 16px;\">Hi,</p>\n            <p font-size: 16px;\">Here is the OTP code to verify your account: </p>\n            <p><strong style=\"font-size: 20px\">".concat(OTP, "</strong></p>\n            <p font-size: 16px;\">The code will expired in 10 minutes</p>")
          });
        case 5:
          email_res = _context11.sent;
          if (!email_res) {
            _context11.next = 12;
            break;
          }
          _context11.next = 9;
          return _sellerServices["default"].handleCreateVertificationCode({
            code: OTP,
            email: data.email
          });
        case 9:
          result = _context11.sent;
          if (!(result && result.EC === 0)) {
            _context11.next = 12;
            break;
          }
          return _context11.abrupt("return", res.status(200).json({
            EC: 0,
            DT: '',
            EM: "Send OTP code successfully !"
          }));
        case 12:
          _context11.next = 18;
          break;
        case 14:
          _context11.prev = 14;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 18:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 14]]);
  }));
  return function sendVertificatedCode(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var handleCodeVertification = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var data, result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          data = req.body;
          _context12.next = 4;
          return _sellerServices["default"].handleOTPVertification(data);
        case 4:
          result = _context12.sent;
          if (!result) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context12.next = 13;
          break;
        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 9]]);
  }));
  return function handleCodeVertification(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var getSellerInfo = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var user, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          user = req.user;
          _context13.next = 4;
          return _sellerServices["default"].getSellerInfo(+user.seller_id);
        case 4:
          result = _context13.sent;
          if (!result) {
            _context13.next = 7;
            break;
          }
          return _context13.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context13.next = 13;
          break;
        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 9]]);
  }));
  return function getSellerInfo(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var getSellerShopInfo = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var user, result;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          user = req.user;
          _context14.next = 4;
          return _sellerServices["default"].getSellerShopInfo(+user.seller_id);
        case 4:
          result = _context14.sent;
          if (!result) {
            _context14.next = 7;
            break;
          }
          return _context14.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context14.next = 13;
          break;
        case 9:
          _context14.prev = 9;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          return _context14.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 9]]);
  }));
  return function getSellerShopInfo(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var confirmCustomerOrder = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$body3, id, packing, result;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body3 = req.body, id = _req$body3.id, packing = _req$body3.packing;
          _context15.next = 4;
          return _sellerServices["default"].confirmCustomerOrder(+id, packing);
        case 4:
          result = _context15.sent;
          if (!result) {
            _context15.next = 7;
            break;
          }
          return _context15.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context15.next = 13;
          break;
        case 9:
          _context15.prev = 9;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          return _context15.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 9]]);
  }));
  return function confirmCustomerOrder(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
var packingCustomerOrder = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          id = req.body.id;
          _context16.next = 4;
          return _sellerServices["default"].packingCustomerOrder(+id);
        case 4:
          result = _context16.sent;
          if (!result) {
            _context16.next = 7;
            break;
          }
          return _context16.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context16.next = 13;
          break;
        case 9:
          _context16.prev = 9;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 9]]);
  }));
  return function packingCustomerOrder(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
var updateSellerInfo = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var user, data, result;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          user = req.user;
          data = _objectSpread(_objectSpread({}, req.body), {}, {
            id: +user.seller_id
          });
          _context17.next = 5;
          return _sellerServices["default"].updateSellerInfo(data, req.file);
        case 5:
          result = _context17.sent;
          if (!result) {
            _context17.next = 8;
            break;
          }
          return _context17.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context17.next = 14;
          break;
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);
          return _context17.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 10]]);
  }));
  return function updateSellerInfo(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
var updateShopInfo = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var user, data, result;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          user = req.user;
          data = _objectSpread(_objectSpread({}, req.body), {}, {
            id: +user.seller_id
          });
          _context18.next = 5;
          return _sellerServices["default"].updateShopInfo(data, req.file);
        case 5:
          result = _context18.sent;
          if (!result) {
            _context18.next = 8;
            break;
          }
          return _context18.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context18.next = 14;
          break;
        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](0);
          console.log(_context18.t0);
          return _context18.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 10]]);
  }));
  return function updateShopInfo(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var getOrderDetail = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          id = req.query.id;
          _context19.next = 4;
          return _sellerServices["default"].getOrderDetail(+id);
        case 4:
          result = _context19.sent;
          if (!result) {
            _context19.next = 7;
            break;
          }
          return _context19.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context19.next = 13;
          break;
        case 9:
          _context19.prev = 9;
          _context19.t0 = _context19["catch"](0);
          console.log(_context19.t0);
          return _context19.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 9]]);
  }));
  return function getOrderDetail(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
var getShopCategory = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var user, result;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          user = req.user;
          _context20.next = 4;
          return _sellerServices["default"].getShopCategory(+user.seller_id);
        case 4:
          result = _context20.sent;
          if (!result) {
            _context20.next = 7;
            break;
          }
          return _context20.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context20.next = 13;
          break;
        case 9:
          _context20.prev = 9;
          _context20.t0 = _context20["catch"](0);
          console.log(_context20.t0);
          return _context20.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 9]]);
  }));
  return function getShopCategory(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();
var getShopCategoryDetailExist = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var _req$query4, id, limit, page, result;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _req$query4 = req.query, id = _req$query4.id, limit = _req$query4.limit, page = _req$query4.page;
          _context21.next = 4;
          return _sellerServices["default"].getShopCategoryDetailExist(+id, +limit, +page);
        case 4:
          result = _context21.sent;
          if (!result) {
            _context21.next = 7;
            break;
          }
          return _context21.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context21.next = 13;
          break;
        case 9:
          _context21.prev = 9;
          _context21.t0 = _context21["catch"](0);
          console.log(_context21.t0);
          return _context21.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 9]]);
  }));
  return function getShopCategoryDetailExist(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
var getShopCategoryDetailNotExist = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var user, _req$query5, limit, page, category_id, sub_category_id, result;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          user = req.user;
          _req$query5 = req.query, limit = _req$query5.limit, page = _req$query5.page, category_id = _req$query5.category_id, sub_category_id = _req$query5.sub_category_id;
          _context22.next = 5;
          return _sellerServices["default"].getShopCategoryDetailNotExist(+user.seller_id, +limit, +page, +category_id, +sub_category_id);
        case 5:
          result = _context22.sent;
          if (!result) {
            _context22.next = 8;
            break;
          }
          return _context22.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context22.next = 14;
          break;
        case 10:
          _context22.prev = 10;
          _context22.t0 = _context22["catch"](0);
          console.log(_context22.t0);
          return _context22.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 10]]);
  }));
  return function getShopCategoryDetailNotExist(_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}();
var createShopCategory = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var user, title, result;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          user = req.user;
          title = req.body.title;
          _context23.next = 5;
          return _sellerServices["default"].createShopCategory(+user.seller_id, title);
        case 5:
          result = _context23.sent;
          if (!result) {
            _context23.next = 8;
            break;
          }
          return _context23.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context23.next = 14;
          break;
        case 10:
          _context23.prev = 10;
          _context23.t0 = _context23["catch"](0);
          console.log(_context23.t0);
          return _context23.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 10]]);
  }));
  return function createShopCategory(_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}();
var addProductToCategoryShop = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var _req$body4, product_id, category_id, result;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _req$body4 = req.body, product_id = _req$body4.product_id, category_id = _req$body4.category_id;
          _context24.next = 4;
          return _sellerServices["default"].addProductToCategoryShop(+category_id, +product_id);
        case 4:
          result = _context24.sent;
          if (!result) {
            _context24.next = 7;
            break;
          }
          return _context24.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context24.next = 13;
          break;
        case 9:
          _context24.prev = 9;
          _context24.t0 = _context24["catch"](0);
          console.log(_context24.t0);
          return _context24.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 9]]);
  }));
  return function addProductToCategoryShop(_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}();
var removeProductOutCategoryShop = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          id = req.params.id;
          _context25.next = 4;
          return _sellerServices["default"].removeProductOutCategoryShop(+id);
        case 4:
          result = _context25.sent;
          if (!result) {
            _context25.next = 7;
            break;
          }
          return _context25.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context25.next = 13;
          break;
        case 9:
          _context25.prev = 9;
          _context25.t0 = _context25["catch"](0);
          console.log(_context25.t0);
          return _context25.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[0, 9]]);
  }));
  return function removeProductOutCategoryShop(_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}();
var editShopCategory = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res) {
    var _req$body5, category_id, title, result;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _req$body5 = req.body, category_id = _req$body5.category_id, title = _req$body5.title;
          _context26.next = 4;
          return _sellerServices["default"].updateShopCategory(+category_id, title);
        case 4:
          result = _context26.sent;
          if (!result) {
            _context26.next = 7;
            break;
          }
          return _context26.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context26.next = 13;
          break;
        case 9:
          _context26.prev = 9;
          _context26.t0 = _context26["catch"](0);
          console.log(_context26.t0);
          return _context26.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[0, 9]]);
  }));
  return function editShopCategory(_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}();
var removeShopCategory = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          id = req.params.id;
          _context27.next = 4;
          return _sellerServices["default"].deleteShopCategory(+id);
        case 4:
          result = _context27.sent;
          if (!result) {
            _context27.next = 7;
            break;
          }
          return _context27.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context27.next = 13;
          break;
        case 9:
          _context27.prev = 9;
          _context27.t0 = _context27["catch"](0);
          console.log(_context27.t0);
          return _context27.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context27.stop();
      }
    }, _callee27, null, [[0, 9]]);
  }));
  return function removeShopCategory(_x53, _x54) {
    return _ref27.apply(this, arguments);
  };
}();
var getDashboardData = /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res) {
    var user, result;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          user = req.user;
          _context28.next = 4;
          return _sellerServices["default"].getDashboardData(+user.seller_id);
        case 4:
          result = _context28.sent;
          if (!result) {
            _context28.next = 7;
            break;
          }
          return _context28.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context28.next = 13;
          break;
        case 9:
          _context28.prev = 9;
          _context28.t0 = _context28["catch"](0);
          console.log(_context28.t0);
          return _context28.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[0, 9]]);
  }));
  return function getDashboardData(_x55, _x56) {
    return _ref28.apply(this, arguments);
  };
}();
var getProductsAnnouncement = /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res) {
    var user, _req$query6, limit, page, type, result;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          user = req.user;
          _req$query6 = req.query, limit = _req$query6.limit, page = _req$query6.page, type = _req$query6.type;
          _context29.next = 5;
          return _sellerServices["default"].getProductsAnnouncement(+user.seller_id, +limit, +page, +type);
        case 5:
          result = _context29.sent;
          if (!result) {
            _context29.next = 8;
            break;
          }
          return _context29.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context29.next = 14;
          break;
        case 10:
          _context29.prev = 10;
          _context29.t0 = _context29["catch"](0);
          console.log(_context29.t0);
          return _context29.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context29.stop();
      }
    }, _callee29, null, [[0, 10]]);
  }));
  return function getProductsAnnouncement(_x57, _x58) {
    return _ref29.apply(this, arguments);
  };
}();
var getOrderSearch = /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(req, res) {
    var user, id, result;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          user = req.user;
          id = req.query.id;
          _context30.next = 5;
          return _sellerServices["default"].getOrderSearch(+user.seller_id, +id);
        case 5:
          result = _context30.sent;
          return _context30.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context30.prev = 9;
          _context30.t0 = _context30["catch"](0);
          console.log(_context30.t0);
          return _context30.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context30.stop();
      }
    }, _callee30, null, [[0, 9]]);
  }));
  return function getOrderSearch(_x59, _x60) {
    return _ref30.apply(this, arguments);
  };
}();
var updateProductInventory = /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(req, res) {
    var _req$body6, product_type_id, quantity, result;
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _req$body6 = req.body, product_type_id = _req$body6.product_type_id, quantity = _req$body6.quantity;
          _context31.next = 4;
          return _sellerServices["default"].updateProductInventory(+product_type_id, +quantity);
        case 4:
          result = _context31.sent;
          if (!result) {
            _context31.next = 7;
            break;
          }
          return _context31.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context31.next = 13;
          break;
        case 9:
          _context31.prev = 9;
          _context31.t0 = _context31["catch"](0);
          console.log(_context31.t0);
          return _context31.abrupt("return", res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context31.stop();
      }
    }, _callee31, null, [[0, 9]]);
  }));
  return function updateProductInventory(_x61, _x62) {
    return _ref31.apply(this, arguments);
  };
}();
var getProductInventorySearch = /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(req, res) {
    var id, user, result;
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          id = req.query.id;
          user = req.user;
          _context32.next = 5;
          return _sellerServices["default"].getProductInventorySearch(+user.seller_id, +id);
        case 5:
          result = _context32.sent;
          return _context32.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context32.prev = 9;
          _context32.t0 = _context32["catch"](0);
          console.log(_context32.t0);
          return _context32.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context32.stop();
      }
    }, _callee32, null, [[0, 9]]);
  }));
  return function getProductInventorySearch(_x63, _x64) {
    return _ref32.apply(this, arguments);
  };
}();
var sellerResponseCustomerRating = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(req, res) {
    var user, data, result;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          user = req.user;
          data = req.body;
          _context33.next = 5;
          return _sellerServices["default"].sellerResponseCustomerRating(data, +user.seller_id);
        case 5:
          result = _context33.sent;
          return _context33.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 9:
          _context33.prev = 9;
          _context33.t0 = _context33["catch"](0);
          console.log(_context33.t0);
          return _context33.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context33.stop();
      }
    }, _callee33, null, [[0, 9]]);
  }));
  return function sellerResponseCustomerRating(_x65, _x66) {
    return _ref33.apply(this, arguments);
  };
}();
module.exports = {
  getProductPagination: getProductPagination,
  createNewProduct: createNewProduct,
  deleteProduct: deleteProduct,
  getCategoryList: getCategoryList,
  getSubCategoryList: getSubCategoryList,
  updateProduct: updateProduct,
  sendVertificatedCode: sendVertificatedCode,
  handleCodeVertification: handleCodeVertification,
  getSellerInfo: getSellerInfo,
  updateSellerInfo: updateSellerInfo,
  getOrderPagination: getOrderPagination,
  getOrderDetail: getOrderDetail,
  confirmCustomerOrder: confirmCustomerOrder,
  packingCustomerOrder: packingCustomerOrder,
  getShopCategory: getShopCategory,
  createShopCategory: createShopCategory,
  editShopCategory: editShopCategory,
  removeShopCategory: removeShopCategory,
  getShopCategoryDetailExist: getShopCategoryDetailExist,
  getShopCategoryDetailNotExist: getShopCategoryDetailNotExist,
  addProductToCategoryShop: addProductToCategoryShop,
  removeProductOutCategoryShop: removeProductOutCategoryShop,
  getDashboardData: getDashboardData,
  getOrderSearch: getOrderSearch,
  getProductSearch: getProductSearch,
  getProductsAnnouncement: getProductsAnnouncement,
  updateProductInventory: updateProductInventory,
  getProductInventorySearch: getProductInventorySearch,
  getSellerShopInfo: getSellerShopInfo,
  updateShopInfo: updateShopInfo,
  getOrderReviewPagination: getOrderReviewPagination,
  getOrderReviewSearch: getOrderReviewSearch,
  sellerResponseCustomerRating: sellerResponseCustomerRating
};