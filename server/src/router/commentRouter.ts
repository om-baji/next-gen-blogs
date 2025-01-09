import { Hono } from "hono";
import { commentsController } from "../controller/commentsController";

const commentRouter = new Hono()

commentRouter.post("/", commentsController.addComment)

export default commentRouter;