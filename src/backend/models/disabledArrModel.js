const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const disabledarrSchema = new Schema({
  //   ids: {
  //     type: Array,
  //     required: true,
  //     default: [],
  //   },

  id: {
    type: Number,
  },
  usid: {
    type: String,
  },
});

module.exports = mongoose.model("Disabledarr", disabledarrSchema);
