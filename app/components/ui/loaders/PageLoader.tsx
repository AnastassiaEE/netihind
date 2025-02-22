export default function PageLoader() {
    return (
        <div className="absolute inset-0 bg-white flex justify-center items-center">
            <div className="relative inline-flex">
                <div className="w-9 h-9 bg-primary rounded-full"></div>
                <div className="w-9 h-9 bg-primary rounded-full absolute inset-0 animate-ping"></div>
                <div className="w-9 h-9 bg-primary rounded-full absolute inset-0 animate-pulse"></div>
            </div>
        </div>
    );
}
