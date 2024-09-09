import NavigationItem from "../navigation/NavigationItem";
import Navigation from '../navigation/Navigation';

export default function Navbar({type = 'horizontal'}: {type?: 'horizontal' | 'vertical'}) {
    return (    
        <Navigation linkColor="muted-dark" type={type}>
            <NavigationItem href="/blog">Blog</NavigationItem>
            <NavigationItem href="/about">About Us</NavigationItem>
            <NavigationItem href="#">Link3</NavigationItem>
        </Navigation>
    )
}