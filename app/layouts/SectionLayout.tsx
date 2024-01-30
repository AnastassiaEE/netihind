export default function SectionLayout({children, bg}: {
    children: React.ReactNode,
    bg: string
  }) {
    return (
      <section className={`${bg} py-28`}>{children}</section>
    )
  }
  