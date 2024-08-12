import PageLayout from './layouts/PageLayout';
import Main from './Main';

export default function Page() {
  return (
    <PageLayout headerVariant="primary">
      <Main/>
    </PageLayout>
  )
}
