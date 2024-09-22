//import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import mainLogo from '@/public/images/gradientmainlogo.svg';
import ConsultationButton from '@/components/ui/buttons/ConsultationButton';
//import HeaderItems from './HeaderItems';
//import HeaderItem from './HeaderItem';
import Logo from '@/components/ui/Logo';

export default function TopHeader() {
    return (
        <div className="flex items-center justify-between p-4 border-b border-muted-light">
            <div className="mr-6">
                <Logo src={mainLogo} sizeClass="w-36" />
            </div>
            <div className="flex items-center gap-10">
                <ConsultationButton />
                {/*
                 <HeaderItems>
                    <HeaderItem href="#" Icon={FavoriteIcon} />
                    <HeaderItem href="#" Icon={SignalCellularAltIcon} />
                </HeaderItems>
                 */}
            </div>
        </div>
    );
}
