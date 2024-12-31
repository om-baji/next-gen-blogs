import { Hono } from "hono";
import { NotesController } from "../controller/notesController";

const notesRouter = new Hono();

notesRouter
    .get("/", NotesController.getNotes)
    .post("/", NotesController.postNotes)
    .put("/",NotesController.putNotes)
    .delete("/",NotesController.deleteNote)
    .get("/bulk",NotesController.bulkNotes)


export {
    notesRouter
}