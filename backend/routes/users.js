const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
const {auth, create, view, remove} = require("../protected/auth");

router.post("/login", login);
router.post("/signup", signup);

// is this the right approach? should we authenticate all the requests made for protected routes/resources
router.delete("/remove/:noteId", auth, remove);
router.post("/create", auth, create);
router.get("/view", auth, view);
//router.post("/logout", auth, logout);

module.exports = router;