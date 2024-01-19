import AddressForm from './AddressForm';

export default function TopSection() {
    return(
        <section className="h-screen flex items-center bg-gradient-to-tl from-indigo-500/30 from-0% via-violet-500/20 via-42% via-fuchsia-500/10 to-82%">
            <div className="container">
                <div className="flex justify-center">
                    <div className="lg:w-10/12">
                        <h1 className="text-5xl font-extrabold mb-4"> Поиск <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">провайдеров</span> домашнего интернета по адресу </h1>
                        <p className="text-lg text-slate-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi non arcu risus quis varius quam quisque id diam.</p>
                        <AddressForm/>
                    </div>
                </div>
            </div>
            
                
        </section>
    )
}