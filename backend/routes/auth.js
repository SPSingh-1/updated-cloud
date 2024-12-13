const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //for creating the #,salt,paper
const jwt = require("jsonwebtoken"); //ist is used for create the token and give to the user
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "Shashiisgoodb$oy";

//ROUTE 1 : Create a User using POST "/api/auth/createuser".Doesn't require Auth. No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //error occure when
        return res
          .status(400)
          .json({ success, error: "Sorry with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10); //for generating the salt in password
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new users and have there three attribute
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //creat the token
      //responce the user
      success = true;
      res.json({success, authToken });
      //catch errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Errors");
    }
  }
);

//ROUTE 2 : Authenticate a User using POST "/api/auth/login". No login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blanck").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //creat the token
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Errors");
    }
  }
);

//ROUTE 3 : Get loggedin User Details using POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors");
  }
});

//for export the module
module.exports = router;
