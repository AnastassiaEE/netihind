import { useTranslations } from 'next-intl';

export default function CookiesInfoSection() {
  const t = useTranslations('Cookies');
  return (
    <>
      {t.rich('info', {
        p: (chunks: React.ReactNode) => (
          <p className="[&:not(:last-child)]:mb-3">{chunks}</p>
        ),
      })}
    </>
  );
}
