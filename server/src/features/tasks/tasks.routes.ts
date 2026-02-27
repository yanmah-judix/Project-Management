import { Router } from "express";
import auth from "../../common/middleware/auth.middleware";
import * as controller from "./tasks.controller";

const router = Router();

router.post("/taskCreate/:projectId", auth, controller.create);
router.delete("/taskDel/:taskId", auth, controller.remove);
router.patch("/:taskId/done", auth, controller.done);

export default router;