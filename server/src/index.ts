import { Hono } from "hono";
import { notesRouter } from "./router/notesRoutes";
import { webhookRouter } from "./router/webhookRoute";
import { cors } from "hono/cors";
import { blogRouter } from "./router/blogRouter";
import openApiSpec from "./openapi.spec.json";
import commentRouter from "./router/commentRouter";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    WEBHOOK_SECRET: string;
  };
}>();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://next-gen-blogs.vercel.app"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
  })
);

app.get("/", (c) => {
  return c.json(
    {
      message: "Health Ok!",
    },
    200
  );
});

app.get("/docs", async (c) => {
  return c.json(openApiSpec);
});

app.route("/api/v1/notes", notesRouter);
app.route("/api/v1/webhook", webhookRouter);
app.route("/api/v1/blogs", blogRouter);
app.route("/api/v1/comment", commentRouter);

export default app;
