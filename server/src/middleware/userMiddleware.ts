import { verifyToken } from "@clerk/clerk-sdk-node";
import { Hono } from "hono";

const userMiddleware = new Hono<{
  Bindings: {
    CLERK_SECRET: string;
  };
}>();

userMiddleware.use("*", async (c, next) => {
  try {
    const authorizationHeader = c.req.header("Authorization");
    if (!authorizationHeader) {
      return c.json({ message: "Authorization header missing" }, 401);
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return c.json(
        { message: "Token missing from Authorization header" },
        401
      );
    }

    const payload = await verifyToken(token, { secretKey: c.env.CLERK_SECRET });

    if (!payload) {
      return c.json({ message: "Unauthorized!" }, 401);
    }

    await next();
  } catch (error) {
    console.error(error);

    return c.json(
      {
        message: "Unauthorized",
        error: String(error),
      },
      401
    );
  }
});

export {
    userMiddleware
}