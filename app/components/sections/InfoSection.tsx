import SectionLayout from "../../layouts/SectionLayout"

export default function InfoSection() {
    return (
        <SectionLayout
            bg="bg-white"> 
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-6/12">
                        <h2 className="text-4xl font-extrabold mb-6"> Rhoncus est pellentesque </h2>
                        <div className="text-slate-600 text-base">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p>Faucibus turpis in eu mi bibendum neque egestas. Integer quis auctor elit sed vulputate. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Habitant morbi tristique senectus et. Sed risus pretium quam vulputate dignissim suspendisse.</p>
                            <p>Ut faucibus pulvinar elementum integer enim. Euismod lacinia at quis risus sed vulputate.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed pulvinar proin gravida. </p>
                        </div>
                    </div>
                    <div className="md:w-5/12">
                        <div className="relative">
                            <img src="/man.png" alt="" className="relative z-10 w-full"/>
                            <div className="bg-gradient-to-br from-indigo-500 from-10% via-violet-500 to-fuchsia-500 to-60% rounded-3xl absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[90%]">
                            </div>
                            <div className="bg-gradient-to-tl from-indigo-500 from-10% via-violet-500 to-fuchsia-500 to-80% rounded-full absolute right-0 sm:right-3 md:right-0 xl:right-2 2xl:right-3 top-1/4 z-10 w-8 h-8"></div>
                            <div className="bg-gradient-to-br from-indigo-500 from-10% via-violet-500 to-fuchsia-500 to-65% rounded-full absolute -left-1 md:-left-6 top-3/4 z-10 w-4 h-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}