import Image from "next/image";
import { SectionTitle } from "..";
import { SectionTitleInt, sectionDetailsInt } from "../../ts";

interface Props {
  sectionTitle: SectionTitleInt;
  details: sectionDetailsInt[];
}
const AboutDetails: React.FC<Props> = ({ sectionTitle, details }) => {
  return (
    <section>
      <SectionTitle title={sectionTitle.title} text={sectionTitle.text} />
      <div className='flex flex-col gap-[26px]'>
        {details.map((item) => {
          return (
            <div
              key={item.id}
              className='flex justify-start items-center gap-8 max-w-2xl px-4 py-4'
            >
              <div className=' w-[100px] h-[100px] rounded-full object-cover relative overflow-hidden'>
                <Image src={item.img!} layout='fill' objectFit='cover' />
              </div>
              <div className='flex flex-col gap-2 self-start justify-between'>
                <h3 className='bold text-2xl'>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutDetails;
