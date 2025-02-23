export default function PanelActions({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute bottom-0 w-full bg-white px-2 py-4 flex justify-around shadow-top">
            {children}
        </div>
    );
}
