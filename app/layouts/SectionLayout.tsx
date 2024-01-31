export default function SectionLayout({children, bg, paddings}: {
    children: React.ReactNode,
    bg: string,
    paddings: string
  }) {
    return (
      <section className={`${bg} ${paddings}`}>
        <div className="container">
          {children}
        </div>
      </section>
    )
  }
  