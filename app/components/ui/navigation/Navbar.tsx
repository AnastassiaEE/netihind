import NavigationItem from "./NavigationItem";
import Navigation from './Navigation';

export default function Navbar({
    type = 'horizontal',
    linkColor = 'muted-dark',
    children
}: {
    type?: 'horizontal' | 'vertical',
    linkColor?: string,
    children?: React.ReactNode
}) {
    return (    
        <Navigation linkColor={linkColor} type={type}>
            {children}
            <NavigationItem href="/blog">Blog</NavigationItem>
            <NavigationItem href="/about">About Us</NavigationItem>
            <NavigationItem href="/contacts">Contacts</NavigationItem>
        </Navigation>
    )
}