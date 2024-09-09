export default function Language({
    lang,
    current,
    handleClick
}: {
    lang: string,
    current: boolean
    handleClick: React.MouseEventHandler<HTMLSpanElement>
}) {
    return (
        <span 
            data-lang={lang} 
            onClick={handleClick} 
            className={`text-base font-semibold text-muted-dark uppercase hover:text-primary transition-colors cursor-pointer border-b-2 ${current ? 'border-primary' : 'border-transparent'}`}>
            {lang}
        </span>
    )
}