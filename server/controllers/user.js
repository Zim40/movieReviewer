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
  //Function wont work until client side code and login is setup
  async getMe(req, res) {  
    try {
      const user = await User.findById({ _id: req.user._id });
      if (!user) {
        throw new Error("No user by that Id");
      } else {
        return res
          .status(200)
          .json({ data: { user }, message: "User retrieved" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server Error!", error: error.message });
    }
  },

  async login (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email } );
      
      if(!user) {
         throw new Error('No user found with that Username');
      }
      const checkPass = await user.isCorrectPassword(password);
      if(!checkPass) {
        throw new Error('Wrong Password!');
      };
      const token = Auth.signToken(user);

      return res.status(200).json({ data: { token, user }, message: 'Login Successful!' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message, message: "Server Error!" });
    }
  }
};

export default userController;
