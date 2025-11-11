export type Package = {
    id: number;
    name: string;
    description: string | null;
    speed: {
        upload: number,
        download: number
    }
    data: number;
    technology: string;
    provider: {
        name: string,
        image_url: string | null
    }
    infrustructure: {
        name: string | null,
        is_partner: boolean | null
    }
    price: number;
    installation: {
        visit_fee: number,
        additional_time: number | null,
        additional_time_fee: number | null
    }
};

export type PackageAction = 'connection' | 'details';