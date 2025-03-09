const jwt = require("jsonwebtoken");
const fs = require("fs");

const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, "utf8");

const verifyUsersJWTPassword = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.json({ errorMessage: "User is not logged in" });
    }

    jwt.verify(token, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decoded) => {
        if (err) {
            return res.json({ errorMessage: "User is not logged in" });
        }

        req.decodedToken = decoded;
        next();
    });
};

module.exports = verifyUsersJWTPassword;
