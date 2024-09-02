import SectionLayout from "../../layouts/SectionLayout"

export default function BlogPostHeader({
    title, 
    date
}: {
    title: string,
    date: string
}) {
    return (
        <SectionLayout bg={""} paddings={"pt-24 pb-4"}>
            <h1 className="text-4xl font-extrabold mb-8">{title}</h1>
            <time className="block text-muted text-sm mb-4" dateTime={date}>{date}</time>
        </SectionLayout>
    )
}