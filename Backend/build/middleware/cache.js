"use strict";

var NodeCache = require("node-cache");
var cache = new NodeCache();
var cacheMiddleware = function cacheMiddleware(duration) {
  return function (req, res, next) {
    if (req.method !== 'GET') {
      //console.log("Cannot cache non-GET methods!")
      return next();
    }
    var key = req.originalUrl;
    var cachedResponse = cache.get(key);
    if (cachedResponse) {
      //console.log(`Cache hit for ${key}`)
      res.send(cachedResponse);
    } else {
      res.originalSend = res.send;
      res.send = function (body) {
        res.originalSend(body);
        cache.set(key, body, duration);
      };
      next();
    }
  };
};
module.exports = {
  cacheMiddleware: cacheMiddleware
};