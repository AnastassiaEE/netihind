export default function PackagesError({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-red-100 rounded-md border border-red-300 p-6">
            <p className="text-red-700 font-semibold">{children}</p>
        </div>
    );
}
