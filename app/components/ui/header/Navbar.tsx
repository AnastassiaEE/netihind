import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import mainLogo from '../../../../public/images/gradientmainlogo.svg';
import NavigationItem from "../navigation/NavigationItem";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navigation from '../navigation/Navigation';
import HeaderItems from "./HeaderItems";
import HeaderItem from "./HeaderItem";
import Logo from "../Logo";

export default function Navbar({children} : {children: React.ReactNode}) {
    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
                <div className="mr-6">
                    <Logo src={mainLogo}/>
                </div>
                <div className="max-md:hidden">
                    <Navigation linkColor="muted-dark">
                        <NavigationItem link="#">Link1</NavigationItem>
                        <NavigationItem link="#">Link2</NavigationItem>
                        <NavigationItem link="#">Link3</NavigationItem>
                    </Navigation>
                </div>
            </div>
            <div className="flex items-center">
                <HeaderItems>
                    <HeaderItem href="#" Icon={FavoriteIcon}/>
                    <HeaderItem href="#" Icon={SignalCellularAltIcon}/>
                </HeaderItems>  
                {children}
            </div>
        </div>
    )
}