export default function PackageCardRow({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-wrap justify-around [&:not(:last-child)]:mb-6">{children}</div>;
}
