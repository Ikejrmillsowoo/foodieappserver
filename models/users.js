const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//const passportLocalMongoose = require("passport-local-mongoose");

const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
      unique: true,
    },
    password: {
      type: String,
      default: "",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
