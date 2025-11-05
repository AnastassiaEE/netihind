export type Package = {
    id: number;
    name: string;
    description: string | null;
    download_speed: number;
    upload_speed: number;
    data: number;
    technology: string;
    provider_name: string;
    provider_image_url: string | null;
    infrastructure_provider_name: string | null;
    is_infrastructure_provider_partner: boolean | null;
    price: number;
};