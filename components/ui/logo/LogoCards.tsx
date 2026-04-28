import LogoCard from '@/components/ui/logo/LogoCard';
import { Logo } from '@/types/logo.types';

export default function LogoCards({ logos }: { logos: Logo[] }) {
  return (
    <div className="flex flex-wrap justify-around">
      {logos.map(({ name, src, alt }) => (
        <LogoCard key={name} src={src} alt={alt} />
      ))}
    </div>
  );
}
