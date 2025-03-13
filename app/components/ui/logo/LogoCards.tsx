import LogoCard from '@/components/ui/logo/LogoCard';

export default function LogoCards({ logos }: { logos: { [key: string]: string }[] }) {
    return (
        <div className="flex flex-wrap justify-around">
            {logos.map(({ name, img_src, img_alt }) => (
                <LogoCard key={name} src={img_src} alt={img_alt} />
            ))}
        </div>
    );
}
