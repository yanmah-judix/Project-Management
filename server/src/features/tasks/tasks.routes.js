const express = require("express");
const router = express.Router();
const auth = require("../../common/middleware/auth.middleware");
const controller = require("./tasks.controller");

router.post("/taskCreate/:projectId", auth, controller.create);
router.delete("/taskDel/:taskId", auth, controller.remove);
router.patch("/:taskId/done", auth, controller.done);

module.exports = router;