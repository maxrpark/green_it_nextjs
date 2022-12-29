import styles from "./GridSection.module.css";
import sections from "../../utils/data/GridSectionData";
import Image from "next/image";
import Link from "next/link";

const GridSection: React.FC = () => {
  return (
    <div className='block md:grid overflow-hidden grid-cols-6 grid-rows-2 min-h-[50vh]'>
      <Link href={`/products/types/${sections[0].name.toLowerCase()}`}>
        <div
          className={`${styles.box} row-start-1 row-end-3 col-start-1 col-end-3`}
        >
          <span className={styles.img}>
            <Image
              className='-z-10'
              layout='fill'
              objectFit='cover'
              src={sections[0].img!}
              alt='flower'
            />
          </span>
          <h2 className={styles["section-name"]}>{sections[0].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[1].name.toLowerCase()}`}>
        <div
          className={`${styles.box} row-start-1 row-end-2 col-start-3 col-end-5`}
        >
          <span className={styles.img}>
            <Image
              objectFit='cover'
              layout='fill'
              src={sections[1].img!}
              alt='flower'
            />
          </span>
          <h2 className={styles["section-name"]}>{sections[1].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[2].name.toLowerCase()}`}>
        <div
          className={`${styles.box} row-start-2 row-end-3 col-start-3 col-end-6`}
        >
          <span className={styles.img}>
            <Image
              objectFit='cover'
              layout='fill'
              src={sections[2].img!}
              alt='flower'
            />
          </span>
          <h2 className={styles["section-name"]}>{sections[2].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[3].name.toLowerCase()}`}>
        <div className={styles.box}>
          <span className={styles.img}>
            <Image
              objectFit='cover'
              layout='fill'
              src={sections[3].img!}
              alt='flower'
            />
          </span>
          <h2 className={styles["section-name"]}>{sections[3].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[4].name.toLowerCase()}`}>
        <div className={`${styles.box} row-start-1 row-end-3`}>
          <span className={styles.img}>
            <Image
              objectFit='cover'
              layout='fill'
              src={sections[4].img!}
              alt='flower'
            />
          </span>
          <h2 className={styles["section-name"]}>{sections[4].name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default GridSection;
