const {userModel} = require("../models/data");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signup route handler
exports.signup = async (req, res) => {
    try {
      // get user data
      const { username, email, password } = req.body;
  
      // check if user exists
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // secure the password
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
      }
      catch (err) {
        return res.status(500).json({
          success: false,
          message: "Error in hashing password",
        });
      }
  
      // create entry for user in DB
      const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
      });
  
      return res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "User cannot be registered, please try again later",
      });
    }
  };

//login route handler
exports.login = async (req, res) => {
    try {
        // data fetch
        const {email,password} = req.body;

        //check for registered user
        let user = await userModel.findOne({email});
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User is not registered",
          });
        }
        
        //verify password and generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
          const payload = {
            email: user.email,
            id: user._id,
          };
          let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
        
        res.status(200).json({
          success: true,
          token,
          message: "User logged in successfully",
        });
      }
  }
  catch(error) {
      console.log(error);
      return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
}