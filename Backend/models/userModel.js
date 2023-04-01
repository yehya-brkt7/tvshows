const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: {
      type: String,
    },
    list: [{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);

const listSchema = new Schema({
  list: {
    type: Array,
  },
});

module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("List", listSchema);
