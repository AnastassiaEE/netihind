import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import providers from '../../../data/providers';
import TarriffMeasure from './TariffMeasure';
import Button from '../form/buttons/Button';
import Image from 'next/image';

export default function TariffCard({ tariff }: { tariff: { [key: string]: any } }) {
    return (
        <div className="bg-white text-muted-dark shadow-md rounded-md border border-muted-light">
            <div className="p-6">
                <div className="flex justify-end">
                    <Image
                        src={providers[tariff.provider].image}
                        alt={providers[tariff.provider].alt}
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
                    <TarriffMeasure number={tariff.speed} unit="MBIT/S" />
                    {tariff.chanels && <TarriffMeasure number={tariff.chanels} unit="CHANNELS" />}
                </div>
                {tariff.mobileCommunication && (
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
                )}
                <TarriffMeasure
                    number={tariff.price}
                    unit="€ / MONTH"
                    className="!text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent py-1"
                />
            </div>
            <div className="flex">
                <Button variant="secondary" className="rounded-bl-md">
                    <ContactSupportIcon />
                </Button>
                <Button className="rounded-br-md">Сonnect</Button>
            </div>
        </div>
    );
}
