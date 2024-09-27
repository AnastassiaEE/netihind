import { notFound } from 'next/navigation';

export default function Address({ params }: { params: { slug: string } }) {
    notFound();
}
