import { z } from "zod";

export const commentSchema = z.object({
    content : z.string().nonempty(),
    userId : z.string().nonempty(),
    parentId : z.string().optional()
})

export type commentSchemaTypes = z.infer<typeof commentSchema>