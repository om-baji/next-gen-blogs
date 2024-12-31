import { Context } from "hono";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/clerk-sdk-node";
import { getPrismaClient } from "../utils/db";

export class UserWebhook {
  static async userWebhook(c: Context) {
    try {
      const webhookSecret = c.env.WEBHOOK_SECRET;

      if (!webhookSecret) {
        return c.json(
          {
            message: "Webhook secret is not configured!",
          },
          500
        );
      }

      const payload = await c.req.text();
      const svix_id = c.req.header('svix-id');
      const svix_timestamp = c.req.header('svix-timestamp') 
      const svix_signature = c.req.header('svix-signature')


      let event : WebhookEvent;
      try {
        const wh = new Webhook(webhookSecret);
        event = wh.verify(payload, {
          "svix-id": svix_id as string,
          "svix-timestamp": svix_timestamp as string,
          "svix-signature": svix_signature as string,
        }) as WebhookEvent;

        if(event.type === "user.created") {
            const prisma = getPrismaClient(c.env.DATABASE_URL)
            const email = event.data.email_addresses[0].email_address
            await prisma.user.create({
                data : {
                    email
                }
            })
        }

        return c.json(
          {
            message: "Webhook processed successfully!",
          },
          200
        );
      } catch (err) {
        console.error("Webhook verification failed:", err);
        return c.json(
          {
            message: "Invalid webhook signature!",
          },
          400
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return c.json(
        {
          message: "An error occurred while processing the webhook!",
        },
        500
      );
    }
  }
}
