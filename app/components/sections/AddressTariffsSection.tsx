import SectionLayout from "@/layouts/SectionLayout";
import addressTariffs from "@/data/addressTariffs";
import Tariffs from "@/components/ui/tariffs/Tariffs";
import TariffsButtonsFilter from "@/components/ui/tariffs/TariffsButtonsFilter";

export default function AddressTariffsSection() {
    return (
        <SectionLayout className="pt-24">
            <h3 className="text-3xl font-extrabold mb-6">Тарифы</h3>
            <div className="mb-12">
                <TariffsButtonsFilter/>
            </div>
            <Tariffs items={addressTariffs}/>
        </SectionLayout>
    )
}