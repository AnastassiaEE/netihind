export type Package = {
    id: number;
    name: string;
    description: string | null;
    speed: {
        upload: number,
        download: number
    }
    data: number;
    technology: {
        name: string,
        description: string
    },
    provider: {
        name: string,
        image_url: string | null
    },
    infrastructure: {
        name: string,
        is_partner: boolean
    },
    price: number;
    installation: {
        visit_fee: number,
        additional_time: number | null,
        additional_time_fee: number | null
    } | null,
    equipment: EquipmentItem[]
};

export type PackageAction = 'connection' | 'details';

export type EquipmentItem = {
    id: number,
    combination_id: number,
    type: string,
    brand: string | null,
    model: string | null,
    name: string | null,
    description: string | null,
    payment: { [key: string]: { price: number } | { price: number; installments_months: number }}
}