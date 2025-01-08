import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

type CardProps = {
    id: string,
    title: string,
    content: string,
    createdAt : string
}

const NotesCard = ({ id, title, content,createdAt }: CardProps) => {
    return (
        <Card key={id} className='mt-4'>
            <CardHeader>
                {title}
            </CardHeader>
            <CardContent>
                {content.length > 500 ? (content.slice(0, 500) + "...")
                    : (content)}
            </CardContent>
            <CardFooter>
                <p className='text-white'>{createdAt}</p>
            </CardFooter>
        </Card>
    )
}

export default NotesCard
