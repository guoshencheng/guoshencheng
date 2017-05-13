var shortid = require("shortid");

module.exports = {
  name: 'Blog',
  params: {
    _id: {
      type: String,
      "default": shortid.generate
    },
    time: String,
    title: String,
    desc: String,
    md: String
  },
};
