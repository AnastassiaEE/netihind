import SectionLayout from "../../layouts/SectionLayout";
import Carousel from "../Carousel";

const posts = [
  {title: 'Iaculis nunc sed augue lacus1.', image: 'images/computer.jpg', alt: 'Computer with coffee', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus2.', image: 'images/computer.jpg', alt: 'Computer with coffee', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus3.', image: 'images/computer.jpg', alt: 'Computer with coffee', link: '', date: '05.04.2022'},
  {title: 'Iaculis nunc sed augue lacus4.', image: 'images/computer.jpg', alt: 'Computer with coffee', link: '', date: '05.04.2022'},
]

export default function BlogSection() {
    return (
        <SectionLayout bg="bg-neutral-light" paddings="py-24">
            <h2 className="text-4xl font-extrabold text-center mb-10"> Rhoncus est pellentesque </h2>
            <Carousel posts={posts}/>    
        </SectionLayout>
    )
}