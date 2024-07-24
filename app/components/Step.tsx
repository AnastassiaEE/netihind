import { Children } from "react"

export default function Step({
    index = 1,
    lines, 
    padding,
    children
}: {
    index?: number,
    lines?: string,
    padding?: string,
    children: React.ReactNode
}) {  
    const title = Children.toArray(children)[0] 
    const desc = Children.toArray(children)[1] 
    return (
        <div className={`flex flex-row md:flex-col basis-0 grow relative ${padding} ${lines}`}>
            <div className="bg-neutral-light rounded-full flex justify-center items-center shrink-0 relative z-10 w-20 h-20 md:mx-auto md:mb-6">
                <span className="bg-white text-2xl font-extrabold rounded-full flex justify-center items-center shadow-md w-14 h-14"> {index} </span>
            </div>
            <div className="max-md:pl-6 md:text-center">
                <div className="text-2xl font-extrabold mb-4">{title}</div>
                <p className="text-muted-dark text-base">{desc}</p>
            </div>
    </div>
    )
}