"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _LoginRegisterService = require("./LoginRegisterService.js");
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
//sort_id: 1 - "Lượt xem tăng dần"

//sort_id: 2 - "Lượt xem giảm dần"

//sort_id: 3 - "Lượt đề xuất tăng dần"

//sort_id: 4 - "Lượt đề xuất giảm dần"

var SORT_TYPE = [['view'], ['view'], ['view'], ['recommend'], ['recommend']];
var SORT_TYPE_ORDER = [['asc'], ['asc'], ['desc'], ['asc'], ['desc']];
var handleSortData = function handleSortData(data, sort_id, off_set, limit) {
  var type = SORT_TYPE[sort_id];
  var type_order = SORT_TYPE_ORDER[sort_id];
  var pagination_data = _(data).orderBy(type, type_order).drop(off_set).take(limit).value();
  return pagination_data;
};
var getAnalysisProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(item_limit, page, category_id, sub_category_id, sort_id) {
    var offSet, subCategoryList, sub_category_list, productListRaw, _listLength, _pageTotal, _analysis_product_data, _productTrackingPangination, _productListRaw, _listLength2, _pageTotal2, _analysis_product_data2, _productTrackingPangination2, productTrackingRaw, listLength, pageTotal, productTrackingPangination, analysis_product_data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (!(item_limit > 0)) {
            _context.next = 35;
            break;
          }
          offSet = (page - 1) * item_limit;
          if (!(category_id !== 0 && sub_category_id === 0)) {
            _context.next = 18;
            break;
          }
          _context.next = 6;
          return db.SubCategory.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'title'],
            where: {
              categoryID: _defineProperty({}, Op.eq, category_id)
            }
          });
        case 6:
          subCategoryList = _context.sent;
          _context.next = 9;
          return subCategoryList.map(function (item) {
            return item.id;
          });
        case 9:
          sub_category_list = _context.sent;
          _context.next = 12;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.Product,
              raw: true,
              nest: true,
              attributes: ['id', 'name'],
              include: {
                model: db.ProductTracking,
                attributes: ['productID', 'view', 'recommend', 'recommend_view']
              }
            }],
            where: {
              subCategoryID: _defineProperty({}, Op["in"], sub_category_list)
            }
          });
        case 12:
          productListRaw = _context.sent;
          _listLength = productListRaw.length;
          _pageTotal = Math.ceil(_listLength / item_limit); //let productTrackingPangination = _(productListRaw).drop(offSet).take(item_limit).value();
          _analysis_product_data = productListRaw.map(function (product) {
            var productInfo = product.Product;
            var productTrackingInfo = productInfo.ProductTracking;
            return {
              id: productInfo.id,
              name: productInfo.name,
              view: productTrackingInfo.view,
              recommend: productTrackingInfo.recommend,
              recommend_view: productTrackingInfo.recommend_view
            };
          });
          _productTrackingPangination = handleSortData(_analysis_product_data, sort_id, offSet, item_limit);
          return _context.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal,
              total_items: _listLength,
              analysis_product_list: _productTrackingPangination
            },
            EM: 'Get analysis products !'
          });
        case 18:
          if (!(sub_category_id !== 0)) {
            _context.next = 27;
            break;
          }
          _context.next = 21;
          return db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.Product,
              raw: true,
              nest: true,
              attributes: ['id', 'name'],
              include: {
                model: db.ProductTracking,
                attributes: ['productID', 'view', 'recommend', 'recommend_view']
              }
            }],
            where: {
              subCategoryID: _defineProperty({}, Op.eq, sub_category_id)
            }
          });
        case 21:
          _productListRaw = _context.sent;
          _listLength2 = _productListRaw.length;
          _pageTotal2 = Math.ceil(_listLength2 / item_limit);
          _analysis_product_data2 = _productListRaw.map(function (product) {
            var productInfo = product.Product;
            var productTrackingInfo = productInfo.ProductTracking;
            return {
              id: productInfo.id,
              name: productInfo.name,
              view: productTrackingInfo.view,
              recommend: productTrackingInfo.recommend,
              recommend_view: productTrackingInfo.recommend_view
            };
          });
          _productTrackingPangination2 = handleSortData(_analysis_product_data2, sort_id, offSet, item_limit);
          return _context.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: _pageTotal2,
              total_items: _listLength2,
              analysis_product_list: _productTrackingPangination2
            },
            EM: 'Get analysis products !'
          });
        case 27:
          _context.next = 29;
          return db.ProductTracking.findAll({
            raw: true,
            nest: true,
            attributes: ['productID', 'view', 'recommend', 'recommend_view'],
            include: {
              model: db.Product,
              attributes: ['name']
            }
          });
        case 29:
          productTrackingRaw = _context.sent;
          listLength = productTrackingRaw.length;
          pageTotal = Math.ceil(listLength / item_limit); //let productTrackingPangination = _(productTrackingRaw).orderBy(SORT_TYPE[sort_id], SORT_TYPE_ORDER[sort_id]).drop(offSet).take(item_limit).value();
          productTrackingPangination = handleSortData(productTrackingRaw, sort_id, offSet, item_limit);
          analysis_product_data = productTrackingPangination.map(function (product) {
            return {
              id: product.productID,
              name: product.Product.name,
              view: product.view,
              recommend: product.recommend,
              recommend_view: product.recommend_view
            };
          });
          return _context.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              analysis_product_list: analysis_product_data
            },
            EM: 'Get analysis products !'
          });
        case 35:
          return _context.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 38:
          _context.prev = 38;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 42:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 38]]);
  }));
  return function getAnalysisProduct(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var getAnalysisProductSearch = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(product_id) {
    var productTracking, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return db.ProductTracking.findOne({
            raw: true,
            nest: true,
            attributes: ['productID', 'view', 'recommend', 'recommend_view'],
            include: {
              model: db.Product,
              attributes: ['name']
            },
            where: {
              productID: _defineProperty({}, Op.eq, +product_id)
            }
          });
        case 3:
          productTracking = _context2.sent;
          if (!productTracking) {
            _context2.next = 9;
            break;
          }
          data = {
            id: productTracking.productID,
            name: productTracking.Product.name,
            view: productTracking.view,
            recommend: productTracking.recommend,
            recommend_view: productTracking.recommend_view
          };
          return _context2.abrupt("return", {
            EC: 0,
            DT: [data],
            EM: 'Get analysis product search !'
          });
        case 9:
          return _context2.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'Get analysis product search !'
          });
        case 10:
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function getAnalysisProductSearch(_x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getDashboardData = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var _yield$db$User$findAn, staff, _yield$db$User$findAn2, customer, _yield$db$User$findAn3, seller, _yield$db$User$findAn4, shipping_unit, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return db.User.findAndCountAll({
            raw: true,
            where: {
              role: _defineProperty({}, Op.eq, 1)
            }
          });
        case 3:
          _yield$db$User$findAn = _context3.sent;
          staff = _yield$db$User$findAn.count;
          _context3.next = 7;
          return db.User.findAndCountAll({
            raw: true,
            where: {
              role: _defineProperty({}, Op.eq, 3)
            }
          });
        case 7:
          _yield$db$User$findAn2 = _context3.sent;
          customer = _yield$db$User$findAn2.count;
          _context3.next = 11;
          return db.User.findAndCountAll({
            raw: true,
            where: {
              role: _defineProperty({}, Op.eq, 2)
            }
          });
        case 11:
          _yield$db$User$findAn3 = _context3.sent;
          seller = _yield$db$User$findAn3.count;
          _context3.next = 15;
          return db.User.findAndCountAll({
            raw: true,
            where: {
              role: _defineProperty({}, Op.eq, 4)
            }
          });
        case 15:
          _yield$db$User$findAn4 = _context3.sent;
          shipping_unit = _yield$db$User$findAn4.count;
          data = [customer, seller, staff, shipping_unit];
          return _context3.abrupt("return", {
            EC: 0,
            DT: data,
            EM: 'Get admin dashboard data !'
          });
        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 21]]);
  }));
  return function getDashboardData() {
    return _ref3.apply(this, arguments);
  };
}();
var getCustomerData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(item_limit, page) {
    var offSet, customerList, listLength, pageTotal, customerDataPangination, customerDataPanginationFormat;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!(item_limit > 0)) {
            _context4.next = 12;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context4.next = 5;
          return db.Customer.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'mobile', 'email'],
            include: {
              model: db.User,
              attributes: ['id', 'active']
            }
          });
        case 5:
          customerList = _context4.sent;
          listLength = customerList.length;
          pageTotal = Math.ceil(listLength / item_limit);
          customerList.reverse();
          customerDataPangination = _(customerList).drop(offSet).take(item_limit).value();
          customerDataPanginationFormat = customerDataPangination.map(function (customer) {
            return {
              id: customer.id,
              name: customer.name,
              mobile: customer.mobile,
              email: customer.email,
              uid: customer.User.id,
              active: customer.User.active
            };
          });
          return _context4.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              customer_list: customerDataPanginationFormat
            },
            EM: 'Get customer data !'
          });
        case 12:
          return _context4.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function getCustomerData(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getCustomerInfoDetail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(customer_id) {
    var customerInfo, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return db.Customer.findOne({
            raw: true,
            nest: true,
            attributes: ['name', 'mobile', 'email', 'gender', 'birth'],
            include: {
              model: db.User,
              attributes: ['registeredAt']
            },
            where: {
              id: _defineProperty({}, Op.eq, +customer_id)
            }
          });
        case 3:
          customerInfo = _context5.sent;
          if (!customerInfo) {
            _context5.next = 7;
            break;
          }
          data = {
            name: customerInfo.name,
            mobile: customerInfo.mobile,
            email: customerInfo.email,
            gender: customerInfo.gender,
            birth: customerInfo.birth,
            join_date: customerInfo.User.registeredAt
          };
          return _context5.abrupt("return", {
            EC: 0,
            DT: data,
            EM: 'Get customer info detail !'
          });
        case 7:
          return _context5.abrupt("return", {
            EC: -1,
            DT: null,
            EM: 'Customer is not existed !'
          });
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function getCustomerInfoDetail(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
var getCustomerSearch = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(search_content) {
    var customerList, customerListFormat;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return db.Customer.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'mobile', 'email'],
            include: {
              raw: true,
              model: db.User,
              attributes: ['id', 'active']
            },
            where: _defineProperty({}, Op.or, [{
              name: _defineProperty({}, Op.substring, search_content)
            }, {
              mobile: _defineProperty({}, Op.substring, search_content)
            }])
          });
        case 3:
          customerList = _context6.sent;
          customerListFormat = customerList.map(function (customer) {
            return {
              id: customer.id,
              name: customer.name,
              mobile: customer.mobile,
              email: customer.email,
              uid: customer.User.id,
              active: customer.User.active
            };
          });
          return _context6.abrupt("return", {
            EC: 0,
            DT: {
              customer_list: customerListFormat
            },
            EM: 'Get customer data search !'
          });
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getCustomerSearch(_x10) {
    return _ref6.apply(this, arguments);
  };
}();
var updateAccountStatus = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(data) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return db.User.update({
            active: +data.status
          }, {
            where: {
              id: +data.uid
            }
          });
        case 3:
          if (!(+data.status === 1)) {
            _context7.next = 5;
            break;
          }
          return _context7.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Mở tài khoản thành công!'
          });
        case 5:
          if (!(+data.status === 0)) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Khóa tài khoản thành công!'
          });
        case 7:
          return _context7.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Không thể cập nhật!'
          });
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", null);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function updateAccountStatus(_x11) {
    return _ref7.apply(this, arguments);
  };
}();
var getSellerData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(item_limit, page) {
    var offSet, sellerList, listLength, pageTotal, sellerDataPangination, sellerDataPanginationFormat;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          if (!(item_limit > 0)) {
            _context8.next = 12;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context8.next = 5;
          return db.Seller.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'shopName', 'mobile', 'email'],
            include: {
              raw: true,
              model: db.User,
              attributes: ['id', 'active']
            }
          });
        case 5:
          sellerList = _context8.sent;
          listLength = sellerList.length;
          pageTotal = Math.ceil(listLength / item_limit);
          sellerList.reverse();
          sellerDataPangination = _(sellerList).drop(offSet).take(item_limit).value();
          sellerDataPanginationFormat = sellerDataPangination.map(function (seller) {
            return {
              id: seller.id,
              name: seller.name,
              shopName: seller.shopName,
              mobile: seller.mobile,
              email: seller.email,
              uid: seller.User.id,
              active: seller.User.active
            };
          });
          return _context8.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              seller_list: sellerDataPanginationFormat
            },
            EM: 'Get seller data !'
          });
        case 12:
          return _context8.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
          });
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 15]]);
  }));
  return function getSellerData(_x12, _x13) {
    return _ref8.apply(this, arguments);
  };
}();
var getSellerSearch = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(search_content) {
    var seller_list, sellerListFormat;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return db.Seller.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'shopName', 'mobile', 'email'],
            include: {
              raw: true,
              model: db.User,
              attributes: ['id', 'active']
            },
            where: _defineProperty({}, Op.or, [{
              shopName: _defineProperty({}, Op.substring, search_content)
            }, {
              mobile: _defineProperty({}, Op.substring, search_content)
            }])
          });
        case 3:
          seller_list = _context9.sent;
          sellerListFormat = seller_list.map(function (seller) {
            return {
              id: seller.id,
              name: seller.name,
              shopName: seller.shopName,
              mobile: seller.mobile,
              email: seller.email,
              uid: seller.User.id,
              active: seller.User.active
            };
          });
          return _context9.abrupt("return", {
            EC: 0,
            DT: {
              seller_list: sellerListFormat
            },
            EM: 'Get shop data search !'
          });
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function getSellerSearch(_x14) {
    return _ref9.apply(this, arguments);
  };
}();
var getSellerInfoDetail = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(seller_id) {
    var sellerInfo, data;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return db.Seller.findOne({
            raw: true,
            nest: true,
            attributes: ['name', 'mobile', 'email', 'gender', 'birth', 'shopName', 'address'],
            include: {
              model: db.User,
              attributes: ['registeredAt']
            },
            where: {
              id: _defineProperty({}, Op.eq, +seller_id)
            }
          });
        case 3:
          sellerInfo = _context10.sent;
          if (!sellerInfo) {
            _context10.next = 7;
            break;
          }
          data = {
            name: sellerInfo.name,
            mobile: sellerInfo.mobile,
            address: sellerInfo.address,
            email: sellerInfo.email,
            gender: sellerInfo.gender,
            birth: sellerInfo.birth,
            join_date: sellerInfo.User.registeredAt,
            shopName: sellerInfo.shopName
          };
          return _context10.abrupt("return", {
            EC: 0,
            DT: data,
            EM: 'Get seller info detail !'
          });
        case 7:
          return _context10.abrupt("return", {
            EC: -1,
            DT: null,
            EM: 'Seller is not existed !'
          });
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function getSellerInfoDetail(_x15) {
    return _ref10.apply(this, arguments);
  };
}();
var getShippingUnitData = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(item_limit, page) {
    var offSet, suList, listLength, pageTotal, suPangination;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          if (!(item_limit > 0)) {
            _context11.next = 11;
            break;
          }
          offSet = (page - 1) * item_limit;
          _context11.next = 5;
          return db.ShippingUnit.findAll({
            raw: true,
            attributes: ['id', 'nameUnit', 'address', 'mobile', 'description']
          });
        case 5:
          suList = _context11.sent;
          listLength = suList.length;
          pageTotal = Math.ceil(listLength / item_limit);
          suList.reverse();
          suPangination = _(suList).drop(offSet).take(item_limit).value();
          return _context11.abrupt("return", {
            EC: 0,
            DT: {
              page: page,
              page_total: pageTotal,
              total_items: listLength,
              su_list: suPangination
            },
            EM: 'Get shipping unit data !'
          });
        case 11:
          return _context11.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
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
  return function getShippingUnitData(_x16, _x17) {
    return _ref11.apply(this, arguments);
  };
}();
var getShippingUnitSearch = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(search_content) {
    var suList;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return db.ShippingUnit.findAll({
            raw: true,
            attributes: ['id', 'nameUnit', 'address', 'mobile', 'description'],
            where: _defineProperty({}, Op.or, [{
              nameUnit: _defineProperty({}, Op.substring, search_content)
            }, {
              mobile: _defineProperty({}, Op.substring, search_content)
            }])
          });
        case 3:
          suList = _context12.sent;
          return _context12.abrupt("return", {
            EC: 0,
            DT: {
              su_list: suList
            },
            EM: 'Get shipping unit data search !'
          });
        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          return _context12.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 11:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function getShippingUnitSearch(_x18) {
    return _ref12.apply(this, arguments);
  };
}();
var createShippingUnit = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(data) {
    var existSUName, existUsername, userInfo, user_info;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          if (!(data.mobile.length < 10 || data.mobile.length > 11)) {
            _context13.next = 3;
            break;
          }
          return _context13.abrupt("return", {
            EC: -1,
            DT: "",
            EM: "Số điện thoại không hợp lệ"
          });
        case 3:
          _context13.next = 5;
          return db.ShippingUnit.findOne({
            raw: true,
            where: {
              nameUnit: _defineProperty({}, Op.eq, data.nameUnit)
            }
          });
        case 5:
          existSUName = _context13.sent;
          if (!existSUName) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", {
            EC: -1,
            DT: "",
            EM: "Tên đơn vị đã tồn tại"
          });
        case 8:
          _context13.next = 10;
          return db.User.findOne({
            raw: true,
            where: {
              username: _defineProperty({}, Op.eq, data.username)
            }
          });
        case 10:
          existUsername = _context13.sent;
          if (!existUsername) {
            _context13.next = 13;
            break;
          }
          return _context13.abrupt("return", {
            EC: -1,
            DT: "",
            EM: "Tên tài khoản đã tồn tại"
          });
        case 13:
          _context13.next = 15;
          return db.User.create({
            username: data.username,
            password: (0, _LoginRegisterService.hashPassword)(data.password),
            role: 4,
            registeredAt: new Date()
          });
        case 15:
          userInfo = _context13.sent;
          if (!userInfo) {
            _context13.next = 21;
            break;
          }
          user_info = userInfo.dataValues;
          _context13.next = 20;
          return db.ShippingUnit.create({
            nameUnit: data.nameUnit,
            address: data.address,
            mobile: data.mobile,
            description: data.description,
            userID: user_info.id
          });
        case 20:
          return _context13.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Thêm mới đơn vị thành công !'
          });
        case 21:
          return _context13.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Lỗi thêm mới đơn vị !'
          });
        case 24:
          _context13.prev = 24;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 28:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 24]]);
  }));
  return function createShippingUnit(_x19) {
    return _ref13.apply(this, arguments);
  };
}();
var updateShippingUnit = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return db.ShippingUnit.update({
            nameUnit: data.nameUnit,
            address: data.address,
            mobile: data.mobile,
            description: data.description
          }, {
            where: {
              id: +data.id
            }
          });
        case 3:
          return _context14.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Cập nhật đơn vị thành công!'
          });
        case 6:
          _context14.prev = 6;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          return _context14.abrupt("return", null);
        case 10:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 6]]);
  }));
  return function updateShippingUnit(_x20) {
    return _ref14.apply(this, arguments);
  };
}();
var updateShippingUnitPassword = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(data) {
    var su_id, new_password, suInfo, user_id;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          su_id = data.su_id, new_password = data.new_password;
          _context15.next = 4;
          return db.ShippingUnit.findOne({
            raw: true,
            attributes: ['userID'],
            where: {
              id: _defineProperty({}, Op.eq, +su_id)
            }
          });
        case 4:
          suInfo = _context15.sent;
          if (!suInfo) {
            _context15.next = 10;
            break;
          }
          user_id = suInfo.userID;
          _context15.next = 9;
          return db.User.update({
            password: (0, _LoginRegisterService.hashPassword)(new_password)
          }, {
            where: {
              id: _defineProperty({}, Op.eq, +user_id)
            }
          });
        case 9:
          return _context15.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Thay đổi mật khẩu thành công!'
          });
        case 10:
          return _context15.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Đơn vị vận chuyển không tồn tại!'
          });
        case 13:
          _context15.prev = 13;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          return _context15.abrupt("return", null);
        case 17:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 13]]);
  }));
  return function updateShippingUnitPassword(_x21) {
    return _ref15.apply(this, arguments);
  };
}();
module.exports = {
  getAnalysisProduct: getAnalysisProduct,
  getAnalysisProductSearch: getAnalysisProductSearch,
  getDashboardData: getDashboardData,
  getCustomerData: getCustomerData,
  getCustomerSearch: getCustomerSearch,
  getSellerData: getSellerData,
  getSellerSearch: getSellerSearch,
  getShippingUnitData: getShippingUnitData,
  getShippingUnitSearch: getShippingUnitSearch,
  createShippingUnit: createShippingUnit,
  updateShippingUnit: updateShippingUnit,
  updateShippingUnitPassword: updateShippingUnitPassword,
  updateAccountStatus: updateAccountStatus,
  getCustomerInfoDetail: getCustomerInfoDetail,
  getSellerInfoDetail: getSellerInfoDetail
};