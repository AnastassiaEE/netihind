import AddressForm from '../ui/form/AddressForm';
import MeshSvg from '../ui/MeshSvg';

export default function TopSection() {
    return(
        <section className="md:h-screen max-md:h-[calc(100dvh)] max-md:flex max-md:items-center md:pt-28 bg-gradient-to-t from-primary/20 from-0% via-secondary/10 via-40% via-accent/10 to-80%">
            <div className="absolute right-0 max-md:top-[80px] bottom-[50px] -z-10 w-[230px] md:w-[500px] h-auto">
                <MeshSvg>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" > 
                        <stop offset="0%" stopColor="#a5b4fc">
                            <animate attributeName="stop-color" values="#a5b4fc; #ddd6fe; #f5d0fe; #a5b4fc" dur="4s" repeatCount="indefinite"></animate>
                        </stop>
                        <stop offset="50%" stopColor="#ddd6fe">
                            <animate attributeName="stop-color" values="#ddd6fe; #f5d0fe; #a5b4fc; #ddd6fe" dur="4s" repeatCount="indefinite"></animate>
                        </stop>
                        <stop offset="100%" stopColor="#f5d0fe">
                            <animate attributeName="stop-color" values="#f5d0fe; #a5b4fc; #ddd6fe; #f5d0fe" dur="4s" repeatCount="indefinite"></animate>
                        </stop>
                    </linearGradient> 
                </MeshSvg>
            </div>
            <div className="container md:relative md:top-1/4">
                <div className="lg:w-9/12">
                    <h1 className="text-5xl leading-snug font-extrabold mb-4"> Поиск <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">провайдеров</span> домашнего интернета по адресу </h1>
                    <p className="text-lg text-muted-dark mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi non arcu risus quis varius quam quisque id diam.</p>
                    <AddressForm/>
                </div>
            </div> 
        </section>
    )
}