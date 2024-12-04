import Button from '@/components/ui/form/buttons/Button';

export default function PackageActions({ isSmallScreen }: { isSmallScreen: boolean }) {
    return (
        <div className="max-md:flex md:space-y-1 w-full">
            <Button
                size={isSmallScreen ? 'sm' : 'lg'}
                className="max-md:rounded-t-none max-md:rounded-br-none w-full"
            >
                Подключиться
            </Button>
            <Button
                size={isSmallScreen ? 'sm' : 'lg'}
                variant="secondary"
                className="max-md:rounded-t-none max-md:rounded-bl-none w-full"
            >
                Консультация
            </Button>
        </div>
    );
}
