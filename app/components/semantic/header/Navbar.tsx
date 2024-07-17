import mainLogo from '../../../../public/images/gradientmainlogo.svg';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navigation from '../../semantic/navigation/Navigation';
import NavigationItem from "../navigation/NavigationItem";
import HeaderItems from "./HeaderItems";
import HeaderItem from "./HeaderItem";
import Logo from "./Logo";

export default function Navbar({children} : {children: React.ReactNode}) {
    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
                <div className="mr-6">
                    <Logo src={mainLogo}/>
                </div>
                <div className="max-md:hidden">
                    <Navigation linkColor="muted-dark">
                        <NavigationItem link="#" name="Link1"/>
                        <NavigationItem link="#" name="Link1"/>
                        <NavigationItem link="#" name="Link1"/>
                    </Navigation>
                </div>
            </div>
            <div className="flex items-center">
                <HeaderItems>
                    <HeaderItem link="#" Icon={FavoriteIcon}/>
                    <HeaderItem link="#" Icon={SignalCellularAltIcon}/>
                </HeaderItems>  
                {children}
            </div>
        </div>
    )
}