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
          <Image
            className='-z-10'
            layout='fill'
            objectFit='cover'
            src={sections[0].img!}
          />
          <h2 className={styles["section-name"]}>{sections[0].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[1].name.toLowerCase()}`}>
        <div
          className={`${styles.box} row-start-1 row-end-2 col-start-3 col-end-5`}
        >
          <Image objectFit='cover' layout='fill' src={sections[1].img!} />
          <h2 className={styles["section-name"]}>{sections[1].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[2].name.toLowerCase()}`}>
        <div
          className={`${styles.box} row-start-2 row-end-3 col-start-3 col-end-6`}
        >
          <Image objectFit='cover' layout='fill' src={sections[2].img!} />
          <h2 className={styles["section-name"]}>{sections[2].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[3].name.toLowerCase()}`}>
        <div className={styles.box}>
          <Image objectFit='cover' layout='fill' src={sections[3].img!} />
          <h2 className={styles["section-name"]}>{sections[3].name}</h2>
        </div>
      </Link>
      <Link href={`/products/types/${sections[4].name.toLowerCase()}`}>
        <div className={`${styles.box} row-start-1 row-end-3`}>
          <Image objectFit='cover' layout='fill' src={sections[4].img!} />
          <h2 className={styles["section-name"]}>{sections[4].name}</h2>
        </div>
      </Link>
    </div>
  );
};

export default GridSection;
