import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import providers from "../../../data/providers";
import MeasureCell from "./TariffMeasure";
import Button from "../form/Button";
import Image from 'next/image'

export default function TariffCard({
    tariff
}: {
    tariff: {[key: string]: any}
}) {
    return (
        <div className="bg-white text-muted-dark shadow-md rounded-md border border-muted-light">
            <div className="p-6">
                <div className="flex justify-end">
                    <Image
                        src={providers[tariff.provider].image}
                        alt={providers[tariff.provider].alt}
                        width={0}
                        height={0}
                        className="w-10 h-auto mb-2"/>
                </div>
                <div className="flex flex-col items-center mb-8">
                    <span className="font-medium">{tariff.name}</span>
                    <span className="text-xs text-muted">{tariff.provider}</span> 
                </div>  
                <div className="flex justify-center gap-16 px-10 mb-6">
                    <MeasureCell number={tariff.speed} unit="MBIT/S"/>
                    {tariff.chanels && <MeasureCell number={tariff.chanels} unit="CHANNELS"/>}
                </div>
                {tariff.mobileCommunication &&
                    <div className="flex justify-center">
                        {tariff.mobileCommunication.data ? <MeasureCell number={tariff.mobileCommunication.data} unit="GB"/> : <MeasureCell unit="GB"/>}
                        {tariff.mobileCommunication.time ? <MeasureCell number={tariff.mobileCommunication.time} unit="MIN"/> : <MeasureCell unit="MIN"/>}
                        {tariff.mobileCommunication?.sms ? <MeasureCell number={tariff.mobileCommunication.sms} unit="SMS"/> : <MeasureCell unit="SMS"/>}
                    </div>
                }
            </div>
            <div className="flex">
                <Button variant="secondary" className="rounded-bl-md"><ContactSupportIcon/></Button>
                <Button className="rounded-br-md">Сonnect</Button>
            </div>
            
        </div>
    )
}