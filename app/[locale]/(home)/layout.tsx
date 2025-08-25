import MainFooter from '@/components/ui/footer/MainFooter';
import Header from '@/components/ui/header/Header';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

export default function Layout(props: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const params = use(props.params);
  const { locale } = params;
  const { children } = props;

  setRequestLocale(locale);

  return (
    <>
      <Header variant="primary" />
      <main>{children}</main>
      <MainFooter />
    </>
  );
}
