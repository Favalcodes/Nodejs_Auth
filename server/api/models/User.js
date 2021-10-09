import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please provide an image url"],
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//generate token
userSchema.methods.getAuthToken = async function () {
  const SECRET_KEY = "qwerty123456poiu0987!^@";

  const user = this;
  const token = jwt.sign(
    { _id: user._id, image: user.image, email: user.email },
    SECRET_KEY
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.getUserByEmail = async function (email) {
  try {
    const user = await this.findOne({ email: email });
    return user;
  } catch (error) {
    throw error;
  }
};

//get email and password
userSchema.statics.getLoginDetails = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user) {
    throw new Error({ error: "Email doesn't exist" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Wrong password" });
  }
  return user;
};

userSchema.statics.updateUserInfo = async function (
  filter,
  name,
  email,
  image,
  password,
  bio,
  phone
) {
  try {
    const updateUser = await this.update(
      { _id: filter._id },
      {
        name: name,
        email: email,
        image: image,
        password: password,
        bio: bio,
        phone: phone,
      }
    );
    return updateUser;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
