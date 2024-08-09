import useBoolean from "./useBoolean";
import useScrollPosition from "./useScrollPosition";

export default function useHeader() {

    const y = useScrollPosition();
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
        y,
        isSidebarOpened,
        handleSidebar
    }

}