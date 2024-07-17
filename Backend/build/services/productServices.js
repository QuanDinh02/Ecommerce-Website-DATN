"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var getProductDetail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(product_id) {
    var productInfo, subCategoryInfo, sub_category, category, productDetail, getObjectParams, command, url, finalData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return db.Product.findOne({
            raw: true,
            attributes: ['id', 'name', 'summary'],
            where: {
              id: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 3:
          productInfo = _context.sent;
          _context.next = 6;
          return db.ProductSubCategory.findOne({
            raw: true,
            nest: true,
            attributes: ['id'],
            include: [{
              model: db.SubCategory,
              attributes: ['id', 'title'],
              raw: true,
              nest: true,
              include: {
                model: db.Category,
                attributes: ['id', 'title']
              }
            }],
            where: {
              productID: _defineProperty({}, Op.eq, productInfo.id)
            }
          });
        case 6:
          subCategoryInfo = _context.sent;
          sub_category = subCategoryInfo.SubCategory;
          category = sub_category.Category;
          delete sub_category.Category;
          delete sub_category.Seller;
          _context.next = 13;
          return db.ProductType.findOne({
            raw: true,
            attributes: ['id', 'quantity', 'currentPrice', 'price', 'sold'],
            where: {
              productID: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 13:
          productDetail = _context.sent;
          getObjectParams = {
            Bucket: bucketName,
            Key: "".concat(product_id, ".jpeg")
          };
          command = new GetObjectCommand(getObjectParams);
          _context.next = 18;
          return getSignedUrl(s3, command, {
            expiresIn: 3600
          });
        case 18:
          url = _context.sent;
          finalData = {
            id: product_id,
            name: productInfo.name,
            currentPrice: productDetail.currentPrice,
            price: productDetail.price,
            sold: productDetail.sold,
            description: productInfo.summary,
            product_image: url,
            inventory_count: productDetail.quantity,
            sub_category: sub_category,
            category: category
          };
          return _context.abrupt("return", {
            EC: 0,
            DT: finalData,
            EM: 'Product Detail Info !'
          });
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 23]]);
  }));
  return function getProductDetail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getProductDetailShopInfo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(product_id) {
    var productInfo, shopID, shop_info, _yield$db$Product$fin, count, shop_join_date, getObjectParams, command, url;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return db.Product.findOne({
            raw: true,
            attributes: ['shop_id'],
            where: {
              id: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 3:
          productInfo = _context2.sent;
          if (!productInfo) {
            _context2.next = 20;
            break;
          }
          shopID = productInfo.shop_id;
          _context2.next = 8;
          return db.Seller.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'shopName'],
            include: [{
              model: db.User,
              attributes: ['registeredAt']
            }],
            where: {
              id: _defineProperty({}, Op.eq, shopID)
            }
          });
        case 8:
          shop_info = _context2.sent;
          _context2.next = 11;
          return db.Product.findAndCountAll({
            raw: true,
            where: {
              shop_id: _defineProperty({}, Op.eq, shopID)
            }
          });
        case 11:
          _yield$db$Product$fin = _context2.sent;
          count = _yield$db$Product$fin.count;
          shop_join_date = shop_info.User.registeredAt;
          getObjectParams = {
            Bucket: bucketName,
            Key: "shop_".concat(shop_info.id, ".jpeg")
          };
          command = new GetObjectCommand(getObjectParams);
          _context2.next = 18;
          return getSignedUrl(s3, command, {
            expiresIn: 3600
          });
        case 18:
          url = _context2.sent;
          return _context2.abrupt("return", {
            EC: 0,
            DT: {
              id: shopID,
              image: url,
              shop_name: shop_info.shopName,
              product_total: count,
              shop_join_date: shop_join_date
            },
            EM: 'Shop info summary !'
          });
        case 20:
          return _context2.abrupt("return", {
            EC: 0,
            DT: null,
            EM: 'Shop info summary !'
          });
        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 23]]);
  }));
  return function getProductDetailShopInfo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getShopInfo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(shop_id) {
    var shop_info, _yield$db$Product$fin2, count, shop_join_date, getObjectParams, command, url;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return db.Seller.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'shopName'],
            include: [{
              model: db.User,
              attributes: ['registeredAt']
            }],
            where: {
              id: _defineProperty({}, Op.eq, shop_id)
            }
          });
        case 3:
          shop_info = _context3.sent;
          _context3.next = 6;
          return db.Product.findAndCountAll({
            raw: true,
            where: {
              shop_id: _defineProperty({}, Op.eq, shop_id)
            }
          });
        case 6:
          _yield$db$Product$fin2 = _context3.sent;
          count = _yield$db$Product$fin2.count;
          shop_join_date = shop_info.User.registeredAt;
          getObjectParams = {
            Bucket: bucketName,
            Key: "shop_".concat(shop_info.id, ".jpeg")
          };
          command = new GetObjectCommand(getObjectParams);
          _context3.next = 13;
          return getSignedUrl(s3, command, {
            expiresIn: 3600
          });
        case 13:
          url = _context3.sent;
          return _context3.abrupt("return", {
            EC: 0,
            DT: {
              id: shop_id,
              image: url,
              shop_name: shop_info.shopName,
              product_total: count,
              shop_join_date: shop_join_date
            },
            EM: 'Shop info summary !'
          });
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 17]]);
  }));
  return function getShopInfo(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var getProductsHistory = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(item_limit, page, data) {
    var offSet, productList, productFinal, listLength, pageTotal, limit_data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!(item_limit > 0)) {
            _context5.next = 11;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context5.next = 5;
          return Promise.all(data.map( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(item) {
              var productExist, productInfo, seller_info, productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return db.Product.findOne({
                      raw: true,
                      attributes: ['id'],
                      where: {
                        id: _defineProperty({}, Op.eq, item)
                      }
                    });
                  case 2:
                    productExist = _context4.sent;
                    if (!productExist) {
                      _context4.next = 23;
                      break;
                    }
                    _context4.next = 6;
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
                        id: _defineProperty({}, Op.eq, item)
                      }
                    });
                  case 6:
                    productInfo = _context4.sent;
                    seller_info = {
                      id: productInfo.Seller.id,
                      name: productInfo.Seller.shopName
                    };
                    _context4.next = 10;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item)
                      }
                    });
                  case 10:
                    productType = _context4.sent;
                    if (productType) {
                      _context4.next = 15;
                      break;
                    }
                    return _context4.abrupt("return", null);
                  case 15:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context4.next = 19;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 19:
                    url = _context4.sent;
                    return _context4.abrupt("return", {
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
                  case 21:
                    _context4.next = 24;
                    break;
                  case 23:
                    return _context4.abrupt("return", null);
                  case 24:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x7) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 5:
          productList = _context5.sent;
          productFinal = productList.filter(function (item) {
            return item !== null;
          });
          listLength = productFinal.length;
          pageTotal = Math.ceil(listLength / item_limit);
          limit_data = _(productFinal).drop(offSet).take(item_limit).value();
          return _context5.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              product_list: limit_data
            },
            EM: "History products !"
          });
        case 11:
          return _context5.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'ITEM LIMIT is invalid !'
          });
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function getProductsHistory(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var getProductsHistorySwiper = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    var productList, productFinal, limit_data;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Promise.all(data.map( /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(item) {
              var productExist, productInfo, seller_info, productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return db.Product.findOne({
                      raw: true,
                      attributes: ['id'],
                      where: {
                        id: _defineProperty({}, Op.eq, item)
                      }
                    });
                  case 2:
                    productExist = _context6.sent;
                    if (!productExist) {
                      _context6.next = 23;
                      break;
                    }
                    _context6.next = 6;
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
                        id: _defineProperty({}, Op.eq, item)
                      }
                    });
                  case 6:
                    productInfo = _context6.sent;
                    seller_info = {
                      id: productInfo.Seller.id,
                      name: productInfo.Seller.shopName
                    };
                    _context6.next = 10;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item)
                      }
                    });
                  case 10:
                    productType = _context6.sent;
                    if (productType) {
                      _context6.next = 15;
                      break;
                    }
                    return _context6.abrupt("return", null);
                  case 15:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context6.next = 19;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 19:
                    url = _context6.sent;
                    return _context6.abrupt("return", {
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
                  case 21:
                    _context6.next = 24;
                    break;
                  case 23:
                    return _context6.abrupt("return", null);
                  case 24:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x9) {
              return _ref7.apply(this, arguments);
            };
          }()));
        case 3:
          productList = _context7.sent;
          productFinal = productList.filter(function (item) {
            return item !== null;
          });
          limit_data = _(productFinal).take(20).value();
          return _context7.abrupt("return", {
            EC: 0,
            DT: {
              product_list: limit_data
            },
            EM: "History products !"
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
  return function getProductsHistorySwiper(_x8) {
    return _ref6.apply(this, arguments);
  };
}();
var getProductsByCategory = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(category_id, item_limit, page, rating, minPrice, maxPrice) {
    var offSet, subCategoryByCategoryList, subCategoryIdList, productListRaw, productListFinal, productListPriceFilter, listLength, pageTotal, productListFinalWithImage, _productListRaw, _productListFinal, _productListPriceFilter, _listLength, _pageTotal, _productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          if (!(item_limit > 0)) {
            _context10.next = 50;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context10.next = 5;
          return db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
              categoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 5:
          subCategoryByCategoryList = _context10.sent;
          _context10.next = 8;
          return subCategoryByCategoryList.map(function (item) {
            return item.id;
          });
        case 8:
          subCategoryIdList = _context10.sent;
          if (!(rating === 0)) {
            _context10.next = 31;
            break;
          }
          _context10.next = 12;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: [{
                model: db.Seller,
                attributes: ['id', 'shopName']
              }, {
                model: db.ProductType,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
              }]
            }, {
              model: db.SubCategory,
              attributes: ['id', 'title']
            }],
            where: {
              subCategoryID: _defineProperty({}, Op["in"], subCategoryIdList)
            }
          });
        case 12:
          productListRaw = _context10.sent;
          _context10.next = 15;
          return productListRaw.map(function (item) {
            var sub_category = {
              id: item.SubCategory.id,
              name: item.SubCategory.title
            };
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              sub_category: sub_category,
              seller_info: seller_info,
              current_price: item.Product.ProductType.currentPrice,
              price: item.Product.ProductType.price,
              sold: item.Product.ProductType.sold,
              quantity: item.Product.ProductType.quantity
            };
          });
        case 15:
          productListFinal = _context10.sent;
          productListPriceFilter = [];
          if (minPrice === 0 && maxPrice === 0) {
            productListPriceFilter = _.cloneDeep(productListFinal);
          }
          if (minPrice !== 0 && maxPrice === 0) {
            productListPriceFilter = productListFinal.filter(function (item) {
              return item.current_price >= minPrice;
            });
          }
          if (minPrice === 0 && maxPrice !== 0) {
            productListPriceFilter = productListFinal.filter(function (item) {
              return item.current_price <= maxPrice;
            });
          }
          if (minPrice !== 0 && maxPrice !== 0) {
            productListPriceFilter = productListFinal.filter(function (item) {
              return item.current_price >= minPrice && item.current_price <= maxPrice;
            });
          }
          listLength = productListPriceFilter.length;
          pageTotal = Math.ceil(listLength / item_limit);
          productListPriceFilter.reverse();
          productListPriceFilter = _(productListPriceFilter).drop(offSet).take(item_limit).value();
          _context10.next = 27;
          return Promise.all(productListPriceFilter.map( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(item) {
              var getObjectParams, command, url, productRating, rating_average;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context8.next = 4;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 4:
                    url = _context8.sent;
                    _context8.next = 7;
                    return db.ProductRating.findOne({
                      raw: true,
                      attributes: ['id', 'rating'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 7:
                    productRating = _context8.sent;
                    rating_average = productRating ? productRating.rating : 0;
                    return _context8.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      rating: rating_average
                    }));
                  case 10:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x16) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 27:
          productListFinalWithImage = _context10.sent;
          return _context10.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: productListFinalWithImage
            },
            EM: 'Get products by category !'
          });
        case 31:
          _context10.next = 33;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
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
              }, {
                model: db.ProductType,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
              }]
            }, {
              model: db.SubCategory,
              attributes: ['id', 'title']
            }],
            where: {
              subCategoryID: _defineProperty({}, Op["in"], subCategoryIdList)
            }
          });
        case 33:
          _productListRaw = _context10.sent;
          _context10.next = 36;
          return _productListRaw.map(function (item) {
            var sub_category = {
              id: item.SubCategory.id,
              name: item.SubCategory.title
            };
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              sub_category: sub_category,
              seller_info: seller_info,
              rating: item.Product.ProductRating.rating,
              current_price: item.Product.ProductType.currentPrice,
              price: item.Product.ProductType.price,
              sold: item.Product.ProductType.sold,
              quantity: item.Product.ProductType.quantity
            };
          });
        case 36:
          _productListFinal = _context10.sent;
          _productListPriceFilter = [];
          if (minPrice === 0 && maxPrice === 0) {
            _productListPriceFilter = _productListFinal.filter(function (item) {
              return item.rating >= rating;
            });
          }
          if (minPrice !== 0 && maxPrice === 0) {
            _productListPriceFilter = _productListFinal.filter(function (item) {
              return item.current_price >= minPrice && item.rating >= rating;
            });
          }
          if (minPrice === 0 && maxPrice !== 0) {
            _productListPriceFilter = _productListFinal.filter(function (item) {
              return item.current_price <= maxPrice && item.rating >= rating;
            });
          }
          if (minPrice !== 0 && maxPrice !== 0) {
            _productListPriceFilter = _productListFinal.filter(function (item) {
              return item.current_price >= minPrice && item.current_price <= maxPrice && item.rating >= rating;
            });
          }
          _listLength = _productListPriceFilter.length;
          _pageTotal = Math.ceil(_listLength / item_limit);
          _productListPriceFilter.reverse();
          _productListPriceFilter = _(_productListPriceFilter).drop(offSet).take(item_limit).value();
          _context10.next = 48;
          return Promise.all(_productListPriceFilter.map( /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(item) {
              var getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context9.next = 4;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 4:
                    url = _context9.sent;
                    return _context9.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url
                    }));
                  case 6:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return function (_x17) {
              return _ref10.apply(this, arguments);
            };
          }()));
        case 48:
          _productListFinalWithImage = _context10.sent;
          return _context10.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal,
              total_items: _listLength,
              product_list: _productListFinalWithImage
            },
            EM: 'Get products by category !'
          });
        case 50:
          return _context10.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 53:
          _context10.prev = 53;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 57:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 53]]);
  }));
  return function getProductsByCategory(_x10, _x11, _x12, _x13, _x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var getProductsByShopCategory = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(sub_category_id, shop_id, item_limit, page) {
    var offSet, subCategoryByCategoryList, subCategoryIdList, productListRaw, listLength, pageTotal, productListFinal, productListFinalWithImage, _productListRaw2, _listLength2, _pageTotal2, _productListFinal2, _productListFinalWithImage2;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          if (!(item_limit > 0)) {
            _context13.next = 40;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(sub_category_id === 0)) {
            _context13.next = 26;
            break;
          }
          _context13.next = 6;
          return db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
              shopID: _defineProperty({}, Op.eq, shop_id)
            }
          });
        case 6:
          subCategoryByCategoryList = _context13.sent;
          _context13.next = 9;
          return subCategoryByCategoryList.map(function (item) {
            return item.id;
          });
        case 9:
          subCategoryIdList = _context13.sent;
          _context13.next = 12;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: {
                model: db.Seller,
                attributes: ['id', 'shopName']
              }
            }, {
              model: db.SubCategory,
              attributes: ['id', 'title']
            }],
            where: {
              subCategoryID: _defineProperty({}, Op["in"], subCategoryIdList)
            }
          });
        case 12:
          productListRaw = _context13.sent;
          listLength = productListRaw.length;
          pageTotal = Math.ceil(listLength / item_limit);
          productListRaw.reverse();
          productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();
          _context13.next = 19;
          return productListRaw.map(function (item) {
            var sub_category = {
              id: item.SubCategory.id,
              name: item.SubCategory.title
            };
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              sub_category: sub_category,
              seller_info: seller_info
            };
          });
        case 19:
          productListFinal = _context13.sent;
          _context13.next = 22;
          return Promise.all(productListFinal.map( /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(item) {
              var productType, getObjectParams, command, url, productRating, rating_average;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    _context11.next = 2;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productType = _context11.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context11.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context11.sent;
                    _context11.next = 10;
                    return db.ProductRating.findOne({
                      raw: true,
                      attributes: ['id', 'rating'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 10:
                    productRating = _context11.sent;
                    rating_average = productRating ? productRating.rating : 0;
                    return _context11.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      rating: rating_average,
                      quantity: productType.quantity
                    }));
                  case 13:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            return function (_x22) {
              return _ref12.apply(this, arguments);
            };
          }()));
        case 22:
          productListFinalWithImage = _context13.sent;
          return _context13.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: productListFinalWithImage
            },
            EM: 'Get products by all shop categories !'
          });
        case 26:
          _context13.next = 28;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: {
                model: db.Seller,
                attributes: ['id', 'shopName']
              }
            }, {
              model: db.SubCategory,
              attributes: ['id', 'title']
            }],
            where: {
              subCategoryID: _defineProperty({}, Op.eq, sub_category_id)
            }
          });
        case 28:
          _productListRaw2 = _context13.sent;
          _listLength2 = _productListRaw2.length;
          _pageTotal2 = Math.ceil(_listLength2 / item_limit);
          _productListRaw2.reverse();
          _productListRaw2 = _(_productListRaw2).drop(offSet).take(item_limit).value();
          _context13.next = 35;
          return _productListRaw2.map(function (item) {
            var sub_category = {
              id: item.SubCategory.id,
              name: item.SubCategory.title
            };
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              sub_category: sub_category,
              seller_info: seller_info
            };
          });
        case 35:
          _productListFinal2 = _context13.sent;
          _context13.next = 38;
          return Promise.all(_productListFinal2.map( /*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(item) {
              var productType, getObjectParams, command, url, productRating, rating_average;
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
                    _context12.next = 10;
                    return db.ProductRating.findOne({
                      raw: true,
                      attributes: ['id', 'rating'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 10:
                    productRating = _context12.sent;
                    rating_average = productRating ? productRating.rating : 0;
                    return _context12.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      rating: rating_average,
                      quantity: productType.quantity
                    }));
                  case 13:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            return function (_x23) {
              return _ref13.apply(this, arguments);
            };
          }()));
        case 38:
          _productListFinalWithImage2 = _context13.sent;
          return _context13.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal2,
              total_items: _listLength2,
              product_list: _productListFinalWithImage2
            },
            EM: 'Get products by shop category !'
          });
        case 40:
          return _context13.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 43:
          _context13.prev = 43;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 47:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 43]]);
  }));
  return function getProductsByShopCategory(_x18, _x19, _x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();
var getProductsBySubCategory = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(sub_category_id, item_limit, page, rating, minPrice, maxPrice) {
    var offSet, productListRaw, productListFinal, productListPriceFilter, listLength, pageTotal, productListFinalWithImage, _productListRaw3, _productListFinal3, _productListPriceFilter2, _listLength3, _pageTotal3, _productListFinalWithImage3;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          if (!(item_limit > 0)) {
            _context16.next = 44;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(rating === 0)) {
            _context16.next = 25;
            break;
          }
          _context16.next = 6;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.Product,
              attributes: ['id', 'name', 'summary'],
              raw: true,
              nest: true,
              include: [{
                model: db.Seller,
                attributes: ['id', 'shopName']
              }, {
                model: db.ProductType,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
              }]
            }, {
              model: db.SubCategory,
              attributes: ['id', 'title']
            }],
            where: {
              subCategoryID: _defineProperty({}, Op.eq, sub_category_id)
            }
          });
        case 6:
          productListRaw = _context16.sent;
          _context16.next = 9;
          return productListRaw.map(function (item) {
            var sub_category = {
              id: item.SubCategory.id,
              name: item.SubCategory.title
            };
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              sub_category: sub_category,
              seller_info: seller_info,
              current_price: item.Product.ProductType.currentPrice,
              price: item.Product.ProductType.price,
              sold: item.Product.ProductType.sold,
              quantity: item.Product.ProductType.quantity
            };
          });
        case 9:
          productListFinal = _context16.sent;
          productListPriceFilter = [];
          if (minPrice === 0 && maxPrice === 0) {
            productListPriceFilter = _.cloneDeep(productListFinal);
          }
          if (minPrice !== 0 && maxPrice === 0) {
            productListPriceFilter = productListFinal.filter(function (item) {
              return item.current_price >= minPrice;
            });
          }
          if (minPrice === 0 && maxPrice !== 0) {
            productListPriceFilter = productListFinal.filter(function (item) {
              return item.current_price <= maxPrice;
            });
          }
          if (minPrice !== 0 && maxPrice !== 0) {
            productListPriceFilter = productListFinal.filter(function (item) {
              return item.current_price >= minPrice && item.current_price <= maxPrice;
            });
          }
          listLength = productListPriceFilter.length;
          pageTotal = Math.ceil(listLength / item_limit);
          productListPriceFilter.reverse();
          productListPriceFilter = _(productListPriceFilter).drop(offSet).take(item_limit).value();
          _context16.next = 21;
          return Promise.all(productListPriceFilter.map( /*#__PURE__*/function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(item) {
              var getObjectParams, command, url, productRating, rating_average;
              return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context14.next = 4;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 4:
                    url = _context14.sent;
                    _context14.next = 7;
                    return db.ProductRating.findOne({
                      raw: true,
                      attributes: ['id', 'rating'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 7:
                    productRating = _context14.sent;
                    rating_average = productRating ? productRating.rating : 0;
                    return _context14.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      rating: rating_average
                    }));
                  case 10:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14);
            }));
            return function (_x30) {
              return _ref15.apply(this, arguments);
            };
          }()));
        case 21:
          productListFinalWithImage = _context16.sent;
          return _context16.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: productListFinalWithImage
            },
            EM: 'Get products by category !'
          });
        case 25:
          _context16.next = 27;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
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
              }, {
                model: db.ProductType,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
              }]
            }, {
              model: db.SubCategory,
              attributes: ['id', 'title']
            }],
            where: {
              subCategoryID: _defineProperty({}, Op.eq, sub_category_id)
            }
          });
        case 27:
          _productListRaw3 = _context16.sent;
          _context16.next = 30;
          return _productListRaw3.map(function (item) {
            var sub_category = {
              id: item.SubCategory.id,
              name: item.SubCategory.title
            };
            var seller_info = {
              id: item.Product.Seller.id,
              name: item.Product.Seller.shopName
            };
            return {
              id: item.Product.id,
              name: item.Product.name,
              summary: item.Product.summary ? item.Product.summary : "",
              sub_category: sub_category,
              seller_info: seller_info,
              rating: item.Product.ProductRating.rating,
              current_price: item.Product.ProductType.currentPrice,
              price: item.Product.ProductType.price,
              sold: item.Product.ProductType.sold,
              quantity: item.Product.ProductType.quantity
            };
          });
        case 30:
          _productListFinal3 = _context16.sent;
          _productListPriceFilter2 = [];
          if (minPrice === 0 && maxPrice === 0) {
            _productListPriceFilter2 = _productListFinal3.filter(function (item) {
              return item.rating >= rating;
            });
          }
          if (minPrice !== 0 && maxPrice === 0) {
            _productListPriceFilter2 = _productListFinal3.filter(function (item) {
              return item.current_price >= minPrice && item.rating >= rating;
            });
          }
          if (minPrice === 0 && maxPrice !== 0) {
            _productListPriceFilter2 = _productListFinal3.filter(function (item) {
              return item.current_price <= maxPrice && item.rating >= rating;
            });
          }
          if (minPrice !== 0 && maxPrice !== 0) {
            _productListPriceFilter2 = _productListFinal3.filter(function (item) {
              return item.current_price >= minPrice && item.current_price <= maxPrice && item.rating >= rating;
            });
          }
          _listLength3 = _productListPriceFilter2.length;
          _pageTotal3 = Math.ceil(_listLength3 / item_limit);
          _productListPriceFilter2.reverse();
          _productListPriceFilter2 = _(_productListPriceFilter2).drop(offSet).take(item_limit).value();

          // const listLength = productListFinal.length;
          // const pageTotal = Math.ceil(listLength / item_limit);

          // productListFinal = _(productListFinal).drop(offSet).take(item_limit).value();
          _context16.next = 42;
          return Promise.all(_productListPriceFilter2.map( /*#__PURE__*/function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(item) {
              var getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context15.next = 4;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 4:
                    url = _context15.sent;
                    return _context15.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url
                    }));
                  case 6:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15);
            }));
            return function (_x31) {
              return _ref16.apply(this, arguments);
            };
          }()));
        case 42:
          _productListFinalWithImage3 = _context16.sent;
          return _context16.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal3,
              total_items: _listLength3,
              product_list: _productListFinalWithImage3
            },
            EM: 'Get products by category !'
          });
        case 44:
          return _context16.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 47:
          _context16.prev = 47;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 51:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 47]]);
  }));
  return function getProductsBySubCategory(_x24, _x25, _x26, _x27, _x28, _x29) {
    return _ref14.apply(this, arguments);
  };
}();
var getSearchProducts = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(product_name) {
    var productList;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return db.Product.findAll({
            where: {
              name: _defineProperty({}, Op.substring, "".concat(product_name))
            },
            limit: 25,
            attributes: ['id', 'name'],
            raw: true
          });
        case 3:
          productList = _context17.sent;
          return _context17.abrupt("return", {
            EC: 0,
            DT: productList,
            EM: 'Search products successfully'
          });
        case 7:
          _context17.prev = 7;
          _context17.t0 = _context17["catch"](0);
          return _context17.abrupt("return", {
            EC: -2,
            EM: 'Something is wrong on services !',
            DT: ''
          });
        case 10:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 7]]);
  }));
  return function getSearchProducts(_x32) {
    return _ref17.apply(this, arguments);
  };
}();
var getSearchProductsWithPagination = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(content, item_limit, page, rating) {
    var offSet, productListRaw, listLength, pageTotal, productListFinal, productListFinalWithImage, _productListRaw4, _productListFinal4, _listLength4, _pageTotal4, _productListFinalWithImage4;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          if (!(item_limit > 0)) {
            _context20.next = 33;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(rating === 0)) {
            _context20.next = 20;
            break;
          }
          _context20.next = 6;
          return db.Product.findAll({
            raw: true,
            attributes: ['id', 'name', 'summary'],
            nest: true,
            include: [{
              model: db.Seller,
              attributes: ['id', 'shopName']
            }, {
              model: db.ProductRating,
              attributes: ['rating']
            }],
            where: {
              name: _defineProperty({}, Op.substring, "".concat(content))
            }
          });
        case 6:
          productListRaw = _context20.sent;
          listLength = productListRaw.length;
          pageTotal = Math.ceil(listLength / item_limit);
          productListRaw.reverse();
          productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();
          _context20.next = 13;
          return productListRaw.map(function (item) {
            var seller_info = {
              id: item.Seller.id,
              name: item.Seller.shopName
            };
            return {
              id: item.id,
              name: item.name,
              summary: item.summary ? item.summary : "",
              seller_info: seller_info,
              rating: item.ProductRating.rating
            };
          });
        case 13:
          productListFinal = _context20.sent;
          _context20.next = 16;
          return Promise.all(productListFinal.map( /*#__PURE__*/function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(item) {
              var productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.next = 2;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productType = _context18.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context18.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context18.sent;
                    return _context18.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      quantity: productType.quantity
                    }));
                  case 9:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18);
            }));
            return function (_x37) {
              return _ref19.apply(this, arguments);
            };
          }()));
        case 16:
          productListFinalWithImage = _context20.sent;
          return _context20.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: productListFinalWithImage
            },
            EM: 'Get products by search !'
          });
        case 20:
          _context20.next = 22;
          return db.Product.findAll({
            raw: true,
            attributes: ['id', 'name', 'summary'],
            nest: true,
            include: [{
              model: db.Seller,
              attributes: ['id', 'shopName']
            }, {
              model: db.ProductRating,
              attributes: ['rating']
            }],
            where: {
              name: _defineProperty({}, Op.substring, "".concat(content))
            }
          });
        case 22:
          _productListRaw4 = _context20.sent;
          _context20.next = 25;
          return _productListRaw4.map(function (item) {
            var seller_info = {
              id: item.Seller.id,
              name: item.Seller.shopName
            };
            return {
              id: item.id,
              name: item.name,
              summary: item.summary ? item.summary : "",
              seller_info: seller_info,
              rating: item.ProductRating.rating
            };
          }).filter(function (item) {
            return item.rating >= rating;
          });
        case 25:
          _productListFinal4 = _context20.sent;
          _listLength4 = _productListFinal4.length;
          _pageTotal4 = Math.ceil(_listLength4 / item_limit);
          _productListFinal4 = _(_productListFinal4).drop(offSet).take(item_limit).value();
          _context20.next = 31;
          return Promise.all(_productListFinal4.map( /*#__PURE__*/function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(item) {
              var productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    _context19.next = 2;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productType = _context19.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context19.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context19.sent;
                    return _context19.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      sold: productType.sold,
                      quantity: productType.quantity
                    }));
                  case 9:
                  case "end":
                    return _context19.stop();
                }
              }, _callee19);
            }));
            return function (_x38) {
              return _ref20.apply(this, arguments);
            };
          }()));
        case 31:
          _productListFinalWithImage4 = _context20.sent;
          return _context20.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal4,
              total_items: _listLength4,
              product_list: _productListFinalWithImage4
            },
            EM: 'Get products by search !'
          });
        case 33:
          return _context20.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 36:
          _context20.prev = 36;
          _context20.t0 = _context20["catch"](0);
          console.log(_context20.t0);
          return _context20.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 40:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 36]]);
  }));
  return function getSearchProductsWithPagination(_x33, _x34, _x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var getProductReviews = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(product_id, item_limit, page, rating) {
    var offSet, _yield$db$ProductRevi, count, productReviewList, star_ratings, rating_average, pageTotal, productReviewListRaw, finalData, _yield$db$ProductRevi2, _count, _productReviewList, _star_ratings, product_rating_review, _rating_average, _pageTotal5, _productReviewListRaw, _finalData;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          if (!(item_limit > 0)) {
            _context23.next = 41;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(rating === 0)) {
            _context23.next = 23;
            break;
          }
          _context23.next = 6;
          return db.ProductReview.findAndCountAll({
            raw: true,
            nest: true,
            attributes: ['id', 'comment', 'rating', 'createdAt'],
            include: {
              model: db.Customer,
              attributes: ['id', 'name']
            },
            order: [['createdAt', 'DESC']],
            where: {
              productID: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 6:
          _yield$db$ProductRevi = _context23.sent;
          count = _yield$db$ProductRevi.count;
          productReviewList = _yield$db$ProductRevi.rows;
          star_ratings = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
          };
          _context23.next = 12;
          return productReviewList.forEach(function (item) {
            star_ratings["".concat(item.rating)] += 1;
          });
        case 12:
          rating_average = Math.round(parseFloat((star_ratings['1'] + star_ratings['2'] * 2 + star_ratings['3'] * 3 + star_ratings['4'] * 4 + star_ratings['5'] * 5) / count) * 10) / 10;
          pageTotal = Math.ceil(productReviewList.length / item_limit);
          productReviewListRaw = [];
          productReviewListRaw = _.cloneDeep(productReviewList);
          productReviewListRaw = _(productReviewListRaw).drop(offSet).take(item_limit).value();
          _context23.next = 19;
          return Promise.all(productReviewListRaw.map( /*#__PURE__*/function () {
            var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(item) {
              var customer, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                while (1) switch (_context21.prev = _context21.next) {
                  case 0:
                    customer = item.Customer;
                    if (customer.id) {
                      _context21.next = 6;
                      break;
                    }
                    delete item.Customer;
                    return _context21.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      customer: null,
                      customer_image: ""
                    }));
                  case 6:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "customer_".concat(customer.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context21.next = 10;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 10:
                    url = _context21.sent;
                    return _context21.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      customer: customer,
                      customer_image: url
                    }));
                  case 12:
                  case "end":
                    return _context21.stop();
                }
              }, _callee21);
            }));
            return function (_x43) {
              return _ref22.apply(this, arguments);
            };
          }()));
        case 19:
          finalData = _context23.sent;
          return _context23.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_ratings: count,
              rating_average: rating_average,
              ratings: star_ratings,
              product_reviews: finalData
            },
            EM: 'Get product reviews !'
          });
        case 23:
          _context23.next = 25;
          return db.ProductReview.findAndCountAll({
            raw: true,
            nest: true,
            attributes: ['id', 'comment', 'rating', 'createdAt'],
            include: {
              model: db.Customer,
              attributes: ['id', 'name']
            },
            order: [['createdAt', 'DESC']],
            where: {
              productID: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 25:
          _yield$db$ProductRevi2 = _context23.sent;
          _count = _yield$db$ProductRevi2.count;
          _productReviewList = _yield$db$ProductRevi2.rows;
          _star_ratings = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
          };
          product_rating_review = _productReviewList.filter(function (review) {
            return review.rating === rating;
          });
          _context23.next = 32;
          return _productReviewList.forEach(function (item) {
            _star_ratings["".concat(item.rating)] += 1;
          });
        case 32:
          _rating_average = Math.round(parseFloat((_star_ratings['1'] + _star_ratings['2'] * 2 + _star_ratings['3'] * 3 + _star_ratings['4'] * 4 + _star_ratings['5'] * 5) / _count) * 10) / 10;
          _pageTotal5 = Math.ceil(product_rating_review.length / item_limit);
          _productReviewListRaw = [];
          _productReviewListRaw = _.cloneDeep(product_rating_review);
          _productReviewListRaw = _(_productReviewListRaw).drop(offSet).take(item_limit).value();
          _context23.next = 39;
          return Promise.all(_productReviewListRaw.map( /*#__PURE__*/function () {
            var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(item) {
              var customer, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee22$(_context22) {
                while (1) switch (_context22.prev = _context22.next) {
                  case 0:
                    customer = item.Customer;
                    if (customer.id) {
                      _context22.next = 6;
                      break;
                    }
                    delete item.Customer;
                    return _context22.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      customer: null,
                      customer_image: ""
                    }));
                  case 6:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "customer_".concat(customer.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context22.next = 10;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 10:
                    url = _context22.sent;
                    return _context22.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      customer: customer,
                      customer_image: url
                    }));
                  case 12:
                  case "end":
                    return _context22.stop();
                }
              }, _callee22);
            }));
            return function (_x44) {
              return _ref23.apply(this, arguments);
            };
          }()));
        case 39:
          _finalData = _context23.sent;
          return _context23.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal5,
              total_ratings: _count,
              rating_average: _rating_average,
              ratings: _star_ratings,
              product_reviews: _finalData
            },
            EM: 'Get product reviews !'
          });
        case 41:
          return _context23.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 44:
          _context23.prev = 44;
          _context23.t0 = _context23["catch"](0);
          console.log(_context23.t0);
          return _context23.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 48:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 44]]);
  }));
  return function getProductReviews(_x39, _x40, _x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
module.exports = {
  getProductsByCategory: getProductsByCategory,
  getProductsBySubCategory: getProductsBySubCategory,
  getSearchProducts: getSearchProducts,
  getProductDetail: getProductDetail,
  getProductReviews: getProductReviews,
  getSearchProductsWithPagination: getSearchProductsWithPagination,
  getProductsHistory: getProductsHistory,
  getProductsHistorySwiper: getProductsHistorySwiper,
  getProductDetailShopInfo: getProductDetailShopInfo,
  getProductsByShopCategory: getProductsByShopCategory,
  getShopInfo: getShopInfo
};