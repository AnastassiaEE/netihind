import SectionLayout from "../layouts/SectionLayout"

export default function InfoSection() {
    return (
        <SectionLayout
            bg="bg-white"> 
            <div className="container">
                <h2 className="text-4xl font-extrabold text-center mb-10"> Rhoncus est pellentesque </h2>
                <div className="flex items-center justify-between">
                    <div className="md:w-6/12">
                            <div className="text-slate-600 text-base">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <p>Faucibus turpis in eu mi bibendum neque egestas. Integer quis auctor elit sed vulputate. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Habitant morbi tristique senectus et. Sed risus pretium quam vulputate dignissim suspendisse.</p>
                                <p>Ut faucibus pulvinar elementum integer enim. Euismod lacinia at quis risus sed vulputate.</p>
                                <p>Ut faucibus pulvinar elementum integer enim. Euismod lacinia at quis risus sed vulputate.</p>
                                <p>Ut faucibus pulvinar elementum integer enim. Euismod lacinia at quis risus sed vulputate.</p>
                                <p>Ut faucibus pulvinar elementum integer enim. Euismod lacinia at quis risus sed vulputate.</p>
                            </div>
                    </div>
                    <div className="md:w-5/12">
                        <div className="relative">
                            <img src="/man.png" alt="" className="relative z-10 w-full"/>
                            <div className="bg-gradient-to-br from-indigo-500/40 from-10% via-violet-500/40 to-fuchsia-500/40 to-60% rounded-3xl absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[95%]">
                                <div className="absolute rounded-full bg-red-500 top-20 w-3 h-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}