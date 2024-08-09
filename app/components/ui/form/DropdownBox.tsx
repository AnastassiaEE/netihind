import useDropdownBox from "../../../hooks/useDropdownBox";

const listItemClasses = 'text-muted-dark cursor-pointer hover:bg-primary/30';
const listAnchorClasses = 'block';

const sizes: {[key: string]: string} = {
    sm: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
}

export default function DropdownBox({
    searchbar,
    data,
    size = 'sm',
    handleItemClick
}: {
    searchbar: HTMLElement | null
    data: string[]
    size?: string,
    handleItemClick: React.MouseEventHandler
}) {
    const {heightAndPos} = useDropdownBox(searchbar);

    return (
        <div className="bg-white border border-primary/30 rounded-md w-full absolute z-10 overflow-hidden" style={heightAndPos.pos === 'up' ? {bottom: '100%'} : undefined}>
            <ul className="overflow-auto" style={{maxHeight: `${heightAndPos.height}px`}}>
               {data.map(d => 
                    <li key={d} className={listItemClasses}>
                        <a 
                            data-search-item={d} 
                            onClick={handleItemClick} 
                            className={`${listAnchorClasses} ${sizes[size]}`}> 
                            {d} 
                        </a>
                    </li>)
                }
            </ul>  
        </div>
    )
}