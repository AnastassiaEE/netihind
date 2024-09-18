import Footer from '@/components/ui/footer/Footer'
import Header from '@/components/ui/header/Header'
import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <Header />
            <div>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
            <Footer />
        </>
    )
}

