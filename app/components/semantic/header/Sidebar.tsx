import Navigation from "../navigation/Navigation";
import NavigationItem from "../navigation/NavigationItem";
import CloseIcon from '@mui/icons-material/Close';

export default function Sidebar({
    isOpened,
    handleClose,
}: {
    isOpened: boolean,
    handleClose: React.MouseEventHandler,
}) {
    return (
        <div className={`fixed top-0 right-0 w-80 max-w-full h-full z-50 bg-white shadow-md transition-transform duration-300 ${isOpened ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
            <div className="flex justify-between px-6 py-5 border-b border-muted-light">
                <h5 className="text-xl font-extrabold">Menu</h5>
                <button type="button" className="h-max" onClick={handleClose}><CloseIcon className="text-muted hover:text-black transition-colors"/></button>
            </div>
            <div className="p-6">
                <Navigation linkColor="muted-dark" type="vertical">
                    <NavigationItem link="#" name="Link1"/>
                    <NavigationItem link="#" name="Link1"/>
                    <NavigationItem link="#" name="Link1"/>
                </Navigation>
            </div>
        </div>
    )
}