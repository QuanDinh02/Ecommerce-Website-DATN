const NodeCache = require("node-cache");

const cache = new NodeCache();

const cacheMiddleware = duration => (req, res, next) => {
    if (req.method !== 'GET') {
        //console.log("Cannot cache non-GET methods!")
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        //console.log(`Cache hit for ${key}`)
        res.send(cachedResponse);
    } else {
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            cache.set(key, body, duration);
        }
        next();
    }
}

module.exports =  { cacheMiddleware }

