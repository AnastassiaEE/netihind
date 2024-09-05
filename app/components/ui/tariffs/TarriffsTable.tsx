import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TariffTableCell from './TariffTableCell';
import MeasureCell from './TariffMeasure';
import providers from "../../../data/providers";
import Button from '../form/Button';
import Image from "next/image";

const columns = [
    'Provider',
    'Speed',
    'Channels',
    'Mob. communication',
    'Price'
]

export default function TariffsTable({items}: {items: {[key:string]:any}[]}) {
    return (
        <div className="flex justify-center">
            <div className={`text-center text-muted-dark grid grid-rows-10 grid-cols-tariffs w-full`}>
                {columns.map((column) => (<TariffTableCell key={column} className="font-extrabold rounded-l-md">{column}</TariffTableCell>))}
                {items.map((tariff, index) =>
                    <>
                        <TariffTableCell key={index} index={index} className="rounded-l-md">
                            <div className="flex flex-col items-center">
                                <Image 
                                    src={providers[tariff.provider].image}
                                    alt={providers[tariff.provider].alt}
                                    width={0}
                                    height={0}
                                    className="w-10 h-auto mb-2"/> 
                                <span className="font-medium">{tariff.name}</span>
                                <span className="text-xs text-muted">{tariff.provider}</span> 
                            </div>
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index}>
                            <MeasureCell number={tariff.speed} unit="MBIT/S"/>
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index}>
                            {tariff.chanels ? <MeasureCell number={tariff.chanels} unit="CHANNELS"/> : <MeasureCell unit="CHANNELS"/>}
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index}>
                            {tariff.mobileCommunication ?  
                                <>    
                                    {tariff.mobileCommunication.data ? <MeasureCell number={tariff.mobileCommunication.data} unit="GB"/> : <MeasureCell unit="GB"/>}
                                    {tariff.mobileCommunication.time ? <MeasureCell number={tariff.mobileCommunication.time} unit="MIN"/> : <MeasureCell unit="MIN"/>}
                                    {tariff.mobileCommunication?.sms ? <MeasureCell number={tariff.mobileCommunication.sms} unit="SMS"/> : <MeasureCell unit="SMS"/>}      
                                </>   
                            : <MeasureCell empty={true}/>}
                        </TariffTableCell>
                        <TariffTableCell key={index} index={index} className="rounded-r-md">
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <MeasureCell number={tariff.price} unit="€ / MONTH" className="bg-gradient-to-r from-primary via-secondary to-accent py-1 text-white rounded-md w-full"/>
                                </div>
                                <div className="flex">
                                    <Button variant="secondary" className="rounded-l-md"><ContactSupportIcon/></Button>
                                    <Button className="rounded-r-md">Сonnect</Button>
                                </div>
                            </div>
                        </TariffTableCell>   
                    </>
                )}
            </div>
        </div>
    )
}