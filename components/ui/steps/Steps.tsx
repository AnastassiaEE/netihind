import Step from '@/components/ui/steps/Step';
import { StepItem } from '@/types/content.types';

const lineStyles = {
  right:
    'md:after:absolute md:after:left-2/4 md:after:top-10 md:after:h-px md:after:w-2/4 md:after:bg-primary-light',
  left: ':before:absolute md:before:left-0 md:before:top-10 md:before:h-px md:before:w-2/4 md:before:bg-primary-light',
  bottom:
    'after:absolute after:left-10 after:top-2/4 after:h-2/4 after:w-px after:bg-primary-light',
  top: 'before:absolute before:left-10 before:top-0 before:h-2/4 before:w-px before:bg-primary-light',
};

export default function Steps({ steps }: { steps: StepItem[] }) {
  const drawLine = (index: number) => {
    const lineClasses = [];
    if (index === 1) {
      lineClasses.push(lineStyles.bottom, lineStyles.right);
    } else if (index === steps.length) {
      lineClasses.push(lineStyles.top, lineStyles.left);
    } else {
      lineClasses.push(
        lineStyles.bottom,
        lineStyles.top,
        lineStyles.right,
        lineStyles.left,
      );
    }
    return lineClasses.join(' ');
  };

  return (
    <div className="relative -z-10 md:flex">
      {steps.map(({ title, description }, index) => (
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
