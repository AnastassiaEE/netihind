'use client'

import SectionLayout from "@/layouts/SectionLayout"

export default function AddressTitleSection({ address }: { address: string }) {
    return (
        <SectionLayout bg="bg-neutral-light" className="py-24">
            <h1 className="text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold">
                {'title'} <span className="text-primary">{address}</span>
            </h1>
        </SectionLayout>

    );
}
