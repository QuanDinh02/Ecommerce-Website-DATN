"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
var getProductDetail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(product_id) {
    var productInfo, sub_category, category, shopInfo, productTypesList, productImage, colors, sizes, _$minBy, currentPrice, _$minBy2, price, commentList, allProductsReview, comment_count, sum_rating, inventoryCount, finalData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return db.Product.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'summary'],
            include: [{
              raw: true,
              nest: true,
              model: db.SubCategory,
              attributes: ['id', 'title'],
              through: {
                attributes: []
              },
              include: {
                raw: true,
                model: db.Category,
                attributes: ['id', 'title']
              }
            }, {
              model: db.Seller,
              attributes: ['id', 'shopName']
            }],
            where: {
              id: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 3:
          productInfo = _context2.sent;
          sub_category = productInfo.SubCategories;
          category = sub_category.Category;
          shopInfo = productInfo.Seller;
          delete sub_category.Category;
          _context2.next = 10;
          return db.ProductType.findAll({
            raw: true,
            attributes: ['id', 'type', 'typeName', 'quantity', 'size', 'color', 'currentPrice', 'price'],
            where: {
              productID: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 10:
          productTypesList = _context2.sent;
          _context2.next = 13;
          return db.Image.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'image'],
            where: {
              productID: _defineProperty({}, Op.eq, product_id)
            }
          });
        case 13:
          productImage = _context2.sent;
          colors = _.chain(productTypesList).map('color').uniq().value();
          sizes = _.chain(productTypesList).map('size').uniq().value();
          _$minBy = _.minBy(productTypesList, function (o) {
            return o.currentPrice;
          }), currentPrice = _$minBy.currentPrice;
          _$minBy2 = _.minBy(productTypesList, function (o) {
            return o.price;
          }), price = _$minBy2.price;
          _context2.next = 20;
          return Promise.all(productTypesList.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(item) {
              var productReviews, productReviewRebuildData;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return db.ProductReview.findAll({
                      raw: true,
                      nest: true,
                      attributes: ['id', 'comment', 'rating', 'createdAt'],
                      include: {
                        model: db.Customer,
                        attributes: ['id', 'name']
                      },
                      where: {
                        productTypeID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productReviews = _context.sent;
                    _context.next = 5;
                    return productReviews.map(function (item) {
                      var customer_info = item.Customer;
                      delete item.Customer;
                      return _objectSpread(_objectSpread({}, item), {}, {
                        customer_name: customer_info.name
                      });
                    });
                  case 5:
                    productReviewRebuildData = _context.sent;
                    return _context.abrupt("return", {
                      product_type_id: item.id,
                      reviews: productReviewRebuildData
                    });
                  case 7:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 20:
          commentList = _context2.sent;
          allProductsReview = [];
          commentList.forEach(function (item) {
            allProductsReview = [].concat(_toConsumableArray(allProductsReview), _toConsumableArray(item.reviews));
          });
          comment_count = allProductsReview.length;
          sum_rating = _.sumBy(allProductsReview, function (o) {
            return o.rating;
          });
          inventoryCount = _.sumBy(productTypesList, function (o) {
            return o.quantity;
          });
          finalData = {
            id: product_id,
            name: productInfo.name,
            currentPrice: currentPrice,
            price: price,
            description: productInfo.summary,
            comment_count: comment_count,
            rating_average: Math.round(parseFloat(sum_rating / comment_count) * 10) / 10,
            product_image: productImage.image,
            inventory_count: inventoryCount,
            reviews: allProductsReview,
            product_type_list: productTypesList,
            product_type_group: {
              color: colors.length === 1 && colors[0] === '' ? [] : colors,
              size: sizes.length === 1 && sizes[0] === '' ? [] : sizes
            },
            sub_category: sub_category,
            category: category,
            shop_info: {
              id: shopInfo.id,
              name: shopInfo.shopName
            }
          };
          return _context2.abrupt("return", {
            EC: 0,
            DT: finalData,
            EM: 'Product Detail Info !'
          });
        case 30:
          _context2.prev = 30;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 34:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 30]]);
  }));
  return function getProductDetail(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getProductsByCategory = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(category_id, item_limit, page) {
    var offSet, subCategoryByCategoryList, subCategoryIdList, _yield$db$SubCategory, count, productListRaw, pageTotal, productListFinal, productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!(item_limit > 0)) {
            _context4.next = 24;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context4.next = 5;
          return db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
              categoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 5:
          subCategoryByCategoryList = _context4.sent;
          _context4.next = 8;
          return subCategoryByCategoryList.map(function (item) {
            return item.id;
          });
        case 8:
          subCategoryIdList = _context4.sent;
          _context4.next = 11;
          return db.SubCategory.findAndCountAll({
            raw: true,
            nest: true,
            attributes: ['id', 'title'],
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              through: {
                attributes: []
              }
            },
            where: {
              id: _defineProperty({}, Op["in"], subCategoryIdList)
            }
          });
        case 11:
          _yield$db$SubCategory = _context4.sent;
          count = _yield$db$SubCategory.count;
          productListRaw = _yield$db$SubCategory.rows;
          pageTotal = Math.ceil(productListRaw.length / item_limit);
          productListRaw.reverse();
          productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();
          productListFinal = [];
          _context4.next = 20;
          return productListRaw.forEach(function (item) {
            //let product = item.Products;
            var sub_category = {
              id: item.id,
              name: item.title
            };
            var product = {
              id: item.Products.id,
              name: item.Products.name,
              sub_category: sub_category
            };
            if (product.id != null) {
              productListFinal = [].concat(_toConsumableArray(productListFinal), [product]);
            }
          });
        case 20:
          _context4.next = 22;
          return Promise.all(productListFinal.map( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
              var productTypes, _$minBy3, currentPrice, _$minBy4, price, productImages;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return db.ProductType.findAll({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productTypes = _context3.sent;
                    _$minBy3 = _.minBy(productTypes, function (o) {
                      return o.currentPrice;
                    }), currentPrice = _$minBy3.currentPrice;
                    _$minBy4 = _.minBy(productTypes, function (o) {
                      return o.price;
                    }), price = _$minBy4.price;
                    _context3.next = 7;
                    return db.Image.findOne({
                      raw: true,
                      nest: true,
                      attributes: ['id', 'image'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 7:
                    productImages = _context3.sent;
                    return _context3.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: productImages.image,
                      current_price: currentPrice,
                      price: price
                    }));
                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x6) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 22:
          productListFinalWithImage = _context4.sent;
          return _context4.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: count,
              product_list: productListFinalWithImage
            },
            EM: 'Get products by category !'
          });
        case 24:
          return _context4.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 27:
          _context4.prev = 27;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 31:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 27]]);
  }));
  return function getProductsByCategory(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var getProductsBySubCategory = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(sub_category_id, item_limit, page) {
    var offSet, _yield$db$SubCategory2, count, productListRaw, pageTotal, productListFinal, productListFinalWithImage;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (!(item_limit > 0)) {
            _context6.next = 18;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context6.next = 5;
          return db.SubCategory.findAndCountAll({
            raw: true,
            nest: true,
            attributes: [],
            include: {
              model: db.Product,
              attributes: ['id', 'name'],
              through: {
                attributes: []
              }
            },
            where: {
              id: _defineProperty({}, Op.eq, sub_category_id)
            }
          });
        case 5:
          _yield$db$SubCategory2 = _context6.sent;
          count = _yield$db$SubCategory2.count;
          productListRaw = _yield$db$SubCategory2.rows;
          pageTotal = Math.ceil(productListRaw.length / item_limit);
          productListRaw.reverse();
          productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();
          productListFinal = [];
          _context6.next = 14;
          return productListRaw.forEach(function (item) {
            var product = item.Products;
            if (product.id != null) {
              productListFinal = [].concat(_toConsumableArray(productListFinal), [product]);
            }
          });
        case 14:
          _context6.next = 16;
          return Promise.all(productListFinal.map( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(item) {
              var productTypes, _$minBy5, currentPrice, _$minBy6, price, productImages;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return db.ProductType.findAll({
                      raw: true,
                      attributes: ['id', 'currentPrice', 'price'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 2:
                    productTypes = _context5.sent;
                    _$minBy5 = _.minBy(productTypes, function (o) {
                      return o.currentPrice;
                    }), currentPrice = _$minBy5.currentPrice;
                    _$minBy6 = _.minBy(productTypes, function (o) {
                      return o.price;
                    }), price = _$minBy6.price;
                    _context5.next = 7;
                    return db.Image.findOne({
                      raw: true,
                      nest: true,
                      attributes: ['id', 'image'],
                      where: {
                        productID: _defineProperty({}, Op.eq, item.id)
                      }
                    });
                  case 7:
                    productImages = _context5.sent;
                    return _context5.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      image: productImages.image,
                      current_price: currentPrice,
                      price: price
                    }));
                  case 9:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x10) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 16:
          productListFinalWithImage = _context6.sent;
          return _context6.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: count,
              product_list: productListFinalWithImage
            },
            EM: 'Get products by sub-category !'
          });
        case 18:
          return _context6.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 21]]);
  }));
  return function getProductsBySubCategory(_x7, _x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();
var putUpdateProductImage = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    var id, image, existImage, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = data.id, image = data.image;
          _context7.next = 4;
          return db.Image.findOne({
            where: {
              id: +id
            },
            attributes: ['id'],
            raw: true
          });
        case 4:
          existImage = _context7.sent;
          if (_.isEmpty(existImage)) {
            _context7.next = 10;
            break;
          }
          _context7.next = 8;
          return db.Image.update({
            image: image
          }, {
            where: {
              id: +id
            }
          });
        case 8:
          result = _context7.sent;
          return _context7.abrupt("return", {
            EC: 0,
            EM: 'Update product image successfully !',
            DT: ''
          });
        case 10:
          _context7.next = 16;
          break;
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", {
            EC: -2,
            EM: 'Something is wrong on services !',
            DT: ''
          });
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function putUpdateProductImage(_x11) {
    return _ref7.apply(this, arguments);
  };
}();
var getSearchProducts = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(product_name) {
    var productList;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return db.Product.findAll({
            where: {
              name: _defineProperty({}, Op.substring, "".concat(product_name))
            },
            limit: 25,
            attributes: ['id', 'name'],
            raw: true
          });
        case 3:
          productList = _context8.sent;
          return _context8.abrupt("return", {
            EC: 0,
            DT: productList,
            EM: 'Search products successfully'
          });
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", {
            EC: -2,
            EM: 'Something is wrong on services !',
            DT: ''
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getSearchProducts(_x12) {
    return _ref8.apply(this, arguments);
  };
}();
module.exports = {
  getProductsByCategory: getProductsByCategory,
  getProductsBySubCategory: getProductsBySubCategory,
  putUpdateProductImage: putUpdateProductImage,
  getSearchProducts: getSearchProducts,
  getProductDetail: getProductDetail
};