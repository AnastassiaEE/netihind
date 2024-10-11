import Mesh from '@/components/ui/mesh/Mesh';

export default function GradientMesh() {
    return (
        <Mesh>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a5b4fc">
                    <animate
                        attributeName="stop-color"
                        values="#a5b4fc; #ddd6fe; #f5d0fe; #a5b4fc"
                        dur="4s"
                        repeatCount="indefinite"
                    ></animate>
                </stop>
                <stop offset="50%" stopColor="#ddd6fe">
                    <animate
                        attributeName="stop-color"
                        values="#ddd6fe; #f5d0fe; #a5b4fc; #ddd6fe"
                        dur="4s"
                        repeatCount="indefinite"
                    ></animate>
                </stop>
                <stop offset="100%" stopColor="#f5d0fe">
                    <animate
                        attributeName="stop-color"
                        values="#f5d0fe; #a5b4fc; #ddd6fe; #f5d0fe"
                        dur="4s"
                        repeatCount="indefinite"
                    ></animate>
                </stop>
            </linearGradient>
        </Mesh>
    );
}
