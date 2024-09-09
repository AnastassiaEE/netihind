const baseClasses = 'w-full\
 font-semibold\
 text-center\
 border\
 transition all\
 hover:cursor-pointer\
 flex\
 items-center\
 justify-center';

const variants: {[key: string]: string} = {
    primary: 'bg-primary\
 text-white\
 border-primary\
 shadow-lg\
 shadow-primary/50\
 hover:bg-primary-dark\
 hover:shadow-none',
    secondary: 'bg-white\
 text-primary\
 border-primary\
 hover:bg-primary\
 hover:text-white',
    success: 'bg-success\
 text-white\
 border-success\
 hover:bg-success-dark\
 hover:border-success-dark\
 hover:text-white'
}
  
const sizes: {[key: string]: string} = {
  sm: 'text-sm px-3 py-2',
  lg: 'text-base px-5 py-3',
}

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'sm',
  disabled = false,
  name,
  className = 'rounded-md',
  handleClick,
  children
}: {
  type?: 'button' | 'submit' | 'reset',
  variant?: 'primary' | 'secondary' | 'success',
  size?: 'sm' | 'lg',
  disabled?: boolean,
  name?: string
  className?: string,
  handleClick?: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode,
}) {
  return (
    <button type={type} name={name} onClick={handleClick} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'hover:cursor-not-allowed': undefined} ${className}`} disabled={disabled}> {children} </button>
  )
}