import classNames from 'classnames';

const styles = classNames(
  'prose',
  'prose-h2:text-2xl',
  'prose-h2:font-extrabold',
  'prose-h2:mb-4',
  'prose-h2:mt-0',
  'prose-p:text-base',
  'prose-p:not(:last-child):mb-6',
  'prose-p:mt-0',
  'prose-p:text-muted-dark',
  'prose-ul:not(:last-child):mb-6',
  'prose-ul:list-none',
  'prose-ul:p-0',
  'prose-ol:list-none',
  'prose-ol:p-0',
  'hover:prose-a:text-primary',
  'prose-a:transition-colors',
  'prose-strong:font-bold',
  'max-w-none',
  'prose-table:table-auto',
  'prose-table:border',
  'prose-table:border-muted-light',
  'prose-table:border-collapse',
  'prose-table:text-base',
  'prose-table:text-muted-dark',
  'prose-th:border',
  'prose-th:border-muted-light',
  'prose-th:p-3',
  'prose-th:align-middle',
  'prose-td:border',
  'prose-td:border-muted-light',
  'prose-td:rounded-md',
  'prose-td:p-3',
  'prose-td:align-middle',
);

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className={styles}>{children}</div>;
}
