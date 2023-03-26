const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const disabledSchema = new Schema({ id: String });
// const showSchema = new Schema({
//   disabledarray: [disabledSchema],
// });

// const disabledArr = new Schema ({ any : []})

const showSchema = new Schema(
  {
    title: {
      type: String,
    },
    genres: {
      type: Array,

      dafault: [],
    },
    rating: {
      type: Number,
    },
    fanrating: {
      type: Number,
      default: 5,
    },
    id: {
      type: Number,
    },
    usid: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
  { typeKey: "$type" }
);

module.exports = mongoose.model("Show", showSchema);
