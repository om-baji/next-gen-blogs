import { z } from "zod";

export const noteSchema = z.object({
    title : z.string().nonempty(),
    content : z.string().nonempty(),
    email : z.string().email().nonempty(),
    userId : z.string().nonempty()
})

export type noteSchemaTypes = z.infer<typeof noteSchema>