/* eslint-disable no-shadow */
const { Schema, model } = require("mongoose");
const { hash, genSalt } = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  validateName,
} = require("../utils/validationUtils");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: "Requires FirstName",
      trim: true,
      validate: { validator: validateName },
    },
    lastname: {
      type: String,
      required: "Requires LastName",
      trim: true,
      validate: { validator: validateName, message: "LastName Invalid" },
    },
    email: {
      type: String,
      required: "Requires Email",
      unique: true,
      lowercase: true,
      trim: true,
      validate: { validator: validateEmail, message: "Email Invalid" },
    },
    password: {
      type: String,
      required: "Requires Password",
    },
    scripts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Script",
      },
    ],
  },
  { timestamps: true }
);

// // hash the password before saving
// userSchema.pre("save", function (next) {
//   const user = this;

//   // only hash the password if the password is modified(New)
//   if (!user.isModified("password")) return next();
//   // validate password
//   if (!validatePassword(user.password))
//     return next(new Error("Password Invalid"));

//   // generate salt and hash the password
//   genSalt(10, (err, salt) => {
//     if (err) return next(err);
//     hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

module.exports = model("user", userSchema);
