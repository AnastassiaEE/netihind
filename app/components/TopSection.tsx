import AddressForm from './AddressForm';

export default function TopSection() {
    return(
        <section className="h-screen flex items-center bg-gradient-to-tl from-indigo-500/10 from-0% via-violet-500/10 via-20% via-fuchsia-500/10 to-70%">
            <div className="container">
                <div className="flex">
                    <div className="w-12/12">
                        <h1 className="text-5xl leading-snug font-extrabold mb-4"> Поиск <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">провайдеров</span> домашнего интернета по адресу </h1>
                        <p className="text-lg text-slate-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi non arcu risus quis varius quam quisque id diam.</p>
                        <AddressForm/>
                    </div>
                </div>
            </div> 
        </section>
    )
}