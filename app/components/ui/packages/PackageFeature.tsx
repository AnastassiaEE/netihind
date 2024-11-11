import classNames from 'classnames';
import PackageFeatureUnit from './PackageFeatureUnit';

export default function PackageFeature({
    children,
    unit,
}: {
    children: React.ReactNode;
    unit?: string;
}) {
    return (
        <div className="flex flex-col justify-center text-center w-max">
            {children}
            {unit && <PackageFeatureUnit>{unit}</PackageFeatureUnit>}
        </div>
    );
}
