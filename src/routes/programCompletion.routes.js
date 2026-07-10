const router = require("express").Router();

const authenticate = require("../middleware/auth.middleware");
const programCompletionController = require("../controllers/programCompletion.controller");

router.get(
  "/",
  authenticate,
  programCompletionController.getMyProgramCompletions,
);

router.post(
  "/",
  authenticate,
  programCompletionController.createProgramCompletion,
);

router.delete(
  "/:id",
  authenticate,
  programCompletionController.deleteProgramCompletion,
);

module.exports = router;
