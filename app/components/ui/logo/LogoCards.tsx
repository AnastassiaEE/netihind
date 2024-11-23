import LogoCard from '@/components/ui/logo/LogoCard';

export default function LogoCards({ logos }: { logos: { [key: string]: string }[] }) {
    return (
        <div className="flex flex-wrap justify-around">
            {logos.map(({ name, image, alt }) => (
                <LogoCard key={name} image={image} alt={alt} />
            ))}
        </div>
    );
}