import classNames from 'classnames';

export default function SectionLayout({
  bg, 
  className,
  children, 
}: {
    bg?: string,
    className?: string
    children: React.ReactNode,
  }) {
    
    const sectionClasses = classNames({
      [bg as string]: bg !== undefined,
      [className as string]: className !== undefined,
    });

    return (
      <section className={sectionClasses}>
        <div className="container">
          {children}
        </div>
      </section>
    )
  }
  