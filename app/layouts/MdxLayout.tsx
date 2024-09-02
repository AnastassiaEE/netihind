const styles = `prose\
 prose-h2:text-2xl\
 prose-h2:font-extrabold\
 prose-h2:text-black\
 prose-h2:mb-4\
 prose-h2:mt-0\
 prose-p:text-base\
 prose-p:not(:last-child):mb-6\
 prose-p:mt-0\
 prose-p:text-muted-dark\
 prose-ul:mb-6\
 prose-ul:mt-0\
 prose-li:mb-1
 prose-li:marker:text-muted-dark
 `

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className={styles}>
      {children}
    </div>
  )
}