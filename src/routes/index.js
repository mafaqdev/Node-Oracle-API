const { Router } = require("express");

const {login} = require("./auth");
const menu = require("./menu");

const router = Router();

router.use("/login", login);
router.use("/menu", menu);

module.exports = router;