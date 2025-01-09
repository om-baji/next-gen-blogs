import { Context } from "hono";
import { getPrismaClient } from "../utils/db";
import { commentSchema } from "../schema/commentSchema";

export class commentsController {
  static async addComment(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL);

      const id = c.req.query("id");

      const blogExists = await prisma.blogs.findUnique({
        where: {
          id,
        },
      });

      if(!blogExists) {
        return c.json({
            message : "Blog does not exist!",
            success : false
        }, 404)
      }

      const payload = await c.req.json();

      const validation = commentSchema.safeParse(payload)

      if(!validation.success) {
        return c.json({
            message : "Validation error",
            error : validation.error.message,
            success : false
        },411)
      }

      await prisma.blogs.update({
        where : {
            id,
        },
        data : {
            comments : {
                create: {
                    content : validation.data.content,
                    userId : validation.data.userId,
                    parentId : validation.data.parentId
                }
            }
        }
      })

      return c.json({
        message : "Comment added!",
        success : true
      },200)

    } catch (error) {
        console.error(error)
        c.json({
            message : error instanceof Error ? error.message : "Unknown error occured!",
            success : false
        })
    }
  }
}


