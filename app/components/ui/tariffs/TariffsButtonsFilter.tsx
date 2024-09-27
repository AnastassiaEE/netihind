import ButtonsFilter from '../filter/ButtonsFilter';

export default function TariffsButtonsFilter() {
    const buttons = {
        'filters.all': true,
        'filters.internet-only': false,
        'filters.internet-tv': false,
    };
    return <ButtonsFilter buttons={buttons} />;
}
