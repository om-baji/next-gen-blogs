import { Hono } from 'hono';
import { notesRouter } from './router/userRoutes';
import { webhookRouter } from './router/webhookRoute';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string;
  }
}>()

app.use(cors({
  origin : "*",
  credentials : true,
  allowMethods : ['GET','POST','PUT','OPTIONS','DELETE']
}))


app.get('/', (c) => {
  return c.json({
    message : "Health Ok!"
  }, 200)
})

app.route("/api/v1/notes", notesRouter)
app.route("/api/v1/webhook", webhookRouter)


export default app
