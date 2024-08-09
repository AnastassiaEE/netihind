import useDropdownBox from "../../../hooks/useDropdownBox";
import DropdownBoxItem from "./DropdownBoxItem";

export default function DropdownBox({
    searchbar,
    data,
    size = 'sm',
    handleItemClick
}: {
    searchbar: HTMLElement | null,
    data: string[],
    size?: 'sm' | 'lg',
    handleItemClick: React.MouseEventHandler
}) {
    const {heightAndPos} = useDropdownBox(searchbar);

    return (
        <div className="bg-white border border-primary/30 rounded-md w-full absolute z-10 overflow-hidden" style={heightAndPos.pos === 'up' ? {bottom: '100%'} : undefined}>
            <ul className="overflow-auto" style={{maxHeight: `${heightAndPos.height}px`}}>
               {data.map(d => 
                    <DropdownBoxItem 
                        key={d}
                        data={d}
                        handleClick={handleItemClick}
                        size={size}/>)
                    }
            </ul>  
        </div>
    )
}