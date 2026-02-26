const express = require("express");
const router = express.Router();
const auth = require("../../common/middleware/auth.middleware");
const controller = require("./projects.controller");

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:projectId", auth, controller.getOne);

module.exports = router;