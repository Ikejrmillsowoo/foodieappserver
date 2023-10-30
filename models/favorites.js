const mongoose = require("mongoose");
//const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: "",
    },
    is_closed: {
      type: Boolean,
      default: "",
    },
    image_url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Favorite", favoritesSchema);
