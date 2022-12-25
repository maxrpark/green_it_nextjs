interface Link {
  id: number;
  name: string;
  url: string;
  protected?: boolean;
}

interface LinksSections {
  id: number;
  name: string;
  links: Link[];
}

export const userLinks: Link[] = [
  { id: 1, name: "orders", url: "" },
  { id: 2, name: "all products", url: "/dashboard/products", protected: true },
  { id: 3, name: "users", url: "/dashboard/users", protected: true },
  { id: 4, name: "settings", url: "/update-user" },
  { id: 5, name: "cart", url: "/cart" },
];

export default [
  { id: 1, name: "green it", links: [] },
  {
    id: 2,
    name: "pages",
    links: [
      { id: 6, name: "Products", url: "/products" },
      { id: 5, name: "Dashboard", url: "/" },
      { id: 1, name: "Home", url: "/" },
      { id: 2, name: "About", url: "/about" },
      { id: 3, name: "Contact", url: "/contact" },
      { id: 4, name: "Cart", url: "/cart" },
    ],
  },
  {
    id: 3,
    name: "Categories",
    links: [
      { id: 1, name: "Plants", url: "/products/category/plants" },
      { id: 2, name: "Decoration", url: "/products/category/decoration" },
      { id: 3, name: "Tools", url: "/products/category/tools" },
      { id: 4, name: "Care", url: "/products/category/care" },
      { id: 5, name: "Seeds", url: "/products/category/seeds" },
      { id: 6, name: "Pots", url: "/products/category/pots" },
      { id: 7, name: "more", url: "/products/category/more" },
    ],
  },
] as LinksSections[];
