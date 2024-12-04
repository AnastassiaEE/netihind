import Image from 'next/image';
export default function PackageHeader({
    logo,
    provider,
    name,
}: {
    logo: string;
    provider: string;
    name: string;
}) {
    return (
        <div className="mb-5">
            <div className="relative w-24 h-8 mb-1">
                <Image src={logo} alt={`${provider} logo`} fill className="object-contain" />
            </div>
            <span className="text-xs text-muted mb-1">{provider}</span>
            <p className="text-sm font-medium">{name}</p>
        </div>
    );
}
