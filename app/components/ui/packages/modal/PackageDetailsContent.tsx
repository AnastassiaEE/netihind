import PackageModalSection from '@/components/ui/packages/modal/PackageModalSection';

export default function PackageDetails() {
  return (
    <div className="space-y-4">
      <PackageModalSection title={'Описание услуги'} className="bg-white">
        <p>Тип подключения: </p>
        <p>Скорость загрузки: </p>
        <p>Скорость отдачи: </p>
      </PackageModalSection>
      <PackageModalSection title={'Установка'} className="bg-white">
        <div></div>
      </PackageModalSection>
      <PackageModalSection title={'Устройства'} className="bg-white">
        <div></div>
      </PackageModalSection>
    </div>
  );
}
