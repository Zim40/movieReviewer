import User from "../models/user.js";
import Auth from "../utils/Auth.js";

const userController = {
  async createUser(req, res) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (!existingUser) {
        const user = await User.create(req.body);
        const token = Auth.signToken(user);
        return res
          .status(200)
          .json({ message: "New user created!", data: { token, user } });
      } else {
        return res.status(409).json({ message: "Email already registered!" });
      }
    } catch (err) {
      console.error("Error creating user", err);
      return res.status(500).json({ message: "Server Error!" });
    }
  },
};

export default userController;
