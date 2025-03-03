export default function PackageRequestSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-black text-lg font-bold mb-4">{title}</p>
            {children}
        </div>
    );
}
