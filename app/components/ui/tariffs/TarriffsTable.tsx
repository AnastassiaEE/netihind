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
                           <th key={column} className="p-3 text-base rounded-md">{column}</th> 
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {items.map(tariff => 
                    <tr key={tariff.id} className="odd:bg-neutral-light">
                        <td className="p-3 text-base text-muted-dark rounded-md">{tariff.provider}</td>
                        <td className="p-3 text-base text-muted-dark rounded-md">{tariff.speed}</td>
                        <td className="p-3 text-base text-muted-dark rounded-md">{tariff?.chanels ?? '-'}</td>
                        <td className="p-3 text-base text-muted-dark rounded-md">
                            {tariff.mobileCommunication ? 
                            `${tariff.mobileCommunication?.data ?? '-'}
                             ${tariff.mobileCommunication?.time ?? '-'}
                             ${tariff.mobileCommunication?.sms ?? '-'}` 
                            : '-'}
                        </td>
                        <td className="p-3 text-base rounded-md">{tariff.price}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}