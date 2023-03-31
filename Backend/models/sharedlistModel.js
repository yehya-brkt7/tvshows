const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    username: {
      type: String,
    },
    usid: {
      type: String,
    },
    list: {
      type: Array,

      dafault: [],
    },
  },
  { timestamps: true },
  { typeKey: "$type" }
);

module.exports = mongoose.model("List", listSchema);
