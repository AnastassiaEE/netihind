export default function PanelActions({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute bottom-0 flex w-full justify-around bg-white px-2 py-4 shadow-top">
            {children}
        </div>
    );
}
