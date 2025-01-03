import { z } from "zod";

export const blogSchema = z.object({
    title : z.string().nonempty(),
    body : z.string().nonempty(),
    userId : z.string().nonempty(),
    email : z.string().email(),
    image : z.string().optional()
})

export type blogSchemaType = z.infer<typeof blogSchema>