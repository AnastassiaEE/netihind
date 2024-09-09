import useBoolean from "./useBoolean";

export default function useSidebar() {

    const {
        value: isSidebarOpened, 
        setTrue: openSidebar, 
        setFalse: closeSidebar
    } = useBoolean(false);

    const handleSidebar = (state: boolean) => {
        if (state) {
            openSidebar();
            document.body.style.cssText = 'overflow: hidden';
        } else {
            closeSidebar();
            document.body.style.cssText = 'overflow-y: scroll';
        }
    }
    
    return {
        isSidebarOpened,
        handleSidebar
    }

}