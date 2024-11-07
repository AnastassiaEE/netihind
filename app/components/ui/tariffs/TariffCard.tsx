import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TarriffMeasure from './TariffMeasure';
import Button from '../form/buttons/Button';
import Image from 'next/image';

export default function TariffCard({ tariff }: { tariff: { [key: string]: any } }) {
    return (
        <div className="bg-white text-muted-dark shadow-md rounded-md border border-muted-light">
            <div className="p-6">
                <div className="flex justify-end">
                    <Image
                        src={'providers[tariff.provider].image'}
                        alt={'providers[tariff.provider].alt'}
                        width={0}
                        height={0}
                        className="w-10 h-auto mb-2"
                    />
                </div>
                <div className="flex flex-col items-center mb-8">
                    <span className="font-medium">{tariff.name}</span>
                    <span className="text-xs text-muted">{tariff.provider}</span>
                </div>
                <div className="flex justify-center gap-16 mb-6">
                    <TarriffMeasure number={tariff.speed} unit={'tariffs.measure.speed'} />
                    {tariff.chanels && <TarriffMeasure number={tariff.chanels} unit={'tariffs.measure.channels'} />}
                </div>
                {/* {tariff.mobileCommunication && (
                    <div className="flex justify-center mb-6">
                        {tariff.mobileCommunication.data ? (
                            <TarriffMeasure number={tariff.mobileCommunication.data} unit="GB" />
                        ) : (
                            <TarriffMeasure unit="GB" />
                        )}
                        {tariff.mobileCommunication.time ? (
                            <TarriffMeasure number={tariff.mobileCommunication.time} unit="MIN" />
                        ) : (
                            <TarriffMeasure unit="MIN" />
                        )}
                        {tariff.mobileCommunication?.sms ? (
                            <TarriffMeasure number={tariff.mobileCommunication.sms} unit="SMS" />
                        ) : (
                            <TarriffMeasure unit="SMS" />
                        )}
                    </div>
                )} */}
                <TarriffMeasure
                    number={tariff.price}
                    unit={`€ / ${'tariffs.measure.month'}`}
                    className="!text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary from-30% via-secondary via-40% to-accent to-60% py-1"
                />
            </div>
            <div className="flex">
                <Button variant="secondary" className="!rounded-tl-none !rounded-r-none grow">
                    <ContactSupportIcon />
                </Button>
                <Button className="!rounded-tr-none !rounded-l-none grow">{'tariffs.buttons.connect'}</Button>
            </div>
        </div>
    );
}
