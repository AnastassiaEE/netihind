import SectionLayout from "../../layouts/SectionLayout";
import TariffsTable from "../ui/tariffs/TarriffsTable";
import addressTariffs from "../../data/addressTariffs";

export default function AddressTariffsSection() {
    return (
        <SectionLayout bg={""} paddings="py-24">
            <h3 className="text-3xl font-extrabold mb-6">Тарифы</h3>
            <TariffsTable items={addressTariffs}/>
        </SectionLayout>
    )
}