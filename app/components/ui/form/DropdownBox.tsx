import useDropdownBox from "../../../hooks/useDropdownBox";

const listItemClasses = 'text-muted-dark cursor-pointer hover:bg-primary/30';
const listAnchorClasses = 'block';

const sizes: {[key: string]: string} = {
    sm: '',
    lg: 'text-base px-4 py-3'
}

export default function DropdownBox({
    searchbar,
    data,
    size = 'sm'
}: {
    searchbar: HTMLElement | null
    data: {[key:string]: any}[]
    size?: string
}) {
    const {heightAndPos} = useDropdownBox(searchbar);

    return (
        <div className="bg-white border border-primary/30 rounded-md w-full absolute z-10 overflow-hidden" style={heightAndPos.pos === 'up' ? {bottom: '100%'} : undefined}>
            <ul className="overflow-auto" style={{maxHeight: `${heightAndPos.height}px`}}>
               {data.map(d => 
                    <li key={d.key} className={listItemClasses}>
                        <a data-search-item={d.key} onClick={d.fn} className={`${listAnchorClasses} ${sizes[size]}`}> {d.data} </a>
                    </li>)
                }
            </ul>  
        </div>
    )
}