const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //for creating the #,salt,paper
const jwt = require("jsonwebtoken"); //it is used for create the token and give to the user
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "Shashiisgoodb$oy";

//ROUTE 1 : Create a User using POST "/api/auth/createuser".Doesn't require Auth. No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("name", "Enter a valid Father Name").isLength({ min: 3 }),
    body("name", "Enter a valid Mother Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phoneno", "Enter a valid Phoneno").isLength({min: 10 }),
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
        fathername: req.body.fathername,
        mothername: req.body.mothername,
        email: req.body.email,
        phoneno: req.body.phoneno,
        dob: req.body.dob,
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
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Errors");
  }
});

//ROUTE 4 : Update loggedin User Details using PUT "/api/auth/updateuser". Login required
router.put(
  "/updateuser/:id",
  fetchuser,
  async (req, res) => {
    const { name, phoneno, mothername, fathername, dob } = req.body;

    try {
      console.log("Request received:", req.body);

      // Validate MongoDB ObjectId
      const mongoose = require("mongoose");
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid ID format");
      }

      // Create updated fields object
      const newUser = {};
      if (name) newUser.name = name;
      if (phoneno) newUser.phoneno = phoneno;
      if (fathername) newUser.fathername = fathername;
      if (mothername) newUser.mothername = mothername;
      if (dob) newUser.dob = dob;

      // Fetch the user
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      console.log("User found:", user);

      // Check ownership
      if (user.id.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Update user
      user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
      res.json({ user });
    } catch (error) {
      console.error("Error in /updateuser:", error.stack);
      res.status(500).send("Internal Server Error");
    }
  }
);



//for export the module
module.exports = router;
