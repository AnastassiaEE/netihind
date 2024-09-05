import TariffCard from "./TariffCard";

export default function TariffsList({items}: {items: {[key:string]:any}[]}) {
    return (
        <>
            {items.map(tariff => 
                <div className="mb-6">
                    <TariffCard key={tariff.id} tariff={tariff}/>  
                </div>
            )}
        </>
    )
}