import Arrow from "./Arrow";

const baseArrowStyle = 
`font-semibold\
 rounded-full\
 flex\
 justify-center\
 shrink-0\
 items-center\
 w-9\
 h-9\
 transition-colors\
 cursor-pointer`;

export default function CircleArrow({
    direction, 
    style
}: {
    direction: string,
    style?: string
}) {
    return (
        <div className={`${baseArrowStyle} ${style}`}>
            <Arrow direction={direction}/>
        </div>
    )
}