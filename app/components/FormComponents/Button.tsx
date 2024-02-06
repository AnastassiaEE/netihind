import { memo } from "react";

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
 shadow-lg\
 shadow-indigo-500/50\
 hover:bg-indigo-600\
 hover:shadow-none',
    secondary: 'bg-white\
 text-indigo-500\
 hover:bg-indigo-500\
 hover:text-white'
}
  
const sizes: {[key: string]: string} = {
  sm: 'text-sm px-5 py-2',
  lg: 'text-base px-5 py-3',
}

export default memo(function Button({
  children,
  variant,
  size
}: {
  children: React.ReactNode,
  variant: string,
  size: string
}) {
  return (
    <button type="submit" className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}> {children} </button>
  )
})