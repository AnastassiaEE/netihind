export default function Steps({stepsText}: {stepsText: {[key: string]: string}[]}) {

    
    const rightLineStyle = `md:after:bg-indigo-100\
                            md:after:absolute\
                            md:after:left-2/4\
                            md:after:top-10\
                            md:after:w-2/4\
                            md:after:h-px`;
   
    const leftLineStyle = `md:before:bg-indigo-100\
                           md:before:absolute\ 
                           md:before:left-0\
                           md:before:top-10\
                           md:before:w-2/4\
                           md:before:h-px`;

    const bottomLineStyle = `after:bg-indigo-100\
                             after:absolute\
                             after:left-10\
                             after:top-2/4\
                             after:w-px\
                             after:h-2/4`;

    const topLineStyle = `before:bg-indigo-100\
                          before:absolute\
                          before:left-10\
                          before:top-0\
                          before:w-px\
                          before:h-2/4`;

    function drawLine(index)  {
        if (index === 0) {
            return bottomLineStyle + " " + rightLineStyle;
        } else if (index === stepsText.length - 1) {
            return topLineStyle + " " + leftLineStyle;
        } else {
            return bottomLineStyle + " " + topLineStyle + " " + rightLineStyle + " " + leftLineStyle;
        }
    }
   
    return (
        <div className="flex flex-col md:flex-row">
            {stepsText.map((text, i) => 
                <div className={"flex flex-row md:flex-col basis-0 grow relative max-md:py-6 md:px-6 " + drawLine(i)}>
                    <div className="bg-indigo-50 rounded-full flex justify-center items-center shrink-0 relative z-10 w-20 h-20 md:mx-auto md:mb-6">
                        <span className="bg-white text-2xl font-extrabold rounded-full flex justify-center items-center shadow-md w-14 h-14"> {i + 1} </span>
                    </div>
                    <div className="max-md:pl-6 md:text-center">
                        <div className="text-2xl font-extrabold mb-4">{text.title}</div>
                        <p className="text-slate-600 text-base">{text.description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}