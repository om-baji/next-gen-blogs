import { getPrismaClient } from "../utils/db";
import { Context } from "hono";
import { noteSchema } from "../schema/noteSchema";

export class NotesController {

  static async postNotes(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL)

      const body = await c.req.json();
      const payload = noteSchema.safeParse(body);

      if (!payload.success) {
        return c.json(
          {
            message: "Invalid inputs",
            error: payload.error.message,
          },
          400
        );
      }

      const note = await prisma.notes.create({
        data: {
          title: payload.data.title,
          content: payload.data.content,
          email: payload.data.email,
          userId: payload.data.userId,
        },
      });

      return c.json({
        message: "Note added successfully",
        id: note.id,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: error instanceof Error ? error.message : String(error),
        },
        500
      );
    }
  }

  static async getNotes(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL)

      const body = await c.req.json();
      const notes = await prisma.notes.findMany({
        where: {
          email: body.email,
        },
      });

      return c.json({
        message: "Success",
        notes,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: error instanceof Error ? error.message : String(error)
        },
        500
      );
    }
  }

  static async deleteNote(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL)

      const id = c.req.query("id");

      const note = await prisma.notes.findUnique({
        where: {
          id,
        },
      });

      if (!note) {
        return c.json({ message: "Note does not exist!" }, 404);
      }

      await prisma.notes.delete({
        where: {
          id,
        },
      });

      return c.json({
        message: "Delete success",
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: error instanceof Error ? error.message : String(error),
        },
        500
      );
    }
  }

  static async putNotes(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL)

      const id = c.req.query("id");
      const body = await c.req.json();
      const note = await prisma.notes.findUnique({
        where: {
          id,
        },
      });

      if (!note) {
        return c.json({ message: "Note does not exist!" }, 404);
      }

      const updateData: Partial<typeof note> = {};

      if (body.title !== undefined) updateData.title = body.title;
      if (body.content !== undefined) updateData.content = body.content;

      const res = await prisma.notes.update({
        where: {
          id,
        },
        data: updateData,
      });

      return c.json({
        message: "Note updated successfully!",
        id: res.id,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: error instanceof Error ? error.message : String(error),
        },
        500
      );
    }
  }

  static async bulkNotes(c: Context) {
    try {
      const prisma = getPrismaClient(c.env.DATABASE_URL)

      const notes = await prisma.notes.findMany();

      return c.json({
        message: "All notes",
        notes,
      });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          message: "An error occurred",
          error: error instanceof Error ? error.message : String(error),
        },
        500
      );
    }
  }
}
