export default function SectionLayout({
  bg, 
  className,
  children, 
}: {
    bg?: string,
    className?: string
    children: React.ReactNode,
  }) {
    return (
      <section className={`${bg} ${className}`}>
        <div className="container">
          {children}
        </div>
      </section>
    )
  }
  