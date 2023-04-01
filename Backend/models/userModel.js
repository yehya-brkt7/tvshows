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
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

const List = mongoose.model("List", listSchema);

module.exports = List;
module.exports = User;
