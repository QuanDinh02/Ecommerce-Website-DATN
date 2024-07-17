"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var addNewOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(orderData, session_id) {
    var order_items, product_detail_list, shop_id_list, remove_dup_list, order_data_list;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          order_items = orderData.order_items;
          _context4.next = 4;
          return Promise.all(order_items.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(item) {
              var product_info;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return db.Product.findOne({
                      raw: true,
                      attributes: ['id', 'shop_id'],
                      where: {
                        id: _defineProperty({}, Op.eq, item.productID)
                      }
                    });
                  case 2:
                    product_info = _context.sent;
                    return _context.abrupt("return", _objectSpread(_objectSpread({}, item), {}, {
                      shop_id: product_info.shop_id
                    }));
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 4:
          product_detail_list = _context4.sent;
          _context4.next = 7;
          return product_detail_list.map(function (item) {
            return {
              shop_id: item.shop_id
            };
          });
        case 7:
          shop_id_list = _context4.sent;
          remove_dup_list = _.uniqBy(shop_id_list, function (e) {
            return e.shop_id;
          });
          order_data_list = remove_dup_list.map(function (shop) {
            var order_item_list = product_detail_list.filter(function (product) {
              return product.shop_id === shop.shop_id;
            });
            return {
              seller_id: shop.shop_id,
              order_item_list: order_item_list
            };
          });
          _context4.next = 12;
          return Promise.all(order_items.map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(order_item) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return db.ProductType.decrement('quantity', {
                      by: order_item.quantity,
                      where: {
                        productID: +order_item.productID
                      }
                    });
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x4) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 12:
          _context4.next = 14;
          return Promise.all(order_data_list.map( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(order_by_shop) {
              var order_items, total_order_price, newOrder, orderInfo, orderItemBuild, buyItemsBuild;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    order_items = order_by_shop.order_item_list;
                    total_order_price = _.sumBy(order_items, function (o) {
                      return o.price * o.quantity;
                    });
                    _context3.next = 4;
                    return db.Order.create({
                      orderDate: new Date(),
                      shipFee: orderData.shipFee,
                      totalPrice: total_order_price + orderData.shipFee,
                      shipMethod: orderData.shipMethod,
                      shippingUnit: orderData.shippingUnit,
                      fullName: orderData.fullName,
                      phone: orderData.phone,
                      address: orderData.address,
                      note: orderData.note,
                      customerID: orderData.customerID,
                      sellerID: order_by_shop.seller_id
                    });
                  case 4:
                    newOrder = _context3.sent;
                    if (!newOrder) {
                      _context3.next = 17;
                      break;
                    }
                    orderInfo = newOrder.dataValues;
                    orderItemBuild = order_items.map(function (item) {
                      return {
                        productID: item.productID,
                        price: item.price,
                        quantity: item.quantity,
                        orderID: orderInfo.id
                      };
                    });
                    _context3.next = 10;
                    return db.OrderItem.bulkCreate(orderItemBuild);
                  case 10:
                    buyItemsBuild = order_items.map(function (item) {
                      return {
                        sessionID: session_id,
                        productID: item.productID,
                        type: 1
                      };
                    });
                    _context3.next = 13;
                    return db.SessionActivity.bulkCreate(buyItemsBuild);
                  case 13:
                    _context3.next = 15;
                    return db.Shipment.create({
                      status: 1,
                      updatedDate: orderInfo.orderDate,
                      orderID: orderInfo.id
                    });
                  case 15:
                    _context3.next = 17;
                    return db.Transaction.create({
                      orderID: orderInfo.id,
                      payment: orderData.paymentMethod,
                      amount: orderData.totalPrice,
                      status: 1,
                      createdAt: orderInfo.orderDate,
                      updatedAt: orderInfo.orderDate
                    });
                  case 17:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x5) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 14:
          return _context4.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Thêm đơn hàng thành công !'
          });
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function addNewOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getOrderByCustomer = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(customer_id, status) {
    var order_list, order_detail_list, filter_order_list;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
              customerID: _defineProperty({}, Op.eq, customer_id)
            }
          });
        case 3:
          order_list = _context7.sent;
          order_list.reverse();
          _context7.next = 7;
          return Promise.all(order_list.map( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(order) {
              var order_status, order_status_info, order_item_list, order_item_list_format;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
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
                        orderID: _defineProperty({}, Op.eq, +order.id)
                      },
                      order: [['updatedDate', 'DESC']]
                    });
                  case 2:
                    order_status = _context6.sent;
                    order_status_info = order_status[0];
                    _context6.next = 6;
                    return db.OrderItem.findAll({
                      raw: true,
                      nest: true,
                      attributes: ['id', 'quantity', 'price'],
                      include: [{
                        model: db.Product,
                        attributes: ['id', 'name']
                      }],
                      where: {
                        orderID: _defineProperty({}, Op.eq, order.id)
                      }
                    });
                  case 6:
                    order_item_list = _context6.sent;
                    _context6.next = 9;
                    return Promise.all(order_item_list.map( /*#__PURE__*/function () {
                      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(order_item) {
                        var orderItem, productInfo, productType, getObjectParams, command, url;
                        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                          while (1) switch (_context5.prev = _context5.next) {
                            case 0:
                              orderItem = order_item;
                              productInfo = orderItem.Product;
                              delete orderItem.Product;
                              _context5.next = 5;
                              return db.ProductType.findOne({
                                raw: true,
                                attributes: ['id', 'price', 'quantity'],
                                where: {
                                  productID: _defineProperty({}, Op.eq, productInfo.id)
                                }
                              });
                            case 5:
                              productType = _context5.sent;
                              getObjectParams = {
                                Bucket: bucketName,
                                Key: "".concat(productInfo.id, ".jpeg")
                              };
                              command = new GetObjectCommand(getObjectParams);
                              _context5.next = 10;
                              return getSignedUrl(s3, command, {
                                expiresIn: 3600
                              });
                            case 10:
                              url = _context5.sent;
                              return _context5.abrupt("return", _objectSpread(_objectSpread({}, orderItem), {}, {
                                product_id: productInfo.id,
                                product_name: productInfo.name,
                                product_price: productType.price,
                                product_image: url
                              }));
                            case 12:
                            case "end":
                              return _context5.stop();
                          }
                        }, _callee5);
                      }));
                      return function (_x9) {
                        return _ref7.apply(this, arguments);
                      };
                    }()));
                  case 9:
                    order_item_list_format = _context6.sent;
                    return _context6.abrupt("return", _objectSpread(_objectSpread({}, order), {}, {
                      status: {
                        id: order_status_info.ShipmentStatus.id,
                        name: order_status_info.ShipmentStatus.name,
                        date: order_status_info.updatedDate
                      },
                      order_item_list: order_item_list_format
                    }));
                  case 11:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x8) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 7:
          order_detail_list = _context7.sent;
          if (!(status === 0)) {
            _context7.next = 12;
            break;
          }
          return _context7.abrupt("return", {
            EC: 0,
            DT: order_detail_list,
            EM: 'Tất cả đơn hàng của khách hàng !'
          });
        case 12:
          filter_order_list = order_detail_list.filter(function (order) {
            return order.status.id === status;
          });
          return _context7.abrupt("return", {
            EC: 0,
            DT: filter_order_list,
            EM: ''
          });
        case 14:
          _context7.next = 20;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 16]]);
  }));
  return function getOrderByCustomer(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
var getOrderSearchByCustomer = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(order_id) {
    var order_info, order_status, order_status_info, order_item_list, order_item_list_format;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return db.Order.findOne({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
              id: _defineProperty({}, Op.eq, order_id)
            }
          });
        case 3:
          order_info = _context9.sent;
          if (!order_info) {
            _context9.next = 18;
            break;
          }
          _context9.next = 7;
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
        case 7:
          order_status = _context9.sent;
          order_status_info = order_status[0];
          _context9.next = 11;
          return db.OrderItem.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'price'],
            include: [{
              model: db.Product,
              attributes: ['id', 'name']
            }],
            where: {
              orderID: _defineProperty({}, Op.eq, order_id)
            }
          });
        case 11:
          order_item_list = _context9.sent;
          _context9.next = 14;
          return Promise.all(order_item_list.map( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(order_item) {
              var orderItem, productInfo, productType, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    orderItem = order_item;
                    productInfo = orderItem.Product;
                    delete orderItem.Product;
                    _context8.next = 5;
                    return db.ProductType.findOne({
                      raw: true,
                      attributes: ['id', 'price', 'quantity'],
                      where: {
                        productID: _defineProperty({}, Op.eq, productInfo.id)
                      }
                    });
                  case 5:
                    productType = _context8.sent;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context8.next = 10;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 10:
                    url = _context8.sent;
                    return _context8.abrupt("return", _objectSpread(_objectSpread({}, orderItem), {}, {
                      product_id: productInfo.id,
                      product_name: productInfo.name,
                      product_price: productType.price,
                      product_image: url
                    }));
                  case 12:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x11) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 14:
          order_item_list_format = _context9.sent;
          return _context9.abrupt("return", {
            EC: 0,
            DT: [_objectSpread(_objectSpread({}, order_info), {}, {
              status: {
                id: order_status_info.ShipmentStatus.id,
                name: order_status_info.ShipmentStatus.name,
                date: order_status_info.updatedDate
              },
              order_item_list: order_item_list_format
            })],
            EM: 'Đơn hàng tìm kiếm !'
          });
        case 18:
          return _context9.abrupt("return", {
            EC: 0,
            DT: [],
            EM: 'Đơn hàng tìm kiếm !'
          });
        case 19:
          _context9.next = 25;
          break;
        case 21:
          _context9.prev = 21;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 25:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 21]]);
  }));
  return function getOrderSearchByCustomer(_x10) {
    return _ref8.apply(this, arguments);
  };
}();
var getCustomerOrderDetail = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(order_id) {
    var order_status_history_raw, order_status_history, transaction_info, transactionPaymentMethod, order_info, shippingMethod, shippingUnit, order_item_list, order_item_list_format;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return db.Shipment.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'status', 'updatedDate'],
            include: {
              model: db.ShipmentStatus,
              attributes: ['id', 'name']
            },
            where: {
              orderID: _defineProperty({}, Op.eq, +order_id)
            }
          });
        case 3:
          order_status_history_raw = _context11.sent;
          order_status_history = order_status_history_raw.map(function (item) {
            return {
              id: item.ShipmentStatus.id,
              name: item.ShipmentStatus.name,
              date: item.updatedDate
            };
          });
          order_status_history.reverse();
          _context11.next = 8;
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
        case 8:
          transaction_info = _context11.sent;
          transactionPaymentMethod = transaction_info.TransactionPaymentMethod;
          _context11.next = 12;
          return db.Order.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'orderDate', 'totalPrice', 'shipFee', 'address', 'fullName', 'phone'],
            include: [{
              model: db.ShippingMethod,
              attributes: ['id', 'nameMethod', 'price']
            }, {
              model: db.ShippingUnit,
              attributes: ['id', 'nameUnit']
            }],
            where: {
              id: _defineProperty({}, Op.eq, +order_id)
            }
          });
        case 12:
          order_info = _context11.sent;
          shippingMethod = order_info.ShippingMethod;
          shippingUnit = order_info.ShippingUnit;
          _context11.next = 17;
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
        case 17:
          order_item_list = _context11.sent;
          _context11.next = 20;
          return Promise.all(order_item_list.map( /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(order_item) {
              var orderItem, productInfo, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    orderItem = order_item;
                    productInfo = orderItem.Product;
                    delete orderItem.Product;
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context10.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context10.sent;
                    return _context10.abrupt("return", _objectSpread(_objectSpread({}, orderItem), {}, {
                      product_id: productInfo.id,
                      product_name: productInfo.name,
                      product_image: url
                    }));
                  case 9:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return function (_x13) {
              return _ref11.apply(this, arguments);
            };
          }()));
        case 20:
          order_item_list_format = _context11.sent;
          return _context11.abrupt("return", {
            EC: 0,
            DT: {
              id: order_info.id,
              orderDate: order_info.orderDate,
              totalPrice: order_info.totalPrice,
              shipFee: order_info.shipFee,
              shipping_location: {
                address: order_info.address,
                fullName: order_info.fullName,
                phone: order_info.phone
              },
              payment_method: transactionPaymentMethod.method_name,
              shipping_method: shippingMethod.nameMethod,
              shipping_unit: shippingUnit.nameUnit,
              order_item_list: order_item_list_format,
              order_status_history: order_status_history
            },
            EM: 'Order Detail !'
          });
        case 24:
          _context11.prev = 24;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 28:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 24]]);
  }));
  return function getCustomerOrderDetail(_x12) {
    return _ref10.apply(this, arguments);
  };
}();
var getOrderItemInfoForRating = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(order_id) {
    var orderStatus, order_item_list, product_review_data_raw, product_review_data, product_list;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return db.Shipment.findOne({
            raw: true,
            where: _defineProperty({}, Op.and, [{
              status: _defineProperty({}, Op.eq, 7)
            }, {
              orderID: _defineProperty({}, Op.eq, +order_id)
            }])
          });
        case 3:
          orderStatus = _context13.sent;
          if (!orderStatus) {
            _context13.next = 20;
            break;
          }
          _context13.next = 7;
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
        case 7:
          order_item_list = _context13.sent;
          _context13.next = 10;
          return db.OrderProductReview.findAll({
            raw: true,
            nest: true,
            include: [{
              model: db.ProductReview,
              attributes: ['id', 'rating', 'productID', 'comment']
            }],
            where: {
              orderID: _defineProperty({}, Op.eq, +order_id)
            }
          });
        case 10:
          product_review_data_raw = _context13.sent;
          _context13.next = 13;
          return product_review_data_raw.map(function (item) {
            return item.ProductReview;
          });
        case 13:
          product_review_data = _context13.sent;
          _context13.next = 16;
          return Promise.all(order_item_list.map( /*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(order_item) {
              var orderItem, productInfo, review, getObjectParams, command, url;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    orderItem = order_item;
                    productInfo = orderItem.Product;
                    review = product_review_data.filter(function (item) {
                      return item.productID === productInfo.id;
                    });
                    getObjectParams = {
                      Bucket: bucketName,
                      Key: "".concat(productInfo.id, ".jpeg")
                    };
                    command = new GetObjectCommand(getObjectParams);
                    _context12.next = 7;
                    return getSignedUrl(s3, command, {
                      expiresIn: 3600
                    });
                  case 7:
                    url = _context12.sent;
                    return _context12.abrupt("return", {
                      id: productInfo.id,
                      name: productInfo.name,
                      image: url,
                      review: review.length === 0 ? {
                        id: 0,
                        rating: 0,
                        comment: ""
                      } : {
                        id: review[0].id,
                        rating: review[0].rating,
                        comment: review[0].comment
                      }
                    });
                  case 9:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            return function (_x15) {
              return _ref13.apply(this, arguments);
            };
          }()));
        case 16:
          product_list = _context13.sent;
          return _context13.abrupt("return", {
            EC: 0,
            DT: {
              id: order_id,
              product_list: product_list
            },
            EM: 'Order Items !'
          });
        case 20:
          return _context13.abrupt("return", {
            EC: 0,
            DT: {
              id: order_id,
              product_list: []
            },
            EM: 'Order Items !'
          });
        case 21:
          _context13.next = 27;
          break;
        case 23:
          _context13.prev = 23;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 27:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 23]]);
  }));
  return function getOrderItemInfoForRating(_x14) {
    return _ref12.apply(this, arguments);
  };
}();
var customerRatingProduct = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data, customer_id) {
    var product_data, order_id, review, date, review_info, reviewInfo, _yield$db$ProductRevi, count, productReviewList, newRating, _yield$db$ProductRevi2, _count, _productReviewList, _newRating;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          product_data = data.product_data, order_id = data.order_id;
          review = product_data.review;
          date = new Date();
          if (!(review.id === 0)) {
            _context14.next = 23;
            break;
          }
          _context14.next = 7;
          return db.ProductReview.create({
            comment: review.comment,
            rating: +review.rating,
            productID: +product_data.id,
            customerID: +customer_id,
            createdAt: date,
            updatedAt: date
          });
        case 7:
          review_info = _context14.sent;
          if (!review_info) {
            _context14.next = 21;
            break;
          }
          reviewInfo = review_info.dataValues;
          _context14.next = 12;
          return db.OrderProductReview.create({
            orderID: +order_id,
            productReviewID: +reviewInfo.id
          });
        case 12:
          _context14.next = 14;
          return db.ProductReview.findAndCountAll({
            raw: true,
            attributes: ['rating'],
            where: {
              productID: _defineProperty({}, Op.eq, +product_data.id)
            }
          });
        case 14:
          _yield$db$ProductRevi = _context14.sent;
          count = _yield$db$ProductRevi.count;
          productReviewList = _yield$db$ProductRevi.rows;
          newRating = Math.round(parseFloat(_.sumBy(productReviewList, 'rating') / count) * 10) / 10;
          _context14.next = 20;
          return db.ProductRating.update({
            rating: newRating
          }, {
            where: {
              productID: _defineProperty({}, Op.eq, +product_data.id)
            }
          });
        case 20:
          return _context14.abrupt("return", {
            EC: 0,
            DT: {
              id: product_data.id,
              name: product_data.name,
              review: {
                id: +reviewInfo.id,
                rating: +reviewInfo.rating,
                comment: reviewInfo.comment
              }
            },
            EM: 'Đã đánh giá sản phẩm !'
          });
        case 21:
          _context14.next = 34;
          break;
        case 23:
          _context14.next = 25;
          return db.ProductReview.update({
            rating: review.rating,
            comment: review.comment,
            updatedAt: date
          }, {
            where: {
              id: _defineProperty({}, Op.eq, +review.id)
            }
          });
        case 25:
          _context14.next = 27;
          return db.ProductReview.findAndCountAll({
            raw: true,
            attributes: ['rating'],
            where: {
              productID: _defineProperty({}, Op.eq, +product_data.id)
            }
          });
        case 27:
          _yield$db$ProductRevi2 = _context14.sent;
          _count = _yield$db$ProductRevi2.count;
          _productReviewList = _yield$db$ProductRevi2.rows;
          _newRating = Math.round(parseFloat(_.sumBy(_productReviewList, 'rating') / _count) * 10) / 10;
          _context14.next = 33;
          return db.ProductRating.update({
            rating: _newRating
          }, {
            where: {
              productID: _defineProperty({}, Op.eq, +product_data.id)
            }
          });
        case 33:
          return _context14.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Đã chỉnh sửa đánh giá sản phẩm !'
          });
        case 34:
          _context14.next = 40;
          break;
        case 36:
          _context14.prev = 36;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          return _context14.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 40:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 36]]);
  }));
  return function customerRatingProduct(_x16, _x17) {
    return _ref14.apply(this, arguments);
  };
}();
var getShippingMethod = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
    var shipping_method_list;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return db.ShippingMethod.findAll({
            raw: true,
            attributes: ['id', 'nameMethod', 'price', 'status']
          });
        case 3:
          shipping_method_list = _context15.sent;
          return _context15.abrupt("return", {
            EC: 0,
            DT: shipping_method_list,
            EM: 'Shipping method'
          });
        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);
          return _context15.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 11:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 7]]);
  }));
  return function getShippingMethod() {
    return _ref15.apply(this, arguments);
  };
}();
var getPaymentMethod = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    var payment_method_list;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return db.TransactionPaymentMethod.findAll({
            raw: true,
            attributes: ['id', 'method_name', 'status']
          });
        case 3:
          payment_method_list = _context16.sent;
          return _context16.abrupt("return", {
            EC: 0,
            DT: payment_method_list,
            EM: 'Payment method'
          });
        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 11:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 7]]);
  }));
  return function getPaymentMethod() {
    return _ref16.apply(this, arguments);
  };
}();
var cancelOrderByCustomer = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(order_id) {
    var order_status, order_status_info_id, update_date, order_item_list;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
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
        case 3:
          order_status = _context18.sent;
          order_status_info_id = order_status[0].ShipmentStatus.id;
          if (!(order_status_info_id === 1)) {
            _context18.next = 19;
            break;
          }
          update_date = new Date();
          _context18.next = 9;
          return db.Shipment.create({
            status: 10,
            updatedDate: update_date,
            orderID: order_id
          });
        case 9:
          _context18.next = 11;
          return db.Transaction.update({
            status: 3,
            updatedAt: update_date
          }, {
            where: {
              orderID: _defineProperty({}, Op.eq, +order_id)
            }
          });
        case 11:
          _context18.next = 13;
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
        case 13:
          order_item_list = _context18.sent;
          _context18.next = 16;
          return Promise.all(order_item_list.map( /*#__PURE__*/function () {
            var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(order_item) {
              var productInfo;
              return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                while (1) switch (_context17.prev = _context17.next) {
                  case 0:
                    productInfo = order_item.Product;
                    _context17.next = 3;
                    return db.ProductType.increment({
                      quantity: order_item.quantity
                    }, {
                      where: {
                        productID: productInfo.id
                      }
                    });
                  case 3:
                  case "end":
                    return _context17.stop();
                }
              }, _callee17);
            }));
            return function (_x19) {
              return _ref18.apply(this, arguments);
            };
          }()));
        case 16:
          return _context18.abrupt("return", {
            EC: 0,
            DT: "",
            EM: 'Hủy đơn hàng thành công'
          });
        case 19:
          return _context18.abrupt("return", {
            EC: -1,
            DT: "",
            EM: 'Đơn hàng không thể hủy'
          });
        case 20:
          _context18.next = 26;
          break;
        case 22:
          _context18.prev = 22;
          _context18.t0 = _context18["catch"](0);
          console.log(_context18.t0);
          return _context18.abrupt("return", {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !'
          });
        case 26:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 22]]);
  }));
  return function cancelOrderByCustomer(_x18) {
    return _ref17.apply(this, arguments);
  };
}();
module.exports = {
  addNewOrder: addNewOrder,
  getOrderByCustomer: getOrderByCustomer,
  getShippingMethod: getShippingMethod,
  getPaymentMethod: getPaymentMethod,
  getCustomerOrderDetail: getCustomerOrderDetail,
  getOrderSearchByCustomer: getOrderSearchByCustomer,
  cancelOrderByCustomer: cancelOrderByCustomer,
  getOrderItemInfoForRating: getOrderItemInfoForRating,
  customerRatingProduct: customerRatingProduct
};