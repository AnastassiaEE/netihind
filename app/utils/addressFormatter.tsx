const addressRegex = /^[^\d]*[\d\/A-Za-z]*$/g;
const apartmentRegex = /(?<=\-).*$/g;

export const getAddress = (address: string) => {
    return address.match(addressRegex)?.[0] ?? '';
}

export const getApartment = (address: string) => {
    return address.match(apartmentRegex)?.[0] ?? '';
}

export const removeExtraChars = (address: string) => {
    return address?.replace('tn ', '').replace(/[A-Za-z]{1}\.\s/g, '');
}

export const removeExtraSpaces = (str: string) => {
    return str.replace(/\s{2,}/g, ' ');
}
