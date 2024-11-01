export default function PingLoader({ sizeClass = 'h-20 w-20' }: { sizeClass?: string }) {
    return (
        <div className="flex justify-center items-center h-full">
            <div className={`rounded-full ${sizeClass} bg-primary animate-ping`}></div>
        </div>
    );
}
