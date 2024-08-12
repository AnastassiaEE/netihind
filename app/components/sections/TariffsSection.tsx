import providers from "../../data/providers";
import SectionLayout from "../../layouts/SectionLayout";
import ProviderCards from "../ui/providers/ProviderCards";

export default async function TariffsSection() {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <SectionLayout bg="bg-neutral" paddings={"pt-20"}>
            <h3 className="text-3xl font-extrabold mb-6">Провайдеры по адресу</h3>
            <p className="text-lg font-bold text-primary mb-6">Akadeemia tee 14-42</p>
            <ProviderCards items={providers}/>
            <div className="mb-6"></div>
            <h3 className="text-3xl font-extrabold mb-6">Тарифы</h3>
        </SectionLayout>
    )
}