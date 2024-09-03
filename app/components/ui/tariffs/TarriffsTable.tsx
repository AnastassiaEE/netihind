import providers from "../../../data/providers"
import Image from "next/image"

const columns = [
    'Провайдер',
    'Скорость',
    'Каналы',
    'Мобильная связь',
    'Стоимость'
]

export default function TariffsTable({items}: {items: {[key:string]:any}[]}) {
    return (
        <table className="table-fixed bg-white w-full text-center">
            <thead>
                <tr>
                    {
                        columns.map(column => 
                           <th key={column} className="p-3 text-base">{column}</th> 
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {items.map(tariff => 
                    <tr key={tariff.id} className="odd:bg-neutral-light">
                        <td className="p-3 text-base text-muted-dark first:rounded-l-md last:rounded-r-md">
                            {tariff.provider}
                            <Image 
                                src={providers[tariff.provider].image}
                                alt={providers[tariff.provider].alt}
                                width={0}
                                height={0}
                                className="w-10 h-auto"/>
                        </td>
                        <td className="p-3 text-base text-muted-dark first:rounded-l-md last:rounded-r-md">{tariff.speed}</td>
                        <td className="p-3 text-base text-muted-dark first:rounded-l-md last:rounded-r-md">{tariff?.chanels ?? '-'}</td>
                        <td className="p-3 text-base text-muted-dark first:rounded-l-md last:rounded-r-md">
                            {tariff.mobileCommunication ? 
                            `${tariff.mobileCommunication?.data ?? '-'}
                             ${tariff.mobileCommunication?.time ?? '-'}
                             ${tariff.mobileCommunication?.sms ?? '-'}` 
                            : '-'}
                        </td>
                        <td className="p-3 text-base text-muted-dark first:rounded-l-md last:rounded-r-md">{tariff.price}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}