import User from "../models/User.js";

export default {
  registerNewUser: async (req, res) => {
    try {
      const { image, email, password } = req.body;

      const users = await User.getUserByEmail(email);
      if (users) {
        throw {
          error: "Email already exist",
        };
      }
      if (typeof image !== "string" || !image.match(/\.(jpg|jpeg|gif|png)$/)) {
        throw {
          error: "Please provide an image Url",
        };
      }

      const user = new User({
        image,
        email,
        password,
      });
      const token = await user.getAuthToken();
      return res.status(200).json({ success: true, user, token });
    } catch (error) {
      return res.status(400).json({ success: false, error: error });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.getLoginDetails(email, password);
      if (!user) {
        return res
          .status(401)
          .json({ error: "Login failed! Check Login details" });
      }
      const token = await user.getAuthToken();
      return res.status(200).json({ success: true, user, token });
    } catch (error) {
      return res.status(400).json({ success: false, error: error });
    }
  },

  getUserDetails: async (req, res) => {
    await res.json(req.userData);
  },

  updateUserDetails: async function (req, res) {
    try {
      const { name, email, image, password, bio, phone } = req.body;
      const payload = {
        name,
        email,
        image,
        password,
        bio,
        phone,
      };
      const filter = req.userData
      const updateUser = await User.updateUserInfo(filter, payload);
      return res.status(200).json({ success: true, updateUser });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
