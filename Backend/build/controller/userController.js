"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _LoginRegisterService = _interopRequireDefault(require("../services/LoginRegisterService"));
var _accountServices = _interopRequireDefault(require("../services/accountServices"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _OTPGenerator = _interopRequireDefault(require("../utils/OTPGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var handlebars = _interopRequireWildcard(require("handlebars"));
var fs = _interopRequireWildcard(require("fs"));
var path = _interopRequireWildcard(require("path"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var handleUserLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var data, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          data = req.body;
          _context.next = 4;
          return _LoginRegisterService["default"].userLogin(data);
        case 4:
          result = _context.sent;
          if (!result) {
            _context.next = 8;
            break;
          }
          if (result.DT && result.DT.accessToken) {
            res.cookie("jwt", result.DT.accessToken, {
              httpOnly: true,
              maxAge: +process.env.MAX_AGE_ACCESS_TOKEN,
              sameSite: 'none',
              secure: true
            });
            res.cookie("rjwt", result.DT.refreshToken, {
              httpOnly: true,
              maxAge: +process.env.MAX_AGE_REFRESH_TOKEN,
              sameSite: 'none',
              secure: true
            });
          }
          return _context.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: "",
            EM: result.EM
          }));
        case 8:
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function handleUserLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var handleSystemUserLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var data, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          data = req.body;
          _context2.next = 4;
          return _LoginRegisterService["default"].userSystemLogin(data);
        case 4:
          result = _context2.sent;
          if (!result) {
            _context2.next = 8;
            break;
          }
          if (result.DT && result.DT.accessToken) {
            res.cookie("jwtsys", result.DT.accessToken, {
              httpOnly: true,
              maxAge: +process.env.MAX_AGE_ACCESS_TOKEN,
              sameSite: 'none',
              secure: true
            });
            res.cookie("rjwtsys", result.DT.refreshToken, {
              httpOnly: true,
              maxAge: +process.env.MAX_AGE_REFRESH_TOKEN,
              sameSite: 'none',
              secure: true
            });
          }
          return _context2.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: "",
            EM: result.EM
          }));
        case 8:
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function handleSystemUserLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var handleUserRegister = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var data, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          data = req.body;
          _context3.next = 4;
          return _LoginRegisterService["default"].userRegister(data);
        case 4:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function handleUserRegister(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var handleUserLogout = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: 'None',
            secure: true
          });
          res.clearCookie("rjwt", {
            httpOnly: true,
            sameSite: 'None',
            secure: true
          });
          return _context4.abrupt("return", res.status(200).json({
            EC: 0,
            DT: "",
            EM: 'Đăng xuất thành công !'
          }));
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "Error from server !"
          }));
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return function handleUserLogout(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var handleSystemUserLogout = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          res.clearCookie("jwtsys", {
            httpOnly: true,
            sameSite: 'None',
            secure: true
          });
          res.clearCookie("rjwtsys", {
            httpOnly: true,
            sameSite: 'None',
            secure: true
          });
          return _context5.abrupt("return", res.status(200).json({
            EC: 0,
            DT: "",
            EM: 'Đăng xuất thành công !'
          }));
        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "Error from server !"
          }));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function handleSystemUserLogout(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var handleFetchUserAccount = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", res.status(200).json({
            EC: 0,
            DT: req.user,
            EM: 'Valid account !'
          }));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function handleFetchUserAccount(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var handleChangeUserPassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body, password, id, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body = req.body, password = _req$body.password, id = _req$body.id;
          _context7.next = 4;
          return _accountServices["default"].updateUserPassword(password, id);
        case 4:
          result = _context7.sent;
          if (!result) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context7.next = 13;
          break;
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return function handleChangeUserPassword(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var checkCustomerEmailExist = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var email, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          email = req.query.email;
          _context8.next = 4;
          return _LoginRegisterService["default"].checkCustomerEmailExist(email);
        case 4:
          result = _context8.sent;
          if (!result) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context8.next = 13;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function checkCustomerEmailExist(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var checkEmailWebsiteUserExist = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var email, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          email = req.query.email;
          _context9.next = 4;
          return _LoginRegisterService["default"].checkEmailWebsiteUserExist(email);
        case 4:
          result = _context9.sent;
          if (!result) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context9.next = 13;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function checkEmailWebsiteUserExist(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var checkSellerEmailExist = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var email, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          email = req.query.email;
          _context10.next = 4;
          return _LoginRegisterService["default"].checkSellerEmailExist(email);
        case 4:
          result = _context10.sent;
          if (!result) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
          }));
        case 7:
          _context10.next = 13;
          break;
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return function checkSellerEmailExist(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var sendVertificationCode = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var data, filePath, source, template, replacements, htmlToSend, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          data = req.body;
          OTP = (0, _OTPGenerator["default"])(OTP_LIMIT);
          filePath = path.join(__dirname, '../templates/user_otp_change_password.html');
          source = fs.readFileSync(filePath, 'utf-8').toString();
          template = handlebars.compile(source);
          replacements = {
            email: data.email,
            otp: OTP
          };
          htmlToSend = template(replacements);
          transporter.sendMail({
            from: "FoxMart \uD83E\uDD8A <".concat(process.env.EMAIL_USERNAME, ">"),
            // sender address
            to: "".concat(data.email),
            // list of receivers
            subject: "FoxMart Ecommerce Verification Code",
            // Subject line
            html: htmlToSend
          });
          _context11.next = 11;
          return _LoginRegisterService["default"].handleCreateVertificationCode({
            code: OTP,
            email: data.email
          });
        case 11:
          result = _context11.sent;
          if (!(result && result.EC === 0)) {
            _context11.next = 16;
            break;
          }
          return _context11.abrupt("return", res.status(200).json({
            EC: 0,
            DT: '',
            EM: "Send OTP code successfully !"
          }));
        case 16:
          return _context11.abrupt("return", res.status(200).json({
            EC: -1,
            DT: '',
            EM: "Send OTP failed !"
          }));
        case 17:
          _context11.next = 23;
          break;
        case 19:
          _context11.prev = 19;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 23:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 19]]);
  }));
  return function sendVertificationCode(_x21, _x22) {
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
          return _LoginRegisterService["default"].handleOTPVertification(data);
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
var handleUserChangePassword = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var data, result;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          data = req.body;
          _context13.next = 4;
          return _LoginRegisterService["default"].userChangePassword(data);
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
            EC: -1,
            DT: '',
            EM: "error from server !"
          }));
        case 13:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 9]]);
  }));
  return function handleUserChangePassword(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
module.exports = {
  handleUserLogin: handleUserLogin,
  handleUserRegister: handleUserRegister,
  handleUserLogout: handleUserLogout,
  handleFetchUserAccount: handleFetchUserAccount,
  handleChangeUserPassword: handleChangeUserPassword,
  checkCustomerEmailExist: checkCustomerEmailExist,
  checkSellerEmailExist: checkSellerEmailExist,
  handleSystemUserLogin: handleSystemUserLogin,
  handleSystemUserLogout: handleSystemUserLogout,
  checkEmailWebsiteUserExist: checkEmailWebsiteUserExist,
  sendVertificationCode: sendVertificationCode,
  handleCodeVertification: handleCodeVertification,
  handleUserChangePassword: handleUserChangePassword
};