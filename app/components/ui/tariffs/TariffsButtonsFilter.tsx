import ButtonsFilter from "../filter/ButtonsFilter";


export default function TariffsButtonsFilter() {
    const buttons = {
        'all': true,
        'internet only': false,
        'internet + tv': false,
        'internet + tv + mob. communication': false,
        'internet + mob.communication': false
    }
    
    return <ButtonsFilter buttons={buttons}/>
}