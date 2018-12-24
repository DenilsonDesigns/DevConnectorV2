const express = require("express");
const router = express.Router();

// @route: GET api/profile/test
// @desc: tests profile routes
// @access: public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile routes working" });
});

module.exports = router;
