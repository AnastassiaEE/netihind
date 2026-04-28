export default function PageLoader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="relative inline-flex">
                <div className="size-9 rounded-full bg-primary"></div>
                <div className="absolute size-9 animate-ping rounded-full bg-primary"></div>
                <div className="absolute size-9 animate-pulse rounded-full bg-primary"></div>
            </div>
        </div>
    );
}
