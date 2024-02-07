const listItemClasses = 'text-slate-600 cursor-pointer hover:bg-indigo-500/30';
const listAnchorClasses = 'block';

const sizes: {[key: string]: string} = {
    sm: '',
    lg: 'text-base px-4 py-3'
}

export default function DropdownBox ({
    height,
    data,
    size = 'sm'
}: {
    height: string,
    data: {[key:string]: any}[],
    size?: string
}) {
    return (
        <div className="bg-white border border-indigo-500/30 rounded-md w-full absolute z-10 overflow-hidden top-full">
            <ul className="overflow-auto" style={{maxHeight: `${height}`}}>
               {data.map(d => 
                    <li key={d.key} className={listItemClasses}>
                        <a data-search-item={d.key} onClick={d.fn} className={`${listAnchorClasses} ${sizes[size]}`}> {d.data} </a>
                    </li>)
                }
            </ul>  
        </div>
    )
}