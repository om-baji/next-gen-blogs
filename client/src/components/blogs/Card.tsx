import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CardProps = {
    id: string,
    image?: string,
    title: string,
    body: string
}

const BlogCard = ({ id, image, title, body }: CardProps) => {
    return (
        <Card key={id}>
            <CardHeader>
                <img src={image} alt={title} />
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {body.slice(0, 500)}
            </CardContent>
        </Card>
    )
}

export default BlogCard
