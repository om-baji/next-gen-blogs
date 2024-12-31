import { Hono } from "hono";
import { UserWebhook } from "../controller/webHook";

const webhookRouter = new Hono();

webhookRouter
    .post("/",UserWebhook.userWebhook)


export {
    webhookRouter
}