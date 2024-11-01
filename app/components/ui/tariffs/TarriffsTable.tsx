import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TariffTableCell from './TariffTableCell';
import TarriffMeasure from './TariffMeasure';
import providers from '../../../data/providers';
import Button from '../form/buttons/Button';
import Image from 'next/image';

export default function TariffsTable({ items }: { items: { [key: string]: any }[] }) {
    const columns = [
        'tariffs.columns.provider',
        'tariffs.columns.speed',
        'tariffs.columns.channels',
        'tariffs.columns.options',
        'tariffs.columns.price'
    ];
    return (
        <div className="flex justify-center">
            <div className={`text-center text-muted-dark grid grid-rows-10 grid-cols-tariffs w-full`}>
                {columns.map((column) => (
                    <TariffTableCell key={column} className="font-extrabold rounded-l-md">
                        {column}
                    </TariffTableCell>
                ))}
                {items.map((tariff, index) => (
                    <>
                        <TariffTableCell key={tariff.name} index={index} className="rounded-l-md">
                            <div className="flex flex-col items-center">
                                <Image
                                    src={providers[tariff.provider].image}
                                    alt={providers[tariff.provider].alt}
                                    width={0}
                                    height={0}
                                    className="w-10 h-auto mb-2"
                                />
                                <span className="font-medium">{tariff.name}</span>
                                <span className="text-xs text-muted">{tariff.provider}</span>
                            </div>
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index}>
                            <TarriffMeasure number={tariff.speed} unit={'tariffs.measure.speed'} />
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index}>
                            {tariff.chanels ? (
                                <TarriffMeasure number={tariff.chanels} unit={'tariffs.measure.channels'} />
                            ) : (
                                <TarriffMeasure unit={'tariffs.measure.channels'} />
                            )}
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index}>
                            {/* {tariff.mobileCommunication ? (
                                <>
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
                                </>
                            ) : (
                                <TarriffMeasure empty={true} />
                            )} */}
                            <TarriffMeasure empty={true} />
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index} className="rounded-r-md">
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <TarriffMeasure
                                        number={tariff.price}
                                        unit={`€ / ${'tariffs.measure.month'}`}
                                        className="!text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent py-1"
                                    />
                                </div>
                                <div className="flex">
                                    <Button variant="secondary" className="!rounded-r-none">
                                        <ContactSupportIcon />
                                    </Button>
                                    <Button className="!rounded-l-none">{'tariffs.buttons.connect'}</Button>
                                </div>
                            </div>
                        </TariffTableCell>
                    </>
                ))}
            </div>
        </div>
    );
}
