module.exports = {
  in: (req, res, next) => {
    req.custom = req.custom || {};
    next();
  },
}
