import Mesh from '@/components/ui/mesh/Mesh';

const gradientStops = [
    { offset: '0%', color: '#a5b4fc', animationValues: '#a5b4fc; #ddd6fe; #f5d0fe; #a5b4fc' },
    { offset: '50%', color: '#ddd6fe', animationValues: '#ddd6fe; #f5d0fe; #a5b4fc; #ddd6fe' },
    { offset: '100%', color: '#f5d0fe', animationValues: '#f5d0fe; #a5b4fc; #ddd6fe; #f5d0fe' },
];

export default function GradientMesh() {
    return (
        <Mesh>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {gradientStops.map(({ offset, color, animationValues }) => (
                    <stop key={offset} offset={offset} stopColor={color}>
                        <animate
                            attributeName="stop-color"
                            values={animationValues}
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </stop>
                ))}
            </linearGradient>
        </Mesh>
    );
}
