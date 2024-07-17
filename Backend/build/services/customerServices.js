"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var db = require('../models/index.js');
var _require = require("sequelize"),
  Op = _require.Op;
var _ = require("lodash");
var _require2 = require("./LoginRegisterService.js"),
  checkPassword = _require2.checkPassword,
  hashPassword = _require2.hashPassword;
_dotenv["default"].config();
var _require3 = require("@aws-sdk/client-s3"),
  S3Client = _require3.S3Client,
  GetObjectCommand = _require3.GetObjectCommand,
  PutObjectCommand = _require3.PutObjectCommand;
var _require4 = require("@aws-sdk/s3-request-presigner"),
  getSignedUrl = _require4.getSignedUrl;
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
var getCustomerInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(customer_id) {
    var customerInfo, getObjectParams, command, url;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return db.Customer.findOne({
            raw: true,
            attributes: ['id', 'name', 'mobile', 'gender', 'birth', 'email'],
            where: {
              id: _defineProperty({}, Op.eq, +customer_id)
            }
          });
        case 3:
          customerInfo = _context.sent;
          getObjectParams = {
            Bucket: bucketName,
            Key: "customer_".concat(customer_id, ".jpeg")
          };
          command = new GetObjectCommand(getObjectParams);
          _context.next = 8;
          return getSignedUrl(s3, command, {
            expiresIn: 3600
          });
        case 8:
          url = _context.sent;
          return _context.abrupt("return", {
            EC: 0,
            DT: _objectSpread(_objectSpread({}, customerInfo), {}, {
              image: url
            }),
            EM: 'Customer Info !'
          });
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function getCustomerInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createNewCustomerAddress = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
    var type, customerID, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          type = data.type, customerID = data.customerID;
          if (!(type === 1)) {
            _context2.next = 12;
            break;
          }
          _context2.next = 5;
          return db.Address.update({
            type: 0
          }, {
            where: {
              customerID: _defineProperty({}, Op.eq, customerID)
            }
          });
        case 5:
          result = _context2.sent;
          if (!result) {
            _context2.next = 10;
            break;
          }
          _context2.next = 9;
          return db.Address.create(data);
        case 9:
          return _context2.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Tạo mới địa chỉ thành công'
          });
        case 10:
          _context2.next = 15;
          break;
        case 12:
          _context2.next = 14;
          return db.Address.create(data);
        case 14:
          return _context2.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Tạo mới địa chỉ thành công'
          });
        case 15:
          _context2.next = 21;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 17]]);
  }));
  return function createNewCustomerAddress(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var updateCustomerAddress = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
    var address_id, update_data, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          address_id = data.id;
          update_data = data;
          delete update_data.id;
          _context3.next = 6;
          return db.Address.update(update_data, {
            where: {
              id: _defineProperty({}, Op.eq, address_id)
            }
          });
        case 6:
          result = _context3.sent;
          return _context3.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật địa chỉ thành công'
          });
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function updateCustomerAddress(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var updateCustomerInfo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data, image_file) {
    var id, imageName, params, command;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = data.id;
          if (!(image_file && image_file !== "")) {
            _context4.next = 13;
            break;
          }
          imageName = "customer_".concat(id, ".jpeg");
          params = {
            Bucket: bucketName,
            Key: imageName,
            Body: image_file.buffer,
            ContentType: image_file.mimetype
          };
          command = new PutObjectCommand(params);
          _context4.next = 8;
          return s3.send(command);
        case 8:
          _context4.next = 10;
          return db.Customer.update({
            name: data.name,
            mobile: data.mobile,
            gender: data.gender,
            birth: data.birth
          }, {
            where: {
              id: +id
            }
          });
        case 10:
          return _context4.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin thành công'
          });
        case 13:
          _context4.next = 15;
          return db.Customer.update({
            name: data.name,
            mobile: data.mobile,
            gender: data.gender,
            birth: data.birth
          }, {
            where: {
              id: +id
            }
          });
        case 15:
          return _context4.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin thành công'
          });
        case 16:
          _context4.next = 22;
          break;
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return function updateCustomerInfo(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteCustomerAddress = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(address_id) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return db.Address.destroy({
            where: {
              id: _defineProperty({}, Op.eq, +address_id)
            }
          });
        case 3:
          return _context5.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Xóa địa chỉ thành công'
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
  return function deleteCustomerAddress(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var getCustomerAddresses = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(customer_id) {
    var addressData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return db.Address.findAll({
            raw: true,
            attributes: ['id', 'fullname', 'mobile', 'street', 'ward', 'district', 'province', 'country', 'type'],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          addressData = _context6.sent;
          return _context6.abrupt("return", {
            EC: 0,
            DT: addressData,
            EM: 'customer addresses !'
          });
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getCustomerAddresses(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
var updateCustomerDefaultAddress = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(address_id, customer_id) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return db.Address.update({
            type: 0
          }, {
            where: _defineProperty({}, Op.and, [{
              id: _defineProperty({}, Op.not, address_id)
            }, {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }])
          });
        case 3:
          _context7.next = 5;
          return db.Address.update({
            type: 1
          }, {
            where: {
              id: _defineProperty({}, Op.eq, address_id)
            }
          });
        case 5:
          _context7.next = 7;
          return db.Address.update({
            type: 0
          }, {
            where: {
              id: _defineProperty({}, Op.not, address_id)
            }
          });
        case 7:
          return _context7.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật địa chỉ mặc định thành công'
          });
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function updateCustomerDefaultAddress(_x8, _x9) {
    return _ref7.apply(this, arguments);
  };
}();
var changeCustomerPassword = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data) {
    var customerInfo, accountInfo;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return db.Customer.findOne({
            raw: true,
            attributes: ['userID'],
            where: {
              id: _defineProperty({}, Op.eq, +data.id)
            }
          });
        case 3:
          customerInfo = _context8.sent;
          if (!customerInfo) {
            _context8.next = 14;
            break;
          }
          _context8.next = 7;
          return db.User.findOne({
            raw: true,
            attributes: ['id', 'password'],
            where: {
              id: _defineProperty({}, Op.eq, +customerInfo.userID)
            }
          });
        case 7:
          accountInfo = _context8.sent;
          if (!checkPassword(data.old, accountInfo.password)) {
            _context8.next = 13;
            break;
          }
          db.User.update({
            password: hashPassword(data["new"])
          }, {
            where: {
              id: _defineProperty({}, Op.eq, +accountInfo.id)
            }
          });
          return _context8.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Thay đổi mật khẩu thành công'
          });
        case 13:
          return _context8.abrupt("return", {
            EC: 1,
            DT: '',
            EM: 'Mật khẩu cũ không đúng'
          });
        case 14:
          _context8.next = 20;
          break;
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 16]]);
  }));
  return function changeCustomerPassword(_x10) {
    return _ref8.apply(this, arguments);
  };
}();
var handleCreateVertificationCode = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(data) {
    var code, email, existCode, result, _result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          code = data.code, email = data.email;
          _context9.next = 4;
          return db.CodeVertification.findAll({
            raw: true,
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 4:
          existCode = _context9.sent;
          if (!(existCode.length > 0)) {
            _context9.next = 16;
            break;
          }
          _context9.next = 8;
          return db.CodeVertification.destroy({
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 8:
          _context9.next = 10;
          return db.CodeVertification.create({
            email: email,
            code: code,
            createdAt: new Date()
          });
        case 10:
          result = _context9.sent;
          if (!result) {
            _context9.next = 13;
            break;
          }
          return _context9.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Create new OTP code successfully !'
          });
        case 13:
          return _context9.abrupt("return", {
            EC: 1,
            DT: '',
            EM: 'Create new OTP code failed !'
          });
        case 16:
          _context9.next = 18;
          return db.CodeVertification.destroy({
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 18:
          _context9.next = 20;
          return db.CodeVertification.create({
            email: email,
            code: code,
            createdAt: new Date()
          });
        case 20:
          _result = _context9.sent;
          if (!_result) {
            _context9.next = 23;
            break;
          }
          return _context9.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Create new OTP code successfully !'
          });
        case 23:
          return _context9.abrupt("return", {
            EC: 1,
            DT: '',
            EM: 'Create new OTP code failed !'
          });
        case 24:
          _context9.next = 30;
          break;
        case 26:
          _context9.prev = 26;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 30:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 26]]);
  }));
  return function handleCreateVertificationCode(_x11) {
    return _ref9.apply(this, arguments);
  };
}();
var handleOTPVertification = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data) {
    var otp, email, result, otpTimeStart, date, otpTimeNow, time_span;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          otp = data.otp, email = data.email;
          _context10.next = 4;
          return db.CodeVertification.findOne({
            raw: true,
            attributes: ['id', 'code', 'createdAT'],
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 4:
          result = _context10.sent;
          if (!result) {
            _context10.next = 15;
            break;
          }
          otpTimeStart = result.createdAT.getTime(); //miliseconds
          date = new Date();
          otpTimeNow = date.getTime(); //miliseconds
          time_span = otpTimeNow - otpTimeStart; // otp valid: time_span < 600000 (milisecond) (10 minute) | otp invalid: time_span > 600000 (milisecond) (10 minute)
          if (!(result.code === otp && time_span < process.env.OTP_TIME_DURATION)) {
            _context10.next = 14;
            break;
          }
          _context10.next = 13;
          return db.CodeVertification.destroy({
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 13:
          return _context10.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Mã OTP hợp lệ !'
          });
        case 14:
          return _context10.abrupt("return", {
            EC: 1,
            DT: "",
            EM: 'Mã OTP không hợp lệ !'
          });
        case 15:
          return _context10.abrupt("return", {
            EC: 1,
            DT: "",
            EM: 'Mã OTP không hợp lệ !'
          });
        case 18:
          _context10.prev = 18;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 22:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 18]]);
  }));
  return function handleOTPVertification(_x12) {
    return _ref10.apply(this, arguments);
  };
}();
var handleCheckNewUser = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(customer_id) {
    var customer_info;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return db.NewCustomer.findOne({
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          customer_info = _context11.sent;
          if (!customer_info) {
            _context11.next = 6;
            break;
          }
          return _context11.abrupt("return", {
            EC: 0,
            DT: {
              new_customer: true
            },
            EM: 'Khách hàng mới'
          });
        case 6:
          return _context11.abrupt("return", {
            EC: 0,
            DT: {
              new_customer: false
            },
            EM: 'Khách hàng cũ !'
          });
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 9]]);
  }));
  return function handleCheckNewUser(_x13) {
    return _ref11.apply(this, arguments);
  };
}();
var removeNewCustomer = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(customer_id) {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return db.NewCustomer.destroy({
            where: {
              customerID: _defineProperty({}, Op.eq, +customer_id)
            }
          });
        case 3:
          return _context12.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Change into old customer'
          });
        case 6:
          _context12.prev = 6;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          return _context12.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 6]]);
  }));
  return function removeNewCustomer(_x14) {
    return _ref12.apply(this, arguments);
  };
}();
var trainingNewCustomer = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(session_id, data, customer_id) {
    var session;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          if (!session_id) {
            _context14.next = 16;
            break;
          }
          _context14.next = 4;
          return db.Session.findOne({
            where: {
              id: _defineProperty({}, Op.eq, session_id)
            }
          });
        case 4:
          session = _context14.sent;
          if (!session) {
            _context14.next = 13;
            break;
          }
          _context14.next = 8;
          return Promise.all(data.map( /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(item) {
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.next = 2;
                    return db.SearchSession.create({
                      sessionID: session_id,
                      content: item.title,
                      searchTime: new Date()
                    });
                  case 2:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            }));
            return function (_x18) {
              return _ref14.apply(this, arguments);
            };
          }()));
        case 8:
          _context14.next = 10;
          return db.NewCustomer.destroy({
            where: {
              customerID: _defineProperty({}, Op.eq, +customer_id)
            }
          });
        case 10:
          return _context14.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Training new customer'
          });
        case 13:
          return _context14.abrupt("return", {
            EC: -1,
            DT: '',
            EM: 'Sesion không hợp lệ !'
          });
        case 14:
          _context14.next = 17;
          break;
        case 16:
          return _context14.abrupt("return", {
            EC: -2,
            DT: '',
            EM: 'Sesion không hợp lệ !'
          });
        case 17:
          _context14.next = 23;
          break;
        case 19:
          _context14.prev = 19;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          return _context14.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 23:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 19]]);
  }));
  return function trainingNewCustomer(_x15, _x16, _x17) {
    return _ref13.apply(this, arguments);
  };
}();
module.exports = {
  handleCreateVertificationCode: handleCreateVertificationCode,
  handleOTPVertification: handleOTPVertification,
  getCustomerInfo: getCustomerInfo,
  updateCustomerInfo: updateCustomerInfo,
  changeCustomerPassword: changeCustomerPassword,
  getCustomerAddresses: getCustomerAddresses,
  updateCustomerDefaultAddress: updateCustomerDefaultAddress,
  createNewCustomerAddress: createNewCustomerAddress,
  deleteCustomerAddress: deleteCustomerAddress,
  updateCustomerAddress: updateCustomerAddress,
  handleCheckNewUser: handleCheckNewUser,
  removeNewCustomer: removeNewCustomer,
  trainingNewCustomer: trainingNewCustomer
};