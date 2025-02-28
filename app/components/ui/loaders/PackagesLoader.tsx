export default function PackagesLoader() {
    const skeleton = (
        <div className="w-full animate-pulse rounded-md bg-gray-100 relative mb-5">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-3/5 py-5 px-8 border max-lg:border-b-muted-light lg:border-r-muted-light">
                    <div className="mb-5 space-y-1">
                        {[["w-16 h-10", "mb-1"], ["w-8 h-2", "mb-1"], ["w-44 h-2", ""]].map(([size, margin], i) => (
                            <div key={i} className={`${size} bg-gray-300 rounded-md ${margin}`}></div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {["w-24 h-6", "w-24 h-6", "w-14 h-6"].map((size, i) => (
                            <div key={i} className={`${size} bg-gray-300 rounded-md`}></div>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-2/5 flex justify-center items-center px-1 py-5">
                    <div className="w-24 h-10 bg-gray-300 rounded-md"></div>
                </div>
            </div>
            <div className="w-full h-10 bg-gray-200 rounded-bl-md rounded-br-md"></div>
        </div>
    )
    return (
        <>
            {skeleton}
            {skeleton}
            {skeleton}
        </>
    )
}
