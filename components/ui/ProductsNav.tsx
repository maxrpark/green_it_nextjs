import Link from "next/link";
import { useProductsContext } from "../../contexts";
import styles from "../dashboard/Sidebar.module.css";
import { useRouter } from "next/router";
const ProductsNav: React.FC = () => {
  const { categories } = useProductsContext();
  const router = useRouter();
  return (
    <div className='flex flex-col gap-2 text-center py-5'>
      {categories.map((link) => {
        const linkPath =
          link === "all" ? `/products` : `/products/category/${link}`;
        const url = link === "all" ? "/products/" : linkPath;
        return (
          <Link key={link} href={url}>
            <button
              className={`${styles["sidebar-links"]} ${
                router.asPath == linkPath ? styles.active : ""
              }`}
            >
              {link}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsNav;
