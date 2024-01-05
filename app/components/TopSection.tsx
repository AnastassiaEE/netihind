import styles from '../styles/TopSection.module.css';
import classNames from 'classnames';
import AddressForm from './AddressForm';
//import { AddressProvider } from '../contexts/AddressContext';

export default function TopSection() {
    return(
        <section className={classNames(styles["top-section"], "h-screen", "flex", "items-center")}>
            <div className="container">
                <div className="flex justify-center">
                    <div className="lg:w-10/12">
                        <h1 className="title mb-4"> Поиск <span className="text-highlighted">провайдеров</span> домашнего интернета по адресу </h1>
                        <p className="text mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi non arcu risus quis varius quam quisque id diam.</p>
                        
                            <AddressForm/>
                        
                    </div>
                </div>
            </div>
            
                
        </section>
    )
}