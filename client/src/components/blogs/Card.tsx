import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = {
    id: string;
    image?: string;
    title: string;
    body: string;
    date?: string;
};

const BlogCard = ({ id, image, title, body, date }: CardProps) => {
    console.log(date)
    return (
        <Card key={id} className="shadow-lg w-full">
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover rounded-t-lg"
                />
            )}
            <CardHeader>
                <CardTitle className="text-xl font-bold mt-2">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700">{body.slice(0, 150)}...</p>
            </CardContent>
            {date && (<CardFooter className="text-white">
                <p className="text-sm text-white mt-1">Published : {date}</p>
            </CardFooter>)}

        </Card>
    );
};

export default BlogCard;
