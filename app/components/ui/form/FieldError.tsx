export default function FieldError({
    size = 'sm', 
    children
}: {
    size: 'sm' | 'lg',
    children: React.ReactNode
}) {
    return (
        <div className={`${size == "sm" ? "text-xs" : "text-sm"} text-error font-medium absolute`}>{children}</div>
    )
}