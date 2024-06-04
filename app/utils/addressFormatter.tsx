const addressRegex = /^[^\d]*[\d\/A-Za-z]*$/g;
const apartmentRegex = /(?<=\-).*$/g;

export const getAddress = (address) => {
    return address.match(addressRegex)?.[0];
}

export const getApartment = (address) => {
    return address.match(apartmentRegex)?.[0];
}

export const removeExtraChars = (address) => {
    return address?.replace('tn ', '').replace(/[A-Za-z]{1}\.\s/g, '');
}

export const removeExtraSpaces = (str) => {
    return str.replace(/\s{2,}/g, ' ');
}
