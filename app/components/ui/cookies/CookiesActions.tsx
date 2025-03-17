import Button from '@/components/ui/form/buttons/Button';

export default function CookiesActions() {
  return (
    <div className="flex w-full justify-center gap-3 max-sm:flex-wrap">
      <Button variant="outlined" size="lg" className="w-full">
        Keeldu
      </Button>
      <Button variant="outlined" size="lg" className="w-full">
        Luba valik
      </Button>
      <Button size="lg" className="w-full">
        Luba kõik
      </Button>
    </div>
  );
}
