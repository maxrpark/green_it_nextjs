import { NextPage } from "next";
import {
  BreadCrumbs,
  SectionTitle,
  ImageSection,
  AboutDetails,
  AboutGallery,
} from "../components";
import * as data from "../utils/data/About";

const About: NextPage = () => {
  const { topSection, ImageSectionData, sectionBottom, sectionCenter } = data;

  return (
    <div className='container m-auto mb-20'>
      <BreadCrumbs />
      <h1 className='main-title text-center !mb-16 text-[56px] font-bold '>
        About
      </h1>
      <div className='max-w-[986px] m-auto'>
        <SectionTitle
          title={topSection.sectionTitle.title}
          text={topSection.sectionTitle.text}
        />
        <div className='flex flex-col gap-20'>
          <ImageSection {...ImageSectionData} />
          <AboutDetails {...sectionCenter} />
          <AboutGallery {...sectionBottom} />
        </div>
      </div>
    </div>
  );
};

export default About;
