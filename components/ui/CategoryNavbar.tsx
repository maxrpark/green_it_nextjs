import Link from "next/link";
import Links from "../../utils/data/Links";
import styles from "./CategoryNavbar.module.css";

const CategoryNavbar: React.FC = () => {
  return (
    <section className='hidden lg:grid xl:grid md:grid-cols-2 lg:grid-cols-7'>
      {Links[2].links.map((link) => {
        return (
          <Link
            href={`/products/category/${link.name.toLowerCase()}`}
            key={link.id}
          >
            <a
              className={`${styles["category-buttons"]} ${
                styles[link.name.toLowerCase()]
              } `}
              key={link.id}
            >
              {link.name}
            </a>
          </Link>
        );
      })}
    </section>
  );
};

export default CategoryNavbar;
