const baseClasses = 'w-full font-semibold text-center rounded-lg hover:cursor-pointer transition all';

const variants: {[key: string]: string} = {
    primary: 'bg-indigo-500 text-white drop-shadow-[0_0.6rem_1.3rem_rgba(99,102,241,0.5)] hover:bg-indigo-600 hover:filter-none',
    secondary: 'bg-white text-indigo-500 border border-indigo-500 hover:bg-indigo-500 hover:text-white',
  }
  
  const sizes: {[key: string]: string} = {
    sm: '',
    lg: 'text-base px-6 py-4',
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