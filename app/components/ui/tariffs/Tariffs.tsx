import TariffsTable from "./TarriffsTable";
import TariffsList from "./TariffsList";

export default function Tariffs({items}: {items: {[key:string]:any}[]}) {
    return (
        <>
            <div className="md:hidden">
                <TariffsList items={items}/>
            </div>
            <div className="max-md:hidden">
                <TariffsTable items={items}/>
            </div>
        </> 
    )
}