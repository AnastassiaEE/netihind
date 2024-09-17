import classNames from "classnames"

const labelSizes: {[key: string]: string} = {
    sm: 'text-sm mb-1.5',
    lg: 'text-base mb-2.5'
}

export default function FieldLabel({
    htmlFor,
    size = 'sm',
    children
}: {
    htmlFor: string, 
    size?: 'sm' | 'lg',
    children: React.ReactNode
}) {
    const labelClasses = classNames(labelSizes[size], 'font-semibold block')

    return (
        <label htmlFor={htmlFor} className={labelClasses}> {children} </label>
    )
}