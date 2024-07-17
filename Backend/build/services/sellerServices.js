"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var path = require('path');
var fs = require('fs-extra');
_dotenv["default"].config();
var _require2 = require("@aws-sdk/client-s3"),
  S3Client = _require2.S3Client,
  GetObjectCommand = _require2.GetObjectCommand,
  PutObjectCommand = _require2.PutObjectCommand,
  DeleteObjectCommand = _require2.DeleteObjectCommand;
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
var SORT_TYPE_ORDER = [['desc'], ['asc']];
var handleSortData = function handleSortData(data, sort_id, off_set, limit) {
  if (sort_id === 0) {
    var pagination_data = _(data).drop(off_set).take(limit).value();
    return pagination_data;
  } else {
    var type_order = SORT_TYPE_ORDER[sort_id - 1];
    var _pagination_data = _(data).orderBy(['current_price'], type_order).drop(off_set).take(limit).value();
    return _pagination_data;
  }
};
var singleFileUpload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(fileObject, product_id) {
    var extName, uploadPath, finalName, finalPath;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          extName = path.extname(fileObject.name);
          uploadPath = path.resolve(__dirname, '../../../Frontend/src/assets/img/products');
          finalName = "".concat(product_id, ".jpeg");
          finalPath = "".concat(uploadPath, "/").concat(finalName);
          _context.prev = 4;
          _context.next = 7;
          return fileObject.mv(finalPath);
        case 7:
          return _context.abrupt("return", {
            EC: 0,
            DT: "",
            EM: "Upload image successfully "
          });
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);
          return _context.abrupt("return", {
            EC: -1,
            DT: "",
            EM: "Upload image failed "
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 10]]);
  }));
  return function singleFileUpload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getProductPagination = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(shop_seller_id, item_limit, page, category_id, sub_category_id, sort_id) {
    var offSet, subCategoryList, sub_category_list, productListRaw, listLength, pageTotal, productListFormat, productListFormatPangination, _productListRaw, _listLength, _pageTotal, _productListFormat, _productListFormatPangination, _productListRaw2, _productListFormat2, _listLength2, _pageTotal2, _productListFormatPangination2, productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!(item_limit > 0)) {
            _context5.next = 47;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(category_id !== 0 && sub_category_id === 0)) {
            _context5.next = 22;
            break;
          }
          _context5.next = 6;
          return db.SubCategory.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'title'],
            where: {
              categoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 6:
          subCategoryList = _context5.sent;
          _context5.next = 9;
          return subCategoryList.map(function (item) {
            return item.id;
          });
        case 9:
          sub_category_list = _context5.sent;
          _context5.next = 12;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: {
              model: db.Product,
              raw: true,
              nest: true,
              attributes: ['id', 'name', 'summary'],
              include: {
                model: db.ProductType,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
              },
              where: {
                shop_id: _defineProperty({}, Op.eq, shop_seller_id)
              }
            },
            where: {
              subCategoryID: _defineProperty({}, Op["in"], sub_category_list)
            }
          });
        case 12:
          productListRaw = _context5.sent;
          listLength = productListRaw.length;
          pageTotal = Math.ceil(listLength / item_limit);
          _context5.next = 17;
          return Promise.all(productListRaw.map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(product) {
              var productInfo, productType, productSubCategory, getObjectParams, command, url, sub_category;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    productInfo = product.Product;
                    productType = productInfo.ProductType;
                    _context2.next = 4;
                    return db.ProductSubCategory.findOne({
                      raw: true,
                      nest: true,
                      include: {
                        model: db.SubCategory,
                        attributes: ['id', 'title']
                      },
                      where: {
                        productID: _defineProperty({}, Op.eq, +productInfo.id)
                      }
                    });
                  case 4:
                    productSubCategory = _context2.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context2.next = 9;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 9:
                    url = _context2.sent;
                    sub_category = productSubCategory.SubCategory;
                    return _context2.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      summary: productInfo.summary,
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      quantity: productType.quantity,
                      sold: productType.sold,
                      sub_category: {
                        id: sub_category.id !== null ? sub_category.id : null,
                        title: sub_category.title !== null ? sub_category.title : ""
                      }
                    });
                  case 12:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x9) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 17:
          productListFormat = _context5.sent;
          productListFormatPangination = handleSortData(productListFormat, sort_id, offSet, item_limit);
          return _context5.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: productListFormatPangination
            },
            EM: 'Get products !'
          });
        case 22:
          if (!(sub_category_id !== 0)) {
            _context5.next = 35;
            break;
          }
          _context5.next = 25;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: {
              model: db.Product,
              raw: true,
              nest: true,
              attributes: ['id', 'name', 'summary'],
              include: {
                model: db.ProductType,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
              },
              where: {
                shop_id: _defineProperty({}, Op.eq, shop_seller_id)
              }
            },
            where: {
              subCategoryID: _defineProperty({}, Op.eq, sub_category_id)
            }
          });
        case 25:
          _productListRaw = _context5.sent;
          _listLength = _productListRaw.length;
          _pageTotal = Math.ceil(_listLength / item_limit);
          _context5.next = 30;
          return Promise.all(_productListRaw.map( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(product) {
              var productInfo, productType, productSubCategory, getObjectParams, command, url, sub_category;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    productInfo = product.Product;
                    productType = productInfo.ProductType;
                    _context3.next = 4;
                    return db.ProductSubCategory.findOne({
                      raw: true,
                      nest: true,
                      include: {
                        model: db.SubCategory,
                        attributes: ['id', 'title']
                      },
                      where: {
                        productID: _defineProperty({}, Op.eq, +productInfo.id)
                      }
                    });
                  case 4:
                    productSubCategory = _context3.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context3.next = 9;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 9:
                    url = _context3.sent;
                    sub_category = productSubCategory.SubCategory;
                    return _context3.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      summary: productInfo.summary,
                      image: url,
                      current_price: productType.currentPrice,
                      price: productType.price,
                      quantity: productType.quantity,
                      sold: productType.sold,
                      sub_category: {
                        id: sub_category.id !== null ? sub_category.id : null,
                        title: sub_category.title !== null ? sub_category.title : ""
                      }
                    });
                  case 12:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x10) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 30:
          _productListFormat = _context5.sent;
          _productListFormatPangination = handleSortData(_productListFormat, sort_id, offSet, item_limit);
          return _context5.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal,
              total_items: _listLength,
              product_list: _productListFormatPangination
            },
            EM: 'Get products !'
          });
        case 35:
          _context5.next = 37;
          return db.Product.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'summary'],
            include: {
              model: db.ProductType,
              attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
            },
            where: {
              shop_id: _defineProperty({}, Op.eq, shop_seller_id)
            }
          });
        case 37:
          _productListRaw2 = _context5.sent;
          _productListFormat2 = _productListRaw2.map(function (product) {
            var productType = product.ProductType;
            return _objectSpread(_objectSpread({}, product), {}, {
              current_price: productType.currentPrice,
              price: productType.price,
              quantity: productType.quantity,
              sold: productType.sold
            });
          });
          _productListFormat2.reverse();
          _listLength2 = _productListRaw2.length;
          _pageTotal2 = Math.ceil(_listLength2 / item_limit);
          _productListFormatPangination2 = handleSortData(_productListFormat2, sort_id, offSet, item_limit);
          _context5.next = 45;
          return Promise.all(_productListFormatPangination2.map( /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(item) {
              var productSubCategory, getObjectParams, command, url, sub_category;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return db.ProductSubCategory.findOne({
                      raw: true,
                      nest: true,
                      include: {
                        model: db.SubCategory,
                        attributes: ['id', 'title']
                      },
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productSubCategory = _context4.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context4.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context4.sent;
                    sub_category = productSubCategory.SubCategory;
                    return _context4.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: url,
                      sub_category: {
                        id: sub_category.id !== null ? sub_category.id : null,
                        title: sub_category.title !== null ? sub_category.title : ""
                      }
                    }));
                  case 10:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x11) {
              return _ref5.apply(this, arguments);
            };
          }()));
        case 45:
          productListFinalWithImage = _context5.sent;
          return _context5.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal2,
              total_items: _listLength2,
              product_list: productListFinalWithImage
            },
            EM: 'Get products !'
          });
        case 47:
          return _context5.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 50:
          _context5.prev = 50;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 54:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 50]]);
  }));
  return function getProductPagination(_x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
var getProductSearch = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(shop_seller_id, product_id) {
    var productInfo, productType, productSubCategory, sub_category, data;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return db.Product.findOne({
            raw: true,
            attributes: ['id', 'name', 'summary'],
            where: _defineProperty({}, Op.and, [{
              id: _defineProperty({}, Op.eq, +product_id)
            }, {
              shop_id: _defineProperty({}, Op.eq, +shop_seller_id)
            }])
          });
        case 3:
          productInfo = _context6.sent;
          if (!productInfo) {
            _context6.next = 16;
            break;
          }
          _context6.next = 7;
          return db.ProductType.findOne({
            raw: true,
            attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
            where: {
              productID: _defineProperty({}, Op.eq, productInfo.id)
            }
          });
        case 7:
          productType = _context6.sent;
          _context6.next = 10;
          return db.ProductSubCategory.findOne({
            raw: true,
            nest: true,
            include: {
              model: db.SubCategory,
              attributes: ['id', 'title']
            },
            where: {
              productID: _defineProperty({}, Op.eq, productInfo.id)
            }
          });
        case 10:
          productSubCategory = _context6.sent;
          // const getObjectParams = {
          //     Bucket: bucketName,
          //     Key: `${item.id}.jpeg`
          // }
          // const command = new GetObjectCommand(getObjectParams);
          // const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          sub_category = productSubCategory.SubCategory;
          data = {
            id: productInfo.id,
            name: productInfo.name,
            summary: productInfo.summary,
            //image: url,
            image: "",
            current_price: productType.currentPrice,
            price: productType.price,
            quantity: productType.quantity,
            sold: productType.sold,
            sub_category: {
              id: sub_category.id !== null ? sub_category.id : null,
              title: sub_category.title !== null ? sub_category.title : ""
            }
          };
          return _context6.abrupt("return", {
            EC: 0,
            DT: {
              product_list: [data]
            },
            EM: 'Get product search !'
          });
        case 16:
          return _context6.abrupt("return", {
            EC: 0,
            DT: {
              product_list: []
            },
            EM: 'Get product search !'
          });
        case 17:
          _context6.next = 23;
          break;
        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 23:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 19]]);
  }));
  return function getProductSearch(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
var createNewProduct = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data, img_file) {
    var newProduct, product_info, imageName, params, command;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return db.Product.create({
            name: data.name,
            summary: data.summary,
            shop_id: data.seller_id
          });
        case 3:
          newProduct = _context7.sent;
          if (!newProduct) {
            _context7.next = 26;
            break;
          }
          product_info = newProduct.dataValues;
          _context7.next = 8;
          return db.ProductType.create({
            quantity: data.quantity,
            currentPrice: data.currentPrice === 0 ? data.price : data.currentPrice,
            price: data.price,
            productID: product_info.id,
            sold: 0
          });
        case 8:
          _context7.next = 10;
          return db.ProductSubCategory.create({
            productID: product_info.id,
            subCategoryID: data.sub_category_id
          });
        case 10:
          _context7.next = 12;
          return db.ProductRating.create({
            productID: product_info.id,
            rating: 0
          });
        case 12:
          _context7.next = 14;
          return db.ProductTracking.create({
            productID: product_info.id,
            view: 0,
            recommend: 0,
            recommend_view: 0
          });
        case 14:
          if (!(img_file && img_file !== "")) {
            _context7.next = 23;
            break;
          }
          imageName = "".concat(product_info.id, ".jpeg");
          params = {
            Bucket: bucketName,
            Key: imageName,
            Body: img_file.buffer,
            ContentType: img_file.mimetype
          };
          command = new PutObjectCommand(params);
          _context7.next = 20;
          return s3.send(command);
        case 20:
          return _context7.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Thêm sản phẩm thành công!'
          });
        case 23:
          return _context7.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Thêm sản phẩm thành công!'
          });
        case 24:
          _context7.next = 27;
          break;
        case 26:
          return _context7.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Thêm sản phẩm thất bại!'
          });
        case 27:
          _context7.next = 33;
          break;
        case 29:
          _context7.prev = 29;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", null);
        case 33:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 29]]);
  }));
  return function createNewProduct(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
var updateProduct = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return db.Product.update({
            name: data.name,
            summary: data.summary,
            shop_id: data.seller_id
          }, {
            where: {
              id: +data.id
            }
          });
        case 3:
          _context8.next = 5;
          return db.ProductType.update({
            quantity: data.quantity,
            price: data.price,
            currentPrice: data.currentPrice
          }, {
            where: {
              productID: +data.id
            }
          });
        case 5:
          _context8.next = 7;
          return db.ProductSubCategory.update({
            subCategoryID: data.sub_category_id
          }, {
            where: {
              productID: +data.id
            }
          });
        case 7:
          return _context8.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Cập nhật sản phẩm thành công!'
          });
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", null);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function updateProduct(_x16) {
    return _ref8.apply(this, arguments);
  };
}();
var deleteProduct = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(product_id) {
    var wishListItem, cartItem, orderItem, getObjectParams, command;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return db.WishList.findOne({
            raw: true,
            attributes: ['id'],
            where: {
              productID: _defineProperty({}, Op.eq, +product_id)
            }
          });
        case 3:
          wishListItem = _context9.sent;
          _context9.next = 6;
          return db.CartItem.findOne({
            raw: true,
            attributes: ['id'],
            where: {
              productID: _defineProperty({}, Op.eq, +product_id)
            }
          });
        case 6:
          cartItem = _context9.sent;
          _context9.next = 9;
          return db.OrderItem.findOne({
            raw: true,
            attributes: ['id'],
            where: {
              productID: _defineProperty({}, Op.eq, +product_id)
            }
          });
        case 9:
          orderItem = _context9.sent;
          if (!(wishListItem || cartItem || orderItem)) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", {
            EC: -1,
            DT: '',
            EM: 'Không thể xóa sản phẩm !'
          });
        case 14:
          _context9.next = 16;
          return db.Product.destroy({
            where: {
              id: +product_id
            }
          });
        case 16:
          _context9.next = 18;
          return db.ProductType.destroy({
            where: {
              productID: +product_id
            }
          });
        case 18:
          _context9.next = 20;
          return db.ProductSubCategory.destroy({
            where: {
              productID: +product_id
            }
          });
        case 20:
          _context9.next = 22;
          return db.ProductTracking.destroy({
            where: {
              productID: +product_id
            }
          });
        case 22:
          _context9.next = 24;
          return db.ProductRating.destroy({
            where: {
              productID: +product_id
            }
          });
        case 24:
          getObjectParams = {
            Bucket: bucketName,
            Key: "".concat(product_id, ".jpeg")
          };
          command = new DeleteObjectCommand(getObjectParams);
          _context9.next = 28;
          return s3.send(command);
        case 28:
          return _context9.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Xóa sản phẩm thành công !'
          });
        case 29:
          _context9.next = 35;
          break;
        case 31:
          _context9.prev = 31;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 35:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 31]]);
  }));
  return function deleteProduct(_x17) {
    return _ref9.apply(this, arguments);
  };
}();
var getAllCategories = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var categoryData, sortedCategoryList;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return db.Category.findAll({
            raw: true,
            attributes: ['id', 'title']
          });
        case 3:
          categoryData = _context10.sent;
          sortedCategoryList = _.orderBy(categoryData, [function (category) {
            return category.title.toLowerCase();
          }], ['asc']);
          return _context10.abrupt("return", {
            EC: 0,
            DT: sortedCategoryList,
            EM: 'Get all categories successfully !'
          });
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function getAllCategories() {
    return _ref10.apply(this, arguments);
  };
}();
var getSubCategoriesByCategory = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(category_id) {
    var subCategoryData, sortedSubCategoryList;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
              categoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 3:
          subCategoryData = _context11.sent;
          sortedSubCategoryList = _.orderBy(subCategoryData, [function (sub_category) {
            return sub_category.title.toLowerCase();
          }], ['asc']);
          return _context11.abrupt("return", {
            EC: 0,
            DT: sortedSubCategoryList,
            EM: 'Get subcategories successfully !'
          });
        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 12:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 8]]);
  }));
  return function getSubCategoriesByCategory(_x18) {
    return _ref11.apply(this, arguments);
  };
}();
var handleCreateVertificationCode = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(data) {
    var code, email, existCode, result, _result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          code = data.code, email = data.email;
          _context12.next = 4;
          return db.CodeVertification.findAll({
            raw: true,
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 4:
          existCode = _context12.sent;
          if (!(existCode.length > 0)) {
            _context12.next = 16;
            break;
          }
          _context12.next = 8;
          return db.CodeVertification.destroy({
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 8:
          _context12.next = 10;
          return db.CodeVertification.create({
            email: email,
            code: code,
            createdAt: new Date()
          });
        case 10:
          result = _context12.sent;
          if (!result) {
            _context12.next = 13;
            break;
          }
          return _context12.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Create new OTP code successfully !'
          });
        case 13:
          return _context12.abrupt("return", {
            EC: 1,
            DT: '',
            EM: 'Create new OTP code failed !'
          });
        case 16:
          _context12.next = 18;
          return db.CodeVertification.destroy({
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 18:
          _context12.next = 20;
          return db.CodeVertification.create({
            email: email,
            code: code,
            createdAt: new Date()
          });
        case 20:
          _result = _context12.sent;
          if (!_result) {
            _context12.next = 23;
            break;
          }
          return _context12.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Create new OTP code successfully !'
          });
        case 23:
          return _context12.abrupt("return", {
            EC: 1,
            DT: '',
            EM: 'Create new OTP code failed !'
          });
        case 24:
          _context12.next = 30;
          break;
        case 26:
          _context12.prev = 26;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          return _context12.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 30:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 26]]);
  }));
  return function handleCreateVertificationCode(_x19) {
    return _ref12.apply(this, arguments);
  };
}();
var handleOTPVertification = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data) {
    var otp, email, result, otpTimeStart, date, otpTimeNow, time_span;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          otp = data.otp, email = data.email;
          _context13.next = 4;
          return db.CodeVertification.findOne({
            raw: true,
            attributes: ['id', 'code', 'createdAT'],
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 4:
          result = _context13.sent;
          if (!result) {
            _context13.next = 15;
            break;
          }
          otpTimeStart = result.createdAT.getTime(); //miliseconds
          date = new Date();
          otpTimeNow = date.getTime(); //miliseconds
          time_span = otpTimeNow - otpTimeStart; // otp valid: time_span < 600000 (milisecond) (10 minute) | otp invalid: time_span > 600000 (milisecond) (10 minute)
          if (!(result.code === otp && time_span < process.env.OTP_TIME_DURATION)) {
            _context13.next = 14;
            break;
          }
          _context13.next = 13;
          return db.CodeVertification.destroy({
            where: {
              email: _defineProperty({}, Op.eq, email)
            }
          });
        case 13:
          return _context13.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Mã OTP hợp lệ !'
          });
        case 14:
          return _context13.abrupt("return", {
            EC: 1,
            DT: "",
            EM: 'Mã OTP không hợp lệ !'
          });
        case 15:
          return _context13.abrupt("return", {
            EC: 1,
            DT: "",
            EM: 'Mã OTP không hợp lệ !'
          });
        case 18:
          _context13.prev = 18;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 22:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 18]]);
  }));
  return function handleOTPVertification(_x20) {
    return _ref13.apply(this, arguments);
  };
}();
var getSellerInfo = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(seller_id) {
    var sellerInfo, getObjectParams, command, url;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return db.Seller.findOne({
            raw: true,
            attributes: ['id', 'name', 'mobile', 'gender', 'birth', 'email'],
            where: {
              id: _defineProperty({}, Op.eq, +seller_id)
            }
          });
        case 3:
          sellerInfo = _context14.sent;
          getObjectParams = {
            Bucket: bucketName,
            Key: "seller_".concat(seller_id, ".jpeg")
          };
          command = new GetObjectCommand(getObjectParams);
          _context14.next = 8;
          return getSignedUrl(s3, command, {
            expiresIn: 3600
          });
        case 8:
          url = _context14.sent;
          return _context14.abrupt("return", {
            EC: 0,
            DT: _objectSpread(_objectSpread({}, sellerInfo), {}, {
              image: url
            }),
            EM: 'Seller Info !'
          });
        case 12:
          _context14.prev = 12;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          return _context14.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 16:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 12]]);
  }));
  return function getSellerInfo(_x21) {
    return _ref14.apply(this, arguments);
  };
}();
var getSellerShopInfo = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(seller_id) {
    var shopInfo, getObjectParams, command, url;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return db.Seller.findOne({
            raw: true,
            attributes: ['id', 'shopName', 'intro'],
            where: {
              id: _defineProperty({}, Op.eq, +seller_id)
            }
          });
        case 3:
          shopInfo = _context15.sent;
          getObjectParams = {
            Bucket: bucketName,
            Key: "shop_".concat(seller_id, ".jpeg")
          };
          command = new GetObjectCommand(getObjectParams);
          _context15.next = 8;
          return getSignedUrl(s3, command, {
            expiresIn: 3600
          });
        case 8:
          url = _context15.sent;
          return _context15.abrupt("return", {
            EC: 0,
            DT: _objectSpread(_objectSpread({}, shopInfo), {}, {
              image: url
            }),
            EM: 'Shop Info !'
          });
        case 12:
          _context15.prev = 12;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          return _context15.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 16:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 12]]);
  }));
  return function getSellerShopInfo(_x22) {
    return _ref15.apply(this, arguments);
  };
}();
var updateSellerInfo = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(data, image_file) {
    var id, imageName, params, command;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          id = data.id;
          if (!(image_file && image_file !== "")) {
            _context16.next = 13;
            break;
          }
          imageName = "seller_".concat(id, ".jpeg");
          params = {
            Bucket: bucketName,
            Key: imageName,
            Body: image_file.buffer,
            ContentType: image_file.mimetype
          };
          command = new PutObjectCommand(params);
          _context16.next = 8;
          return s3.send(command);
        case 8:
          _context16.next = 10;
          return db.Seller.update({
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
          return _context16.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin thành công'
          });
        case 13:
          _context16.next = 15;
          return db.Seller.update({
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
          return _context16.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin thành công'
          });
        case 16:
          _context16.next = 22;
          break;
        case 18:
          _context16.prev = 18;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 22:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 18]]);
  }));
  return function updateSellerInfo(_x23, _x24) {
    return _ref16.apply(this, arguments);
  };
}();
var updateShopInfo = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(data, image_file) {
    var id, imageName, params, command;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          id = data.id;
          if (!(image_file && image_file !== "")) {
            _context17.next = 13;
            break;
          }
          imageName = "shop_".concat(id, ".jpeg");
          params = {
            Bucket: bucketName,
            Key: imageName,
            Body: image_file.buffer,
            ContentType: image_file.mimetype
          };
          command = new PutObjectCommand(params);
          _context17.next = 8;
          return s3.send(command);
        case 8:
          _context17.next = 10;
          return db.Seller.update({
            shopName: data.shopName,
            intro: data.intro
          }, {
            where: {
              id: +id
            }
          });
        case 10:
          return _context17.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin shop thành công'
          });
        case 13:
          _context17.next = 15;
          return db.Seller.update({
            shopName: data.shopName,
            intro: data.intro
          }, {
            where: {
              id: +id
            }
          });
        case 15:
          return _context17.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin shop thành công'
          });
        case 16:
          _context17.next = 22;
          break;
        case 18:
          _context17.prev = 18;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);
          return _context17.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 22:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 18]]);
  }));
  return function updateShopInfo(_x25, _x26) {
    return _ref17.apply(this, arguments);
  };
}();
var getOrderPagination = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(shop_seller_id, item_limit, page, status, startDate, endDate) {
    var offSet, orderListRaw, start_date, end_date, listLength, pageTotal, order_list_data, _orderListRaw, _start_date, _end_date, _order_list_data, filter_order_list_data, _listLength3, _pageTotal3, paginate_order_list_data;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          if (!(item_limit > 0)) {
            _context20.next = 31;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(status == 0)) {
            _context20.next = 18;
            break;
          }
          _context20.next = 6;
          return db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
              sellerID: _defineProperty({}, Op.eq, shop_seller_id)
            }
          });
        case 6:
          orderListRaw = _context20.sent;
          if (+startDate !== 0 && +endDate !== 0) {
            start_date = new Date(startDate);
            end_date = new Date(endDate);
            if (start_date.getTime() !== end_date.getTime()) {
              orderListRaw = orderListRaw.filter(function (order) {
                return order.orderDate >= start_date && order.orderDate <= end_date;
              });
            } else {
              orderListRaw = orderListRaw.filter(function (order) {
                var order_date = new Date(order.orderDate);
                var order_month = order_date.getMonth() + 1; // months from 1-12
                var order_day = order_date.getDate();
                var order_year = order_date.getFullYear();
                var month = start_date.getMonth() + 1; // months from 1-12
                var day = start_date.getDate();
                var year = start_date.getFullYear();
                return order_day === day && order_month === month && order_year === year;
              });
            }
          }
          listLength = orderListRaw.length;
          pageTotal = Math.ceil(listLength / item_limit);
          orderListRaw.reverse();
          orderListRaw = _(orderListRaw).drop(offSet).take(item_limit).value();
          _context20.next = 14;
          return Promise.all(orderListRaw.map( /*#__PURE__*/function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(item) {
              var order_status_raw, order_status_info, order_status;
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    _context18.next = 2;
                    return db.Shipment.findAll({
                      limit: 1,
                      raw: true,
                      nest: true,
                      attributes: ['id', 'updatedDate'],
                      include: {
                        model: db.ShipmentStatus,
                        attributes: ['id', 'name']
                      },
                      where: {
                        orderID: _defineProperty({}, Op.eq, +item.id)
                      },
                      order: [['updatedDate', 'DESC'], ['status', 'DESC']]
                    });
                  case 2:
                    order_status_raw = _context18.sent;
                    order_status_info = order_status_raw[0];
                    order_status = order_status_info.ShipmentStatus;
                    return _context18.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      status: order_status
                    }));
                  case 6:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18);
            }));
            return function (_x33) {
              return _ref19.apply(this, arguments);
            };
          }()));
        case 14:
          order_list_data = _context20.sent;
          return _context20.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              order_list: order_list_data
            },
            EM: 'Get all orders !'
          });
        case 18:
          _context20.next = 20;
          return db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
              sellerID: _defineProperty({}, Op.eq, shop_seller_id)
            }
          });
        case 20:
          _orderListRaw = _context20.sent;
          if (+startDate !== 0 && +endDate !== 0) {
            _start_date = new Date(startDate);
            _end_date = new Date(endDate);
            if (_start_date.getTime() !== _end_date.getTime()) {
              _orderListRaw = _orderListRaw.filter(function (order) {
                return order.orderDate >= _start_date && order.orderDate <= _end_date;
              });
            } else {
              _orderListRaw = _orderListRaw.filter(function (order) {
                var order_date = new Date(order.orderDate);
                var order_month = order_date.getMonth() + 1; // months from 1-12
                var order_day = order_date.getDate();
                var order_year = order_date.getFullYear();
                var month = _start_date.getMonth() + 1; // months from 1-12
                var day = _start_date.getDate();
                var year = _start_date.getFullYear();
                return order_day === day && order_month === month && order_year === year;
              });
            }
          }
          _orderListRaw.reverse();
          //orderListRaw = _(orderListRaw).drop(offSet).take(item_limit).value();
          _context20.next = 25;
          return Promise.all(_orderListRaw.map( /*#__PURE__*/function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(item) {
              var order_status_raw, order_status_info, order_status;
              return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    _context19.next = 2;
                    return db.Shipment.findAll({
                      limit: 1,
                      raw: true,
                      nest: true,
                      attributes: ['id', 'updatedDate'],
                      include: {
                        model: db.ShipmentStatus,
                        attributes: ['id', 'name']
                      },
                      where: {
                        orderID: _defineProperty({}, Op.eq, +item.id)
                      },
                      order: [['updatedDate', 'DESC'], ['status', 'DESC']]
                    });
                  case 2:
                    order_status_raw = _context19.sent;
                    order_status_info = order_status_raw[0];
                    order_status = order_status_info.ShipmentStatus;
                    return _context19.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      status: order_status
                    }));
                  case 6:
                  case "end":
                    return _context19.stop();
                }
              }, _callee19);
            }));
            return function (_x34) {
              return _ref20.apply(this, arguments);
            };
          }()));
        case 25:
          _order_list_data = _context20.sent;
          filter_order_list_data = _order_list_data.filter(function (item) {
            return item.status.id === status;
          });
          _listLength3 = filter_order_list_data.length;
          _pageTotal3 = Math.ceil(_listLength3 / item_limit);
          paginate_order_list_data = _(filter_order_list_data).drop(offSet).take(item_limit).value();
          return _context20.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal3,
              total_items: _listLength3,
              order_list: paginate_order_list_data
            },
            EM: 'Get orders by status !'
          });
        case 31:
          return _context20.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 34:
          _context20.prev = 34;
          _context20.t0 = _context20["catch"](0);
          console.log(_context20.t0);
          return _context20.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 38:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 34]]);
  }));
  return function getOrderPagination(_x27, _x28, _x29, _x30, _x31, _x32) {
    return _ref18.apply(this, arguments);
  };
}();
var getOrderDetail = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(order_id) {
    var order_info, shippingMethod, shippingUnit, customer_name, order_item_list, order_item_list_format, transaction_info, transactionPaymentMethod, order_status_info, order_status;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return db.Order.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'orderDate', 'totalPrice', 'shipFee', 'fullName', 'phone', 'address'],
            include: [{
              model: db.ShippingMethod,
              attributes: ['id', 'nameMethod', 'price']
            }, {
              model: db.ShippingUnit,
              attributes: ['id', 'nameUnit']
            }, {
              model: db.Customer,
              attributes: ['name']
            }],
            where: {
              id: _defineProperty({}, Op.eq, order_id)
            }
          });
        case 3:
          order_info = _context22.sent;
          shippingMethod = order_info.ShippingMethod.nameMethod;
          shippingUnit = order_info.ShippingUnit;
          customer_name = order_info.Customer.name;
          _context22.next = 9;
          return db.OrderItem.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'price'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name']
            }],
            where: {
              orderID: _defineProperty({}, Op.eq, +order_id)
            }
          });
        case 9:
          order_item_list = _context22.sent;
          _context22.next = 12;
          return Promise.all(order_item_list.map( /*#__PURE__*/function () {
            var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(order_item) {
              var orderItem, productInfo, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                while (1) switch (_context21.prev = _context21.next) {
                  case 0:
                    orderItem = order_item;
                    productInfo = orderItem.Product;
                    delete orderItem.Product;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context21.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context21.sent;
                    return _context21.abrupt("return", _objectSpread(_objectSpread({}, orderItem), {}, {
                      product_id: productInfo.id,
                      product_name: productInfo.name,
                      product_image: url
                    }));
                  case 9:
                  case "end":
                    return _context21.stop();
                }
              }, _callee21);
            }));
            return function (_x36) {
              return _ref22.apply(this, arguments);
            };
          }()));
        case 12:
          order_item_list_format = _context22.sent;
          _context22.next = 15;
          return db.Transaction.findOne({
            raw: true,
            nest: true,
            attributes: [],
            include: {
              model: db.TransactionPaymentMethod,
              attributes: ['id', 'method_name']
            },
            where: {
              orderID: _defineProperty({}, Op.eq, +order_id)
            }
          });
        case 15:
          transaction_info = _context22.sent;
          transactionPaymentMethod = transaction_info.TransactionPaymentMethod.method_name;
          _context22.next = 19;
          return db.Shipment.findAll({
            limit: 1,
            raw: true,
            nest: true,
            attributes: ['id', 'updatedDate'],
            include: {
              model: db.ShipmentStatus,
              attributes: ['id', 'name']
            },
            where: {
              orderID: _defineProperty({}, Op.eq, +order_id)
            },
            order: [['updatedDate', 'DESC']]
          });
        case 19:
          order_status_info = _context22.sent;
          order_status = order_status_info[0].ShipmentStatus.name;
          return _context22.abrupt("return", {
            EC: 0,
            DT: {
              id: order_info.id,
              orderDate: order_info.orderDate,
              totalPrice: order_info.totalPrice,
              shipFee: order_info.shipFee,
              order_address: {
                customer_name: customer_name,
                name: order_info.fullName,
                phone: order_info.phone,
                address: order_info.address
              },
              order_item_list: order_item_list_format,
              payment_method: transactionPaymentMethod,
              shipping_unit: shippingUnit.nameUnit,
              shipping_method: shippingMethod,
              status: order_status
            },
            EM: 'Get order detail'
          });
        case 24:
          _context22.prev = 24;
          _context22.t0 = _context22["catch"](0);
          console.log(_context22.t0);
          return _context22.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 28:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 24]]);
  }));
  return function getOrderDetail(_x35) {
    return _ref21.apply(this, arguments);
  };
}();
var confirmCustomerOrder = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(order_id, packing) {
    var date, result, _result2;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          // order_status: 2 - Chờ xác nhận, 3 - Đang đóng gói
          date = new Date();
          if (packing) {
            _context23.next = 13;
            break;
          }
          _context23.next = 5;
          return db.Shipment.create({
            status: 2,
            updatedDate: date,
            orderID: order_id
          });
        case 5:
          result = _context23.sent;
          if (!result) {
            _context23.next = 10;
            break;
          }
          return _context23.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Xác nhận đơn hàng thành công'
          });
        case 10:
          return _context23.abrupt("return", {
            EC: -1,
            DT: '',
            EM: 'Xác nhận đơn hàng thất bại'
          });
        case 11:
          _context23.next = 21;
          break;
        case 13:
          _context23.next = 15;
          return db.Shipment.bulkCreate([{
            status: 2,
            updatedDate: date,
            orderID: order_id
          }, {
            status: 3,
            updatedDate: date,
            orderID: order_id
          }]);
        case 15:
          _result2 = _context23.sent;
          if (!_result2) {
            _context23.next = 20;
            break;
          }
          return _context23.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Đơn hàng đã xác nhận và đang đóng gói'
          });
        case 20:
          return _context23.abrupt("return", {
            EC: -1,
            DT: '',
            EM: 'Xác nhận đơn hàng thất bại'
          });
        case 21:
          _context23.next = 27;
          break;
        case 23:
          _context23.prev = 23;
          _context23.t0 = _context23["catch"](0);
          console.log(_context23.t0);
          return _context23.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 27:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 23]]);
  }));
  return function confirmCustomerOrder(_x37, _x38) {
    return _ref23.apply(this, arguments);
  };
}();
var packingCustomerOrder = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(order_id) {
    var date, result;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          // order_status: 2 - Chờ xác nhận, 3 - Đang đóng gói
          date = new Date();
          _context24.next = 4;
          return db.Shipment.create({
            status: 3,
            updatedDate: date,
            orderID: order_id
          });
        case 4:
          result = _context24.sent;
          if (!result) {
            _context24.next = 9;
            break;
          }
          return _context24.abrupt("return", {
            EC: 0,
            DT: '',
            EM: 'Đơn hàng đang đóng gói'
          });
        case 9:
          return _context24.abrupt("return", {
            EC: -1,
            DT: '',
            EM: 'Xác nhận đơn hàng thất bại'
          });
        case 10:
          _context24.next = 16;
          break;
        case 12:
          _context24.prev = 12;
          _context24.t0 = _context24["catch"](0);
          console.log(_context24.t0);
          return _context24.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 16:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 12]]);
  }));
  return function packingCustomerOrder(_x39) {
    return _ref24.apply(this, arguments);
  };
}();
var getShopCategory = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(seller_id) {
    var categoryList, format_category_list;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
              shopID: _defineProperty({}, Op.eq, +seller_id)
            }
          });
        case 3:
          categoryList = _context26.sent;
          if (!(categoryList.length === 0)) {
            _context26.next = 8;
            break;
          }
          return _context26.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'Shop Category is emtpy !'
          });
        case 8:
          _context26.next = 10;
          return Promise.all(categoryList.map( /*#__PURE__*/function () {
            var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(item) {
              var _yield$db$ProductSubC, count;
              return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                while (1) switch (_context25.prev = _context25.next) {
                  case 0:
                    _context25.next = 2;
                    return db.ProductSubCategory.findAndCountAll({
                      raw: true,
                      where: {
                        subCategoryID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    _yield$db$ProductSubC = _context25.sent;
                    count = _yield$db$ProductSubC.count;
                    return _context25.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      quantity: count
                    }));
                  case 5:
                  case "end":
                    return _context25.stop();
                }
              }, _callee25);
            }));
            return function (_x41) {
              return _ref26.apply(this, arguments);
            };
          }()));
        case 10:
          format_category_list = _context26.sent;
          return _context26.abrupt("return", {
            EC: 0,
            DT: format_category_list,
            EM: 'Shop Category !'
          });
        case 12:
          _context26.next = 18;
          break;
        case 14:
          _context26.prev = 14;
          _context26.t0 = _context26["catch"](0);
          console.log(_context26.t0);
          return _context26.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 18:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[0, 14]]);
  }));
  return function getShopCategory(_x40) {
    return _ref25.apply(this, arguments);
  };
}();
var getShopCategoryDetailExist = /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(category_id, item_limit, page) {
    var offSet, productListRaw, listLength, pageTotal, product_list_format;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          if (!(item_limit > 0)) {
            _context28.next = 14;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context28.next = 5;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            attributes: ['id'],
            include: {
              model: db.Product,
              attributes: ['id', 'name']
            },
            where: {
              subCategoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 5:
          productListRaw = _context28.sent;
          listLength = productListRaw.length;
          pageTotal = Math.ceil(listLength / item_limit);
          productListRaw.reverse();
          productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();
          _context28.next = 12;
          return Promise.all(productListRaw.map( /*#__PURE__*/function () {
            var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(item) {
              var getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee27$(_context27) {
                while (1) switch (_context27.prev = _context27.next) {
                  case 0:
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(item.Product.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context27.next = 4;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 4:
                    url = _context27.sent;
                    return _context27.abrupt("return", {
                      id: item.Product.id,
                      name: item.Product.name,
                      index: item.id,
                      image: url
                    });
                  case 6:
                  case "end":
                    return _context27.stop();
                }
              }, _callee27);
            }));
            return function (_x45) {
              return _ref28.apply(this, arguments);
            };
          }()));
        case 12:
          product_list_format = _context28.sent;
          return _context28.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: product_list_format
            },
            EM: 'Get products by shop category !'
          });
        case 14:
          return _context28.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 17:
          _context28.prev = 17;
          _context28.t0 = _context28["catch"](0);
          console.log(_context28.t0);
          return _context28.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 21:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[0, 17]]);
  }));
  return function getShopCategoryDetailExist(_x42, _x43, _x44) {
    return _ref27.apply(this, arguments);
  };
}();
var getShopCategoryDetailNotExist = /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(seller_id, item_limit, page, category_id, sub_category_id) {
    var offSet, shopCategoryList, shop_category_list, subCategoryList, sub_category_list, productListRaw, listLength, pageTotal, product_list_format, _productListRaw3, _listLength4, _pageTotal4, _product_list_format, _productListRaw4, _listLength5, _pageTotal5, _product_list_format2;
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          if (!(item_limit > 0)) {
            _context32.next = 49;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context32.next = 5;
          return db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
              shopID: _defineProperty({}, Op.eq, +seller_id)
            }
          });
        case 5:
          shopCategoryList = _context32.sent;
          shop_category_list = shopCategoryList.map(function (item) {
            return +item.id;
          });
          if (!(category_id !== 0 && sub_category_id === 0)) {
            _context32.next = 26;
            break;
          }
          _context32.next = 10;
          return db.SubCategory.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'title'],
            where: {
              categoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 10:
          subCategoryList = _context32.sent;
          _context32.next = 13;
          return subCategoryList.map(function (item) {
            return item.id;
          });
        case 13:
          sub_category_list = _context32.sent;
          _context32.next = 16;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              where: {
                shop_id: _defineProperty({}, Op.eq, seller_id)
              }
            },
            where: _defineProperty({}, Op.and, [{
              subCategoryID: _defineProperty({}, Op["in"], sub_category_list)
            }, {
              subCategoryID: _defineProperty({}, Op.notIn, shop_category_list)
            }]),
            order: [['id', 'DESC']]
          });
        case 16:
          productListRaw = _context32.sent;
          listLength = productListRaw.length;
          pageTotal = Math.ceil(listLength / item_limit);
          productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();
          _context32.next = 22;
          return Promise.all(productListRaw.map( /*#__PURE__*/function () {
            var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(item) {
              var productInfo, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee29$(_context29) {
                while (1) switch (_context29.prev = _context29.next) {
                  case 0:
                    productInfo = item.Product;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context29.next = 5;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 5:
                    url = _context29.sent;
                    return _context29.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      image: url
                    });
                  case 7:
                  case "end":
                    return _context29.stop();
                }
              }, _callee29);
            }));
            return function (_x51) {
              return _ref30.apply(this, arguments);
            };
          }()));
        case 22:
          product_list_format = _context32.sent;
          return _context32.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: product_list_format
            },
            EM: 'Get products not exist in shop category !'
          });
        case 26:
          if (!(sub_category_id !== 0)) {
            _context32.next = 39;
            break;
          }
          _context32.next = 29;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              where: {
                shop_id: _defineProperty({}, Op.eq, seller_id)
              }
            },
            where: {
              subCategoryID: _defineProperty({}, Op.eq, sub_category_id)
            },
            order: [['id', 'DESC']]
          });
        case 29:
          _productListRaw3 = _context32.sent;
          _listLength4 = _productListRaw3.length;
          _pageTotal4 = Math.ceil(_listLength4 / item_limit);
          _productListRaw3 = _(_productListRaw3).drop(offSet).take(item_limit).value();
          _context32.next = 35;
          return Promise.all(_productListRaw3.map( /*#__PURE__*/function () {
            var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(item) {
              var productInfo, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee30$(_context30) {
                while (1) switch (_context30.prev = _context30.next) {
                  case 0:
                    productInfo = item.Product;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context30.next = 5;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 5:
                    url = _context30.sent;
                    return _context30.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      image: url
                    });
                  case 7:
                  case "end":
                    return _context30.stop();
                }
              }, _callee30);
            }));
            return function (_x52) {
              return _ref31.apply(this, arguments);
            };
          }()));
        case 35:
          _product_list_format = _context32.sent;
          return _context32.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal4,
              total_items: _listLength4,
              product_list: _product_list_format
            },
            EM: 'Get products not exist in shop category !'
          });
        case 39:
          _context32.next = 41;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              where: {
                shop_id: _defineProperty({}, Op.eq, seller_id)
              }
            },
            where: {
              subCategoryID: _defineProperty({}, Op.notIn, shop_category_list)
            },
            order: [['id', 'DESC']]
          });
        case 41:
          _productListRaw4 = _context32.sent;
          _listLength5 = _productListRaw4.length;
          _pageTotal5 = Math.ceil(_listLength5 / item_limit);
          _productListRaw4 = _(_productListRaw4).drop(offSet).take(item_limit).value();
          _context32.next = 47;
          return Promise.all(_productListRaw4.map( /*#__PURE__*/function () {
            var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(item) {
              var productInfo, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee31$(_context31) {
                while (1) switch (_context31.prev = _context31.next) {
                  case 0:
                    productInfo = item.Product;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context31.next = 5;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 5:
                    url = _context31.sent;
                    return _context31.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      image: url
                    });
                  case 7:
                  case "end":
                    return _context31.stop();
                }
              }, _callee31);
            }));
            return function (_x53) {
              return _ref32.apply(this, arguments);
            };
          }()));
        case 47:
          _product_list_format2 = _context32.sent;
          return _context32.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal5,
              total_items: _listLength5,
              product_list: _product_list_format2
            },
            EM: 'Get products not exist in shop category !'
          });
        case 49:
          return _context32.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 52:
          _context32.prev = 52;
          _context32.t0 = _context32["catch"](0);
          console.log(_context32.t0);
          return _context32.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 56:
        case "end":
          return _context32.stop();
      }
    }, _callee32, null, [[0, 52]]);
  }));
  return function getShopCategoryDetailNotExist(_x46, _x47, _x48, _x49, _x50) {
    return _ref29.apply(this, arguments);
  };
}();
var createShopCategory = /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(seller_id, category_title) {
    var result, category_info;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          _context33.next = 3;
          return db.SubCategory.create({
            title: category_title,
            shopID: seller_id
          });
        case 3:
          result = _context33.sent;
          if (!result) {
            _context33.next = 7;
            break;
          }
          category_info = result.dataValues;
          return _context33.abrupt("return", {
            EC: 0,
            DT: _objectSpread(_objectSpread({}, category_info), {}, {
              quantity: 0
            }),
            EM: 'Đã thêm danh mục thành công'
          });
        case 7:
          return _context33.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Lỗi thêm danh mục'
          });
        case 10:
          _context33.prev = 10;
          _context33.t0 = _context33["catch"](0);
          console.log(_context33.t0);
          return _context33.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 14:
        case "end":
          return _context33.stop();
      }
    }, _callee33, null, [[0, 10]]);
  }));
  return function createShopCategory(_x54, _x55) {
    return _ref33.apply(this, arguments);
  };
}();
var updateShopCategory = /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(category_id, category_title) {
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          _context34.next = 3;
          return db.SubCategory.update({
            title: category_title
          }, {
            where: {
              id: category_id
            }
          });
        case 3:
          return _context34.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Chỉnh sửa danh mục thành công'
          });
        case 6:
          _context34.prev = 6;
          _context34.t0 = _context34["catch"](0);
          console.log(_context34.t0);
          return _context34.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 10:
        case "end":
          return _context34.stop();
      }
    }, _callee34, null, [[0, 6]]);
  }));
  return function updateShopCategory(_x56, _x57) {
    return _ref34.apply(this, arguments);
  };
}();
var deleteShopCategory = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(category_id) {
    return _regeneratorRuntime().wrap(function _callee35$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          _context35.prev = 0;
          _context35.next = 3;
          return db.SubCategory.destroy({
            where: {
              id: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 3:
          _context35.next = 5;
          return db.ProductSubCategory.destroy({
            where: {
              subCategoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 5:
          return _context35.abrupt("return", {
            EC: 0,
            DT: "",
            EM: "Xóa danh mục thành công"
          });
        case 8:
          _context35.prev = 8;
          _context35.t0 = _context35["catch"](0);
          console.log(_context35.t0);
          return _context35.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 12:
        case "end":
          return _context35.stop();
      }
    }, _callee35, null, [[0, 8]]);
  }));
  return function deleteShopCategory(_x58) {
    return _ref35.apply(this, arguments);
  };
}();
var addProductToCategoryShop = /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(category_id, product_id) {
    var _item, result;
    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return db.ProductSubCategory.findOne({
            raw: true,
            where: _defineProperty({}, Op.and, [{
              subCategoryID: category_id
            }, {
              productID: product_id
            }])
          });
        case 3:
          _item = _context36.sent;
          if (!_item) {
            _context36.next = 8;
            break;
          }
          return _context36.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Sản phẩm đã có trong danh mục'
          });
        case 8:
          _context36.next = 10;
          return db.ProductSubCategory.create({
            productID: product_id,
            subCategoryID: category_id
          });
        case 10:
          result = _context36.sent;
          if (!result) {
            _context36.next = 13;
            break;
          }
          return _context36.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Đã thêm sản phẩm vào danh mục'
          });
        case 13:
          return _context36.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Lỗi thêm sản phẩm vào danh mục'
          });
        case 14:
          _context36.next = 20;
          break;
        case 16:
          _context36.prev = 16;
          _context36.t0 = _context36["catch"](0);
          console.log(_context36.t0);
          return _context36.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 20:
        case "end":
          return _context36.stop();
      }
    }, _callee36, null, [[0, 16]]);
  }));
  return function addProductToCategoryShop(_x59, _x60) {
    return _ref36.apply(this, arguments);
  };
}();
var removeProductOutCategoryShop = /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(id) {
    return _regeneratorRuntime().wrap(function _callee37$(_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          _context37.next = 3;
          return db.ProductSubCategory.destroy({
            where: {
              id: _defineProperty({}, Op.eq, +id)
            }
          });
        case 3:
          return _context37.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Đã xóa sản phẩm khỏi danh mục'
          });
        case 6:
          _context37.prev = 6;
          _context37.t0 = _context37["catch"](0);
          console.log(_context37.t0);
          return _context37.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 10:
        case "end":
          return _context37.stop();
      }
    }, _callee37, null, [[0, 6]]);
  }));
  return function removeProductOutCategoryShop(_x61) {
    return _ref37.apply(this, arguments);
  };
}();
var getDashboardData = /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39(seller_id) {
    var pending_confirm, pending_shipper_get, shipping, shipping_success, cancel, revenues, saleData, orderListRaw, product_list, format_product_list, outOfOrder_product_list, soon_outOfOrder_product_list_temp, soon_outOfOrder_product_list, outOfOrder_product_list_quantity, soon_outOfOrder_product_list_quantity, analysis_data, overview_data, data;
    return _regeneratorRuntime().wrap(function _callee39$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          _context39.prev = 0;
          pending_confirm = 0;
          pending_shipper_get = 0;
          shipping = 0;
          shipping_success = 0;
          cancel = 0;
          revenues = _toConsumableArray(Array(12)).map(function (i) {
            return 0;
          });
          saleData = _toConsumableArray(Array(12)).map(function (i) {
            return 0;
          });
          _context39.next = 10;
          return db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
              sellerID: _defineProperty({}, Op.eq, seller_id)
            }
          });
        case 10:
          orderListRaw = _context39.sent;
          _context39.next = 13;
          return db.ProductType.findAll({
            raw: true,
            nest: true,
            attributes: ['quantity', 'currentPrice'],
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              where: {
                shop_id: _defineProperty({}, Op.eq, +seller_id)
              }
            },
            where: {
              quantity: _defineProperty({}, Op.between, [0, 10])
            }
          });
        case 13:
          product_list = _context39.sent;
          format_product_list = product_list.map(function (product) {
            return {
              id: product.Product.id,
              name: product.Product.name,
              quantity: product.quantity,
              price: product.currentPrice
            };
          });
          outOfOrder_product_list = format_product_list.filter(function (product) {
            return product.quantity === 0;
          });
          soon_outOfOrder_product_list_temp = format_product_list.filter(function (product) {
            return product.quantity !== 0;
          });
          soon_outOfOrder_product_list = _.chain(soon_outOfOrder_product_list_temp).orderBy("quantity", "asc").take(3).value();
          outOfOrder_product_list_quantity = outOfOrder_product_list.length;
          soon_outOfOrder_product_list_quantity = soon_outOfOrder_product_list.length;
          outOfOrder_product_list = _(outOfOrder_product_list).take(3).value();
          _context39.next = 23;
          return Promise.all(orderListRaw.map( /*#__PURE__*/function () {
            var _ref39 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38(item) {
              var order_status_raw, order_status_info, order_status_id, order_item_list, orderSales;
              return _regeneratorRuntime().wrap(function _callee38$(_context38) {
                while (1) switch (_context38.prev = _context38.next) {
                  case 0:
                    _context38.next = 2;
                    return db.Shipment.findAll({
                      limit: 1,
                      raw: true,
                      nest: true,
                      attributes: ['id', 'updatedDate'],
                      include: {
                        model: db.ShipmentStatus,
                        attributes: ['id', 'name']
                      },
                      where: {
                        orderID: _defineProperty({}, Op.eq, +item.id)
                      },
                      order: [['updatedDate', 'DESC'], ['status', 'DESC']]
                    });
                  case 2:
                    order_status_raw = _context38.sent;
                    order_status_info = order_status_raw[0];
                    order_status_id = order_status_info.ShipmentStatus.id;
                    if (order_status_id === 1) {
                      pending_confirm = pending_confirm + 1;
                    }
                    if (order_status_id === 3) {
                      pending_shipper_get += 1;
                    }
                    if (order_status_id === 6) {
                      shipping += 1;
                    }
                    if (!(order_status_id === 7)) {
                      _context38.next = 16;
                      break;
                    }
                    shipping_success += 1;
                    //console.log(`id = ${item.id}, month = ${item.orderDate.getMonth() + 1}, revenue = ${item.totalPrice}`);

                    revenues[item.orderDate.getMonth()] += item.totalPrice;
                    _context38.next = 13;
                    return db.OrderItem.findAll({
                      raw: true,
                      attributes: ['quantity'],
                      where: {
                        orderID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 13:
                    order_item_list = _context38.sent;
                    orderSales = _.sumBy(order_item_list, 'quantity');
                    saleData[item.orderDate.getMonth()] += orderSales;
                  case 16:
                    if (order_status_id === 10) {
                      cancel += 1;
                    }
                  case 17:
                  case "end":
                    return _context38.stop();
                }
              }, _callee38);
            }));
            return function (_x63) {
              return _ref39.apply(this, arguments);
            };
          }()));
        case 23:
          analysis_data = revenues.map(function (revenue, index) {
            return {
              name: "T".concat(index + 1),
              revenue: revenue,
              sales: saleData[index]
            };
          });
          overview_data = [pending_confirm, pending_shipper_get, shipping, shipping_success, cancel];
          data = {
            overview_data: overview_data,
            analysis_data: analysis_data,
            out_of_order_product_list: {
              quantity: outOfOrder_product_list_quantity,
              data: outOfOrder_product_list
            },
            soon_out_of_order_product_list: {
              quantity: soon_outOfOrder_product_list_quantity,
              data: soon_outOfOrder_product_list
            }
          };
          return _context39.abrupt("return", {
            EC: 0,
            DT: data,
            EM: 'Get seller dashboard data !'
          });
        case 29:
          _context39.prev = 29;
          _context39.t0 = _context39["catch"](0);
          console.log(_context39.t0);
          return _context39.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 33:
        case "end":
          return _context39.stop();
      }
    }, _callee39, null, [[0, 29]]);
  }));
  return function getDashboardData(_x62) {
    return _ref38.apply(this, arguments);
  };
}();
var getOrderSearch = /*#__PURE__*/function () {
  var _ref40 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40(shop_seller_id, order_id) {
    var orderInfo, order_status_raw, order_status_info, order_status, order_list_data;
    return _regeneratorRuntime().wrap(function _callee40$(_context40) {
      while (1) switch (_context40.prev = _context40.next) {
        case 0:
          _context40.prev = 0;
          _context40.next = 3;
          return db.Order.findOne({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: _defineProperty({}, Op.and, [{
              id: _defineProperty({}, Op.eq, order_id)
            }, {
              sellerID: _defineProperty({}, Op.eq, shop_seller_id)
            }])
          });
        case 3:
          orderInfo = _context40.sent;
          if (!orderInfo) {
            _context40.next = 14;
            break;
          }
          _context40.next = 7;
          return db.Shipment.findAll({
            limit: 1,
            raw: true,
            nest: true,
            attributes: ['id', 'updatedDate'],
            include: {
              model: db.ShipmentStatus,
              attributes: ['id', 'name']
            },
            where: {
              orderID: _defineProperty({}, Op.eq, +orderInfo.id)
            },
            order: [['updatedDate', 'DESC'], ['status', 'DESC']]
          });
        case 7:
          order_status_raw = _context40.sent;
          order_status_info = order_status_raw[0];
          order_status = order_status_info.ShipmentStatus;
          order_list_data = [{
            id: orderInfo.id,
            orderDate: orderInfo.orderDate,
            totalPrice: orderInfo.totalPrice,
            status: order_status
          }];
          return _context40.abrupt("return", {
            EC: 0,
            DT: {
              order_list: order_list_data
            },
            EM: 'Get order search !'
          });
        case 14:
          return _context40.abrupt("return", {
            EC: 0,
            DT: {
              order_list: []
            },
            EM: 'Get order search !'
          });
        case 15:
          _context40.next = 21;
          break;
        case 17:
          _context40.prev = 17;
          _context40.t0 = _context40["catch"](0);
          console.log(_context40.t0);
          return _context40.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 21:
        case "end":
          return _context40.stop();
      }
    }, _callee40, null, [[0, 17]]);
  }));
  return function getOrderSearch(_x64, _x65) {
    return _ref40.apply(this, arguments);
  };
}();
var getProductsAnnouncement = /*#__PURE__*/function () {
  var _ref41 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41(seller_id, item_limit, page, type) {
    var offSet, product_list, format_product_list, listLength, pageTotal, productListFinal, _product_list, _format_product_list, _listLength6, _pageTotal6, _productListFinal;
    return _regeneratorRuntime().wrap(function _callee41$(_context41) {
      while (1) switch (_context41.prev = _context41.next) {
        case 0:
          _context41.prev = 0;
          if (!(item_limit > 0)) {
            _context41.next = 25;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(type === 1)) {
            _context41.next = 14;
            break;
          }
          _context41.next = 6;
          return db.ProductType.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'currentPrice'],
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              where: {
                shop_id: _defineProperty({}, Op.eq, +seller_id)
              }
            },
            where: {
              quantity: _defineProperty({}, Op.eq, 0)
            }
          });
        case 6:
          product_list = _context41.sent;
          _context41.next = 9;
          return product_list.map(function (product) {
            return {
              id: product.Product.id,
              name: product.Product.name,
              quantity: product.quantity,
              price: product.currentPrice,
              product_type_id: product.id
            };
          });
        case 9:
          format_product_list = _context41.sent;
          listLength = format_product_list.length;
          pageTotal = Math.ceil(listLength / item_limit);
          productListFinal = _(format_product_list).drop(offSet).take(item_limit).value();
          return _context41.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              product_list: productListFinal
            },
            EM: 'Get products announcement !'
          });
        case 14:
          if (!(type === 2)) {
            _context41.next = 23;
            break;
          }
          _context41.next = 17;
          return db.ProductType.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'currentPrice'],
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              where: {
                shop_id: _defineProperty({}, Op.eq, +seller_id)
              }
            },
            where: {
              quantity: _defineProperty({}, Op.between, [1, 10])
            }
          });
        case 17:
          _product_list = _context41.sent;
          _format_product_list = _product_list.map(function (product) {
            return {
              id: product.Product.id,
              name: product.Product.name,
              quantity: product.quantity,
              price: product.currentPrice,
              product_type_id: product.id
            };
          });
          _listLength6 = _format_product_list.length;
          _pageTotal6 = Math.ceil(_listLength6 / item_limit);
          _productListFinal = _(_format_product_list).drop(offSet).take(item_limit).value();
          return _context41.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal6,
              total_items: _listLength6,
              product_list: _productListFinal
            },
            EM: 'Get products announcement !'
          });
        case 23:
          _context41.next = 26;
          break;
        case 25:
          return _context41.abrupt("return", {
            EC: -1,
            DT: null,
            EM: 'ITEM LIMIT is invalid !'
          });
        case 26:
          _context41.next = 32;
          break;
        case 28:
          _context41.prev = 28;
          _context41.t0 = _context41["catch"](0);
          console.log(_context41.t0);
          return _context41.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 32:
        case "end":
          return _context41.stop();
      }
    }, _callee41, null, [[0, 28]]);
  }));
  return function getProductsAnnouncement(_x66, _x67, _x68, _x69) {
    return _ref41.apply(this, arguments);
  };
}();
var updateProductInventory = /*#__PURE__*/function () {
  var _ref42 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42(product_type_id, quantity) {
    return _regeneratorRuntime().wrap(function _callee42$(_context42) {
      while (1) switch (_context42.prev = _context42.next) {
        case 0:
          _context42.prev = 0;
          _context42.next = 3;
          return db.ProductType.update({
            quantity: +quantity
          }, {
            where: {
              id: +product_type_id
            }
          });
        case 3:
          return _context42.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Cập nhật tồn kho thành công'
          });
        case 6:
          _context42.prev = 6;
          _context42.t0 = _context42["catch"](0);
          console.log(_context42.t0);
          return _context42.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 10:
        case "end":
          return _context42.stop();
      }
    }, _callee42, null, [[0, 6]]);
  }));
  return function updateProductInventory(_x70, _x71) {
    return _ref42.apply(this, arguments);
  };
}();
var getProductInventorySearch = /*#__PURE__*/function () {
  var _ref43 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(shop_seller_id, product_id) {
    var productInfo, productInfoFormat, productSearch;
    return _regeneratorRuntime().wrap(function _callee43$(_context43) {
      while (1) switch (_context43.prev = _context43.next) {
        case 0:
          _context43.prev = 0;
          _context43.next = 3;
          return db.ProductType.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'currentPrice'],
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              where: _defineProperty({}, Op.and, [{
                id: _defineProperty({}, Op.eq, +product_id)
              }, {
                shop_id: _defineProperty({}, Op.eq, +shop_seller_id)
              }])
            }
          });
        case 3:
          productInfo = _context43.sent;
          if (!productInfo) {
            _context43.next = 10;
            break;
          }
          productInfoFormat = {
            id: productInfo.Product.id,
            name: productInfo.Product.name,
            quantity: productInfo.quantity,
            price: productInfo.currentPrice,
            product_type_id: productInfo.id
          };
          productSearch = [productInfoFormat];
          return _context43.abrupt("return", {
            EC: 0,
            DT: {
              product_list: productSearch
            },
            EM: 'Get product inventory search !'
          });
        case 10:
          return _context43.abrupt("return", {
            EC: 0,
            DT: {
              product_list: []
            },
            EM: 'Get product inventory search !'
          });
        case 11:
          _context43.next = 17;
          break;
        case 13:
          _context43.prev = 13;
          _context43.t0 = _context43["catch"](0);
          console.log(_context43.t0);
          return _context43.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 17:
        case "end":
          return _context43.stop();
      }
    }, _callee43, null, [[0, 13]]);
  }));
  return function getProductInventorySearch(_x72, _x73) {
    return _ref43.apply(this, arguments);
  };
}();
var getOrderReviewPagination = /*#__PURE__*/function () {
  var _ref44 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47(shop_seller_id, item_limit, page, startDate, endDate) {
    var offSet, orderListRaw, start_date, end_date, order_list_data, filter_order_list_data, listLength, pageTotal, paginate_order_list_data, finalData;
    return _regeneratorRuntime().wrap(function _callee47$(_context47) {
      while (1) switch (_context47.prev = _context47.next) {
        case 0:
          _context47.prev = 0;
          if (!(item_limit > 0)) {
            _context47.next = 19;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context47.next = 5;
          return db.Order.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            include: {
              raw: true,
              model: db.Customer,
              attributes: ['name', 'mobile']
            },
            where: {
              sellerID: _defineProperty({}, Op.eq, shop_seller_id)
            }
          });
        case 5:
          orderListRaw = _context47.sent;
          if (+startDate !== 0 && +endDate !== 0) {
            start_date = new Date(startDate);
            end_date = new Date(endDate);
            if (start_date.getTime() !== end_date.getTime()) {
              orderListRaw = orderListRaw.filter(function (order) {
                return order.orderDate >= start_date && order.orderDate <= end_date;
              });
            } else {
              orderListRaw = orderListRaw.filter(function (order) {
                var order_date = new Date(order.orderDate);
                var order_month = order_date.getMonth() + 1; // months from 1-12
                var order_day = order_date.getDate();
                var order_year = order_date.getFullYear();
                var month = start_date.getMonth() + 1; // months from 1-12
                var day = start_date.getDate();
                var year = start_date.getFullYear();
                return order_day === day && order_month === month && order_year === year;
              });
            }
          }
          orderListRaw.reverse();
          _context47.next = 10;
          return Promise.all(orderListRaw.map( /*#__PURE__*/function () {
            var _ref45 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44(item) {
              var order_status_raw, order_status_info, order_status;
              return _regeneratorRuntime().wrap(function _callee44$(_context44) {
                while (1) switch (_context44.prev = _context44.next) {
                  case 0:
                    _context44.next = 2;
                    return db.Shipment.findAll({
                      limit: 1,
                      raw: true,
                      nest: true,
                      attributes: ['id', 'updatedDate'],
                      include: {
                        model: db.ShipmentStatus,
                        attributes: ['id', 'name']
                      },
                      where: {
                        orderID: _defineProperty({}, Op.eq, +item.id)
                      },
                      order: [['updatedDate', 'DESC'], ['status', 'DESC']]
                    });
                  case 2:
                    order_status_raw = _context44.sent;
                    order_status_info = order_status_raw[0];
                    order_status = order_status_info.ShipmentStatus;
                    return _context44.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      status: order_status
                    }));
                  case 6:
                  case "end":
                    return _context44.stop();
                }
              }, _callee44);
            }));
            return function (_x79) {
              return _ref45.apply(this, arguments);
            };
          }()));
        case 10:
          order_list_data = _context47.sent;
          filter_order_list_data = order_list_data.filter(function (item) {
            return item.status.id === 7;
          });
          listLength = filter_order_list_data.length;
          pageTotal = Math.ceil(listLength / item_limit);
          paginate_order_list_data = _(filter_order_list_data).drop(offSet).take(item_limit).value();
          _context47.next = 17;
          return Promise.all(paginate_order_list_data.map( /*#__PURE__*/function () {
            var _ref46 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46(order) {
              var order_item_list, product_review_data_raw, product_review_data, product_list;
              return _regeneratorRuntime().wrap(function _callee46$(_context46) {
                while (1) switch (_context46.prev = _context46.next) {
                  case 0:
                    _context46.next = 2;
                    return db.OrderItem.findAll({
                      raw: true,
                      nest: true,
                      attributes: ['id', 'quantity', 'price'],
                      include: [{
                        model: db.Product,
                        attributes: ['id', 'name']
                      }],
                      where: {
                        orderID: _defineProperty({}, Op.eq, +order.id)
                      }
                    });
                  case 2:
                    order_item_list = _context46.sent;
                    _context46.next = 5;
                    return db.OrderProductReview.findAll({
                      raw: true,
                      nest: true,
                      include: [{
                        model: db.ProductReview,
                        attributes: ['id', 'rating', 'productID', 'comment']
                      }],
                      where: {
                        orderID: _defineProperty({}, Op.eq, +order.id)
                      }
                    });
                  case 5:
                    product_review_data_raw = _context46.sent;
                    _context46.next = 8;
                    return product_review_data_raw.map(function (item) {
                      return item.ProductReview;
                    });
                  case 8:
                    product_review_data = _context46.sent;
                    _context46.next = 11;
                    return Promise.all(order_item_list.map( /*#__PURE__*/function () {
                      var _ref47 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45(order_item) {
                        var orderItem, productInfo, getObjectParams, command, url, review, shop_response;
                        return _regeneratorRuntime().wrap(function _callee45$(_context45) {
                          while (1) switch (_context45.prev = _context45.next) {
                            case 0:
                              orderItem = order_item;
                              productInfo = orderItem.Product;
                              getObjectParams = {
                                Bucket: bucketName,
                                Key: "".concat(productInfo.id, ".jpeg")
                              };
                              command = new GetObjectCommand(getObjectParams);
                              _context45.next = 6;
                              return getSignedUrl(s3, command, {
                                expiresIn: 3600
                              });
                            case 6:
                              url = _context45.sent;
                              review = product_review_data.filter(function (item) {
                                return item.productID === productInfo.id;
                              });
                              if (!(review.length === 0)) {
                                _context45.next = 12;
                                break;
                              }
                              return _context45.abrupt("return", {
                                id: productInfo.id,
                                name: productInfo.name,
                                image: url,
                                review: {
                                  id: 0,
                                  rating: 0,
                                  comment: ""
                                },
                                shop_response: {
                                  id: 0,
                                  comment: "",
                                  parentID: 0
                                }
                              });
                            case 12:
                              _context45.next = 14;
                              return db.ProductReview.findOne({
                                raw: true,
                                attributes: ['id', 'comment', 'parentID'],
                                where: {
                                  parentID: _defineProperty({}, Op.eq, +review[0].id)
                                }
                              });
                            case 14:
                              shop_response = _context45.sent;
                              if (!shop_response) {
                                _context45.next = 17;
                                break;
                              }
                              return _context45.abrupt("return", {
                                id: productInfo.id,
                                name: productInfo.name,
                                image: url,
                                review: {
                                  id: review[0].id,
                                  rating: review[0].rating,
                                  comment: review[0].comment
                                },
                                shop_response: shop_response
                              });
                            case 17:
                              return _context45.abrupt("return", {
                                id: productInfo.id,
                                name: productInfo.name,
                                image: url,
                                review: {
                                  id: review[0].id,
                                  rating: review[0].rating,
                                  comment: review[0].comment
                                },
                                shop_response: {
                                  id: 0,
                                  comment: "",
                                  parentID: 0
                                }
                              });
                            case 18:
                            case "end":
                              return _context45.stop();
                          }
                        }, _callee45);
                      }));
                      return function (_x81) {
                        return _ref47.apply(this, arguments);
                      };
                    }()));
                  case 11:
                    product_list = _context46.sent;
                    return _context46.abrupt("return", {
                      id: +order.id,
                      orderDate: order.orderDate,
                      customer_info: order.Customer,
                      product_list: product_list
                    });
                  case 13:
                  case "end":
                    return _context46.stop();
                }
              }, _callee46);
            }));
            return function (_x80) {
              return _ref46.apply(this, arguments);
            };
          }()));
        case 17:
          finalData = _context47.sent;
          return _context47.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              order_list: finalData
            },
            EM: 'Get product review by order !'
          });
        case 19:
          return _context47.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 22:
          _context47.prev = 22;
          _context47.t0 = _context47["catch"](0);
          console.log(_context47.t0);
          return _context47.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 26:
        case "end":
          return _context47.stop();
      }
    }, _callee47, null, [[0, 22]]);
  }));
  return function getOrderReviewPagination(_x74, _x75, _x76, _x77, _x78) {
    return _ref44.apply(this, arguments);
  };
}();
var getOrderReviewSearch = /*#__PURE__*/function () {
  var _ref48 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee49(shop_seller_id, order_id) {
    var orderInfo, order_item_list, product_review_data_raw, product_review_data, product_list, finalData;
    return _regeneratorRuntime().wrap(function _callee49$(_context49) {
      while (1) switch (_context49.prev = _context49.next) {
        case 0:
          _context49.prev = 0;
          _context49.next = 3;
          return db.Order.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            include: {
              raw: true,
              model: db.Customer,
              attributes: ['name', 'mobile']
            },
            where: _defineProperty({}, Op.and, [{
              id: _defineProperty({}, Op.eq, order_id)
            }, {
              sellerID: _defineProperty({}, Op.eq, shop_seller_id)
            }])
          });
        case 3:
          orderInfo = _context49.sent;
          if (!orderInfo) {
            _context49.next = 21;
            break;
          }
          _context49.next = 7;
          return db.OrderItem.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'price'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name']
            }],
            where: {
              orderID: _defineProperty({}, Op.eq, +orderInfo.id)
            }
          });
        case 7:
          order_item_list = _context49.sent;
          _context49.next = 10;
          return db.OrderProductReview.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.ProductReview,
              attributes: ['id', 'rating', 'productID', 'comment']
            }],
            where: {
              orderID: _defineProperty({}, Op.eq, +orderInfo.id)
            }
          });
        case 10:
          product_review_data_raw = _context49.sent;
          _context49.next = 13;
          return product_review_data_raw.map(function (item) {
            return item.ProductReview;
          });
        case 13:
          product_review_data = _context49.sent;
          _context49.next = 16;
          return Promise.all(order_item_list.map( /*#__PURE__*/function () {
            var _ref49 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48(order_item) {
              var orderItem, productInfo, getObjectParams, command, url, review, shop_response;
              return _regeneratorRuntime().wrap(function _callee48$(_context48) {
                while (1) switch (_context48.prev = _context48.next) {
                  case 0:
                    orderItem = order_item;
                    productInfo = orderItem.Product;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context48.next = 6;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 6:
                    url = _context48.sent;
                    review = product_review_data.filter(function (item) {
                      return item.productID === productInfo.id;
                    });
                    if (!(review.length === 0)) {
                      _context48.next = 12;
                      break;
                    }
                    return _context48.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      image: url,
                      review: {
                        id: 0,
                        rating: 0,
                        comment: ""
                      },
                      shop_response: {
                        id: 0,
                        comment: 0,
                        parentID: 0
                      }
                    });
                  case 12:
                    _context48.next = 14;
                    return db.ProductReview.findOne({
                      raw: true,
                      attributes: ['id', 'comment', 'parentID'],
                      where: {
                        parentID: _defineProperty({}, Op.eq, +review[0].id)
                      }
                    });
                  case 14:
                    shop_response = _context48.sent;
                    if (!shop_response) {
                      _context48.next = 17;
                      break;
                    }
                    return _context48.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      image: url,
                      review: {
                        id: review[0].id,
                        rating: review[0].rating,
                        comment: review[0].comment
                      },
                      shop_response: shop_response
                    });
                  case 17:
                    return _context48.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      image: url,
                      review: {
                        id: review[0].id,
                        rating: review[0].rating,
                        comment: review[0].comment
                      },
                      shop_response: {
                        id: 0,
                        comment: 0,
                        parentID: 0
                      }
                    });
                  case 18:
                  case "end":
                    return _context48.stop();
                }
              }, _callee48);
            }));
            return function (_x84) {
              return _ref49.apply(this, arguments);
            };
          }()));
        case 16:
          product_list = _context49.sent;
          finalData = {
            id: +orderInfo.id,
            orderDate: orderInfo.orderDate,
            customer_info: orderInfo.Customer,
            product_list: product_list
          };
          return _context49.abrupt("return", {
            EC: 0,
            DT: {
              order_list: [finalData]
            },
            EM: 'Get search product review by order!'
          });
        case 21:
          return _context49.abrupt("return", {
            EC: 0,
            DT: {
              order_list: []
            },
            EM: 'Get search product review by order!'
          });
        case 22:
          _context49.next = 28;
          break;
        case 24:
          _context49.prev = 24;
          _context49.t0 = _context49["catch"](0);
          console.log(_context49.t0);
          return _context49.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 28:
        case "end":
          return _context49.stop();
      }
    }, _callee49, null, [[0, 24]]);
  }));
  return function getOrderReviewSearch(_x82, _x83) {
    return _ref48.apply(this, arguments);
  };
}();
var sellerResponseCustomerRating = /*#__PURE__*/function () {
  var _ref50 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee50(data, seller_id) {
    var response, review, date, response_info, responseInfo;
    return _regeneratorRuntime().wrap(function _callee50$(_context50) {
      while (1) switch (_context50.prev = _context50.next) {
        case 0:
          _context50.prev = 0;
          response = data.response, review = data.review;
          date = new Date();
          if (!(response.id === 0)) {
            _context50.next = 15;
            break;
          }
          _context50.next = 6;
          return db.ProductReview.create({
            comment: response.comment,
            parentID: review.id,
            shopID: seller_id,
            createdAt: date,
            updatedAt: date
          });
        case 6:
          response_info = _context50.sent;
          if (!response_info) {
            _context50.next = 12;
            break;
          }
          responseInfo = response_info.dataValues;
          return _context50.abrupt("return", {
            EC: 0,
            DT: {
              id: responseInfo.id,
              comment: responseInfo.comment,
              parentID: responseInfo.parentID
            },
            EM: 'Đã phản hồi người mua'
          });
        case 12:
          return _context50.abrupt("return", {
            EC: -1,
            DT: {
              id: 0,
              comment: "",
              parentID: 0
            },
            EM: 'Lỗi không thể phản hồi người mua'
          });
        case 13:
          _context50.next = 18;
          break;
        case 15:
          _context50.next = 17;
          return db.ProductReview.update({
            comment: response.comment,
            updatedAt: date
          }, {
            where: {
              id: _defineProperty({}, Op.eq, +response.id)
            }
          });
        case 17:
          return _context50.abrupt("return", {
            EC: 0,
            DT: {
              id: response.id,
              comment: response.comment,
              parentID: response.parentID
            },
            EM: 'Đã cập nhật phản hồi'
          });
        case 18:
          _context50.next = 24;
          break;
        case 20:
          _context50.prev = 20;
          _context50.t0 = _context50["catch"](0);
          console.log(_context50.t0);
          return _context50.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 24:
        case "end":
          return _context50.stop();
      }
    }, _callee50, null, [[0, 20]]);
  }));
  return function sellerResponseCustomerRating(_x85, _x86) {
    return _ref50.apply(this, arguments);
  };
}();
module.exports = {
  getProductPagination: getProductPagination,
  createNewProduct: createNewProduct,
  deleteProduct: deleteProduct,
  getAllCategories: getAllCategories,
  getSubCategoriesByCategory: getSubCategoriesByCategory,
  updateProduct: updateProduct,
  handleCreateVertificationCode: handleCreateVertificationCode,
  handleOTPVertification: handleOTPVertification,
  getSellerInfo: getSellerInfo,
  updateSellerInfo: updateSellerInfo,
  getOrderPagination: getOrderPagination,
  getOrderDetail: getOrderDetail,
  confirmCustomerOrder: confirmCustomerOrder,
  packingCustomerOrder: packingCustomerOrder,
  getShopCategory: getShopCategory,
  createShopCategory: createShopCategory,
  updateShopCategory: updateShopCategory,
  deleteShopCategory: deleteShopCategory,
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