import styles from "./Hero.module.css";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className={styles["hero-wrapper"]}>
      <div className={styles["img-container"]}>
        <figure className=''>
          <Image src='/img/hero/hero_one.jpg' layout='fill'></Image>
        </figure>
      </div>
      <div className={styles["text-container"]}>
        <div>
          <h2 className='text-2xl font-bold'>
            Lorem ipsum dolor <br /> sit amet, consectetur adipiscing.
          </h2>
          <div className='btn-primary mt-[22px]'>Read More</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
