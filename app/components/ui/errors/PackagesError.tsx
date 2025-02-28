export default function PackagesError({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-md border border-red-300 bg-red-100 p-6">
            <p className="font-semibold text-red-700">{children}</p>
        </div>
    );
}
