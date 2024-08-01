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
  type = 'button',
  variant = 'primary',
  size = 'sm',
  disabled = false,
  children
}: {
  type?: 'button' | 'submit' | 'reset',
  variant?: 'primary' | 'secondary',
  size?: 'sm' | 'lg',
  disabled?: boolean
  children: React.ReactNode,
}) {
  return (
    <button type={type} className={`${baseClasses} ${variants[variant]} ${sizes[size]} flex justify-center ${disabled ? 'hover:cursor-not-allowed': undefined}`} disabled={disabled}> {children} </button>
  )
}