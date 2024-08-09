const sizes: {[key: string]: string} = {
    sm: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
}
export default function DropdownBoxItem({
    data,
    handleClick,
    size = 'sm'
}: {
    data: string,
    handleClick: React.MouseEventHandler,
    size?: 'sm' | 'lg'
}) {
    return (
        <li key={data} className="text-muted-dark cursor-pointer hover:bg-primary/30'">
            <a 
                data-search-item={data} 
                onClick={handleClick} 
                className={`block ${sizes[size]}`}> 
                {data} 
            </a>
        </li>
    )
}