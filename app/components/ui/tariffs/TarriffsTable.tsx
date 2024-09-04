import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CancelIcon from '@mui/icons-material/Cancel';
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

const numberStyle = 'font-extrabold text-lg block'
const measureStyle = 'text-base block'
const cellStyle = 'break-word px-2 py-5'
const gridTemplate = "minmax(0,max-content)_minmax(0,_max-content)_minmax(0,_max-content)_minmax(0,_max-content)_minmax(0,_max-content)";

const getCellBg = (index: number) => {
    if(index % 2 == 0) {
        return '';
    }   
    return '';
}

export default function TariffsTable({items}: {items: {[key:string]:any}[]}) {
    return (
        <div className="flex justify-center">
            <div className={`text-center text-muted-dark grid grid-rows-10 grid-cols-[repeat(5,minmax(max-content,100%))] place-items-center`}>
                    {columns.map((column) => 
                        <div key={column} className={`font-extrabold ${cellStyle} px-16`}>{column}</div> 
                    )}
               
                    {items.map((tariff, index) =>
                       <>
                            <div className={`${cellStyle} ${getCellBg(index)} flex flex-col items-center `}>
                                <Image 
                                    src={providers[tariff.provider].image}
                                    alt={providers[tariff.provider].alt}
                                    width={0}
                                    height={0}
                                    className="w-10 h-auto mb-3"/>  
                                <span className="block">{tariff.provider}</span> 
                            </div>
                            <div className={`${cellStyle}`}>
                                <span className={numberStyle}>{tariff.speed}</span>
                                <span className={measureStyle}>MBIT/S</span>
                            </div>
                            <div className={`${cellStyle} ${getCellBg(index)}`}>
                                {tariff.chanels ? <span className={numberStyle}>{tariff.chanels}</span> : <CancelIcon/>}
                            </div>
                            <div className={`${cellStyle} ${getCellBg(index)} flex`}>
                                {tariff.mobileCommunication ?  
                                    <>    
                                        {tariff.mobileCommunication.data ? 
                                            <div className="mx-1">
                                                <span className={numberStyle}>{tariff.mobileCommunication.data}</span>
                                                <span className={measureStyle}>GB</span>
                                            </div>
                                            : <CancelIcon/>}
                                        {tariff.mobileCommunication.time ?
                                            <div className="mx-1">
                                                    <span className={numberStyle}>{tariff.mobileCommunication.time}</span>
                                                    <span className={measureStyle}>MIN</span>
                                            </div>
                                            : <CancelIcon/>}
                                        {tariff.mobileCommunication?.sms ?
                                            <div className="mx-1">
                                                <span className={numberStyle}>{tariff.mobileCommunication.sms}</span>
                                                <span className={measureStyle}>SMS</span>
                                            </div>
                                            : <CancelIcon/>}      
                                    </>   
                                : <CancelIcon/>}
                            </div>
                            <div className={`${cellStyle} ${getCellBg(index)}`}>
                                <div className="mb-4">
                                    <span className={`${numberStyle} bg-gradient-to-r from-primary via-secondary to-accent w-full py-1 text-white rounded-md`}>{tariff.price}</span>
                                    <span className={measureStyle}>€ / MONTH</span>
                                </div>
                                <div className="md:flex">
                                    <Button variant="secondary"roundedClass="rounded-l-md"><ContactSupportIcon/></Button>
                                    <Button roundedClass="rounded-r-md">Сonnect</Button>
                                </div>
                                
                            </div>
                        </>
                    )}
              
            </div>
        </div>
    )
}