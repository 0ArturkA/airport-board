const mCache = require('memory-cache');

module.exports = duration => {
  return (req, res, next) => {
    const key = `__express__${req.originUrl || req.url}`;
    const cachedBody = mCache.get(key);

    if (!!cachedBody) {
      return res.send(cachedBody);
    }

    res.sendResponse = res.send;
    res.send = body => {
      mCache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };

    next();
  };
};
