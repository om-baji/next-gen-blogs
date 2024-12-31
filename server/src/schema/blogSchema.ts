import { z } from "zod";

export const blogSchemaMD = z.object({
    title : z.string().nonempty(),
    body : z.record(z.any()),
    userId : z.string().nonempty()
})

export const blogSchema = z.object({
    title : z.string().nonempty(),
    body : z.string().nonempty(),
    userId : z.string().nonempty()
})

export type blogSchemaTypeMD = z.infer<typeof blogSchemaMD>
export type blogSchemaType = z.infer<typeof blogSchema>