const router = require("express").Router();
const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const multer = require("multer");
const verifyUsersJWTPassword = require("../middleware/jwtMiddleware");

const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, "utf8");
const upload = multer({ dest: process.env.UPLOADED_FILES_FOLDER });

// Middleware to check if user exists
const checkThatUserExistsInUsersCollection = (req, res, next) => {
  usersModel.findOne({ email: req.params.email }, (error, data) => {
    if (!data) {
      return res.json({ errorMessage: "User not found" });
    }
    req.data = data;
    next();
  });
};

// Middleware to check if password matches
const checkThatJWTPasswordIsValid = (req, res, next) => {
  bcrypt.compare(req.params.password, req.data.password, (err, result) => {
    if (!result) {
      return res.json({ errorMessage: "Invalid password" });
    }
    next();
  });
};

// Registration route where password is hashed
router.post("/users/register", upload.single("profilePhoto"), async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await usersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errorMessage: "User already exists" });
    }

    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Save the new user with hashed password
    const newUser = new usersModel({
      name,
      email,
      password: hashedPassword,
      profilePhotoFilename: req.file ? req.file.filename : null, // Handle profile photo upload
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { email: savedUser.email, accessLevel: savedUser.accessLevel },
      JWT_PRIVATE_KEY,
      { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY }
    );

    // Send response with token and user details
    res.status(201).json({
      name: savedUser.name,
      email: savedUser.email,
      profilePhoto: req.file ? req.file.filename : null,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Error registering user" });
  }
});

// Login route - checks if user exists, then validates password
router.post("/users/login/:email/:password", checkThatUserExistsInUsersCollection, checkThatJWTPasswordIsValid, returnUsersDetailsAsJSON);

// Protected route - requires valid JWT token for access
router.get("/users/protected", verifyUsersJWTPassword, (req, res) => {
  res.json({ message: "Access granted", user: req.decodedToken });
});

// Return user details with token
const returnUsersDetailsAsJSON = (req, res) => {
  const token = jwt.sign(
    { email: req.data.email, accessLevel: req.data.accessLevel },
    JWT_PRIVATE_KEY,
    { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY }
  );

  fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.data.profilePhotoFilename}`, "base64", (err, fileData) => {
    res.json({
      name: req.data.name,
      accessLevel: req.data.accessLevel,
      profilePhoto: fileData || null,
      token,
    });
  });
};

module.exports = router;

