import Step from '@/components/ui/steps/Step';

const lineStyles = {
    right:
        'md:after:bg-neutral md:after:absolute md:after:left-2/4 md:after:top-10 md:after:w-2/4 md:after:h-px',
    left: 'md:before:bg-neutral md:before:absolute md:before:left-0 md:before:top-10 md:before:w-2/4 md:before:h-px',
    bottom: 'after:bg-neutral after:absolute after:left-10 after:top-2/4 after:w-px after:h-2/4',
    top: 'before:bg-neutral before:absolute before:left-10 before:top-0 before:w-px before:h-2/4',
};

export default function Steps({ data }: { data: { [key: string]: string }[] }) {
    const drawLine = (index: number) => {
        let lineClasses = [];
        if (index === 1) {
            lineClasses.push(lineStyles.bottom, lineStyles.right);
        } else if (index === data.length) {
            lineClasses.push(lineStyles.top, lineStyles.left);
        } else {
            lineClasses.push(lineStyles.bottom, lineStyles.top, lineStyles.right, lineStyles.left);
        }
        return lineClasses.join(' ');
    };

    return (
        <div className="md:flex relative -z-10">
            {data.map(({ title, description }, index) => (
                <Step
                    key={index}
                    index={index + 1}
                    title={title}
                    description={description}
                    className="max-md:py-6 md:px-4 lg:px-6"
                    lines={drawLine(index + 1)}
                ></Step>
            ))}
        </div>
    );
}
