const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const disabledSchema = new Schema({ id: String });
// const showSchema = new Schema({
//   disabledarray: [disabledSchema],
// });

// const disabledArr = new Schema ({ any : []})

const userSchema = new Schema(
  {
    uid: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
