'use client'

const baseClasses = 'w-full\
 font-semibold\
 text-center\
 border border-primary\
 rounded-lg\
 transition all\
 hover:cursor-pointer';

const variants: {[key: string]: string} = {
    primary: 'bg-primary\
 text-white\
 shadow-lg\
 shadow-primary/50\
 hover:bg-primary-dark\
 hover:shadow-none',
    secondary: 'bg-white\
 text-primary\
 hover:bg-primary\
 hover:text-white'
}
  
const sizes: {[key: string]: string} = {
  sm: 'text-sm px-5 py-2',
  lg: 'text-base h-12 px-5 py-3',
}

export default function Button({
  children,
  variant,
  size,
  disabled = false
}: {
  children: React.ReactNode,
  variant: string,
  size: string,
  disabled?: boolean
}) {
  return (
    <button type="submit" className={`${baseClasses} ${variants[variant]} ${sizes[size]} flex justify-center ${disabled ? 'hover:cursor-not-allowed': undefined}`} disabled={disabled}> {children} </button>
  )
}