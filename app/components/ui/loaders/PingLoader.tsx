export default function PingLoader({ sizeClass = 'h-20 w-20' }: { sizeClass?: string }) {
    return (
        <div className="flex h-full items-center justify-center">
            <div className={`rounded-full ${sizeClass} animate-ping bg-primary`}></div>
        </div>
    );
}
