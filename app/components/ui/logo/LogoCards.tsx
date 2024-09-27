import LogoCard from '@/components/ui/logo/LogoCard';

export default function LogoCards({ logos }: { logos: { [key: string]: any }[] }) {
    return (
        <div className="flex flex-wrap justify-around">
            {logos.map((logo) => (
                <LogoCard key={logo.name} image={logo.image} alt={logo.alt} />
            ))}
        </div>
    );
}
