import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMail.js";
// register new user

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUSer = async (req, res) => {
 
  try {
    const { name , email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: `User ${email} is Already Exists`,
      });
    }
    // TODOS : Hashed the password
    // implement JWT token gen and authentications
    // OTP sending for verification email
    //  send user welcome mail

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await  User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const message = ` Welcome to  E-COMM , ${name}. \n
       Your OTP for e-comm registration is : ${otp} `;

      await sendMail(
        email,
        "Welcome to E-COMM , Your OTP for registeration",
        message
      );

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
    
  }
};

const loginUSer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({
        message: `Invalid email or Password`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error in user login , please try again later",
    });

    console.log("server" , error.message);
    
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "error while getting the user ",
    });
  }
};

export { registerUSer, loginUSer, getUsers };
