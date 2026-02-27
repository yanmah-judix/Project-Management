import { Router } from "express";
import auth from "../../common/middleware/auth.middleware";
import * as controller from "./projects.controller";

const router = Router();

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:projectId", auth, controller.getOne);

export default router;