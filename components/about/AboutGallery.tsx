import { SectionTitle } from "..";
import { SectionTitleInt, sectionDetailsInt } from "../../ts";
import Image from "next/image";

interface Props {
  sectionTitle: SectionTitleInt;
  details: sectionDetailsInt[];
}
const AboutGallery: React.FC<Props> = ({ sectionTitle, details }) => {
  return (
    <section>
      <SectionTitle title={sectionTitle.title} text={sectionTitle.text} />
      <div className='grid gap-5 grid-cols-1 xl:grid md:grid-cols-2 lg:grid-cols-4'>
        {details.map((item) => {
          return (
            <div
              key={item.id}
              className='w-full min-h-[250px] lg:h-[350px] relative'
            >
              <Image
                src={item.img!}
                className=''
                layout='fill'
                objectFit='cover'
                alt={item.title}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutGallery;
