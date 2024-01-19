const baseClasses = 'w-full\
 font-semibold\
 text-center\
 border border-indigo-500\
 rounded-lg\
 transition all\
 hover:cursor-pointer';

const variants: {[key: string]: string} = {
    primary: 'bg-indigo-500\
 text-white\
 drop-shadow-[0_0.5rem_1.125rem_rgba(99,102,241,0.5)]\
 hover:bg-indigo-600\
 hover:filter-none',
    secondary: 'bg-white\
 text-indigo-500\
 hover:bg-indigo-500\
 hover:text-white'
}
  
const sizes: {[key: string]: string} = {
  sm: '',
  lg: 'text-base px-5 py-3',
}

export default function Button({
  children,
  variant,
  size
}: {
  children: React.ReactNode,
  variant: string,
  size: string
}) {
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}> {children} </button>
  )
}