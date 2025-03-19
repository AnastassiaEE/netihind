import Mesh from '@/components/ui/mesh/Mesh';

const gradientStops = [
  { offset: '0%', color: '#e7ebff' },
  { offset: '50%', color: '#e8e3ff' },
  { offset: '100%', color: '#f9e1ff' },
];

export default function GradientMesh() {
  return (
    <Mesh>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        {gradientStops.map(({ offset, color }) => (
          <stop key={offset} offset={offset} stopColor={color} />
        ))}
      </linearGradient>
    </Mesh>
  );
}
