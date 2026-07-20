import { User } from "../model/user.model.js";

// register new user

const registerUSer = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: `User is Already Exists`,
      });
    }

  } catch (error) {
    
  }
};

export { registerUSer, loginUSer, logoutUSer };
