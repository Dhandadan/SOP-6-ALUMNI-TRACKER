const router = require("express").Router();

const authenticate = require("../middleware/auth.middleware");
const profileController = require("../controllers/profile.controller");

router.get("/me", authenticate, profileController.getMyProfile);
router.put("/me", authenticate, profileController.updateMyProfile);

module.exports = router;
