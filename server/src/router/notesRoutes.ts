import { Hono } from "hono";
import { NotesController } from "../controller/notesController";

const notesRouter = new Hono();

notesRouter
    .post("/",NotesController.getNotes)
    .post("/add", NotesController.postNotes)
    .put("/",NotesController.putNotes)
    .delete("/",NotesController.deleteNote)
    .get("/bulk",NotesController.bulkNotes)


export {
    notesRouter
};
