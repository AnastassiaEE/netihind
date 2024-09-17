import classNames from "classnames"

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

    const linkClasses = classNames('block', sizes[size])
    
    return (
        <li key={data} className="block text-muted-dark cursor-pointer hover:bg-primary/30">
            <a 
                data-search-item={data} 
                onClick={handleClick} 
                className={linkClasses}> 
                {data} 
            </a>
        </li>
    )
}