export default function PageLoader() {
    return (
        <div className="fixed inset-0 bg-white flex justify-center items-center">
            <div className="relative inline-flex">
                <div className="w-9 h-9 bg-primary rounded-full"></div>
                <div className="w-9 h-9 bg-primary rounded-full absolute animate-ping"></div>
                <div className="w-9 h-9 bg-primary rounded-full absolute animate-pulse"></div>
            </div>
        </div>
    );
}
