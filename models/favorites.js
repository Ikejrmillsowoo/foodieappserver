const mongoose = require("mongoose");
//const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: "",
    },
    open: {
      type: Boolean,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Favorites", favoritesSchema);
