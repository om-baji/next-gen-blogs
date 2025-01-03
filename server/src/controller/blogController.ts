import { Context } from "hono";
import { blogSchema } from "../schema/blogSchema";
import { getPrismaClient } from "../utils/db";

export class BlogController {
  static async getBlogs(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);

      const blogs = await prisma.blogs.findMany();

      return c.json({
        message: "Success",
        blogs,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: String(error),
        },
        500
      );
    }
  }

  static async postBlogs(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);

      const body = await c.req.json();
      const payload = blogSchema.safeParse(body);

      if (!payload.success) {
        return c.json(
          {
            message: "Invalid inputs",
            error: payload.error.message,
          },
          400
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          email: payload.data.email,
        },
      });

      if (!user) {
        return c.json(
          {
            message: "Invalid email or user does not exists!",
            success: false,
          },
          404
        );
      }

      const blog = await prisma.blogs.create({
        data: {
          title: payload.data.title,
          userId: payload.data.userId,
          body: payload.data.body,
          email: payload.data.email,
          image : payload.data.image ?? null
        },
      });

      return c.json({
        message: "Blog added",
        id: blog.id,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: String(error),
        },
        500
      );
    }
  }

  static async getBlogsByEmail(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);
      const email = c.req.param("email")

      if (!email) {
        return c.json({
          message: "Provide a valid email id",
          success: false,
        });
      }

      const blogs = await prisma.blogs.findMany({
        where: {
          email,
        },
      });

      return c.json({
        message: "Success",
        blogs,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: String(error),
        },
        500
      );
    }
  }

  static async putBlog(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);

      const id = c.req.query("id");
      const body = await c.req.json();
      const blog = await prisma.blogs.findUnique({
        where: {
          id,
        },
      });

      if (!blog) {
        return c.json({ message: "Note does not exist!" }, 404);
      }

      const updateData: Partial<typeof blog> = {};

      if (body.title != undefined) updateData.title = body.title;
      if (body.body != undefined) updateData.body = body.body;

      const update = await prisma.blogs.update({
        where: {
          id: blog.id,
        },
        data: updateData,
      });

      return c.json({
        message: "Updated!",
        id: update.id,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: String(error),
        },
        500
      );
    }
  }

  static async deleteBlog(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);

      const id = c.req.query("id");
      const blog = await prisma.blogs.findUnique({
        where: {
          id,
        },
      });

      if (!blog) {
        return c.json(
          {
            message: "Blog does not exist",
            success: false,
          },
          400
        );
      }

      await prisma.blogs.delete({
        where: {
          id: blog.id,
        },
      });

      return c.json({
        message: "Success",
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: String(error),
        },
        500
      );
    }
  }
}
