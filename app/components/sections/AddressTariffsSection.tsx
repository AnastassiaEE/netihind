import SectionLayout from "../../layouts/SectionLayout";
import addressTariffs from "../../data/addressTariffs";
import Tariffs from "../ui/tariffs/Tariffs";

export default function AddressTariffsSection() {
    return (
        <SectionLayout bg={""} paddings="py-24">
            <h3 className="text-3xl font-extrabold mb-6">Тарифы</h3>
            <Tariffs items={addressTariffs}/>
        </SectionLayout>
    )
}