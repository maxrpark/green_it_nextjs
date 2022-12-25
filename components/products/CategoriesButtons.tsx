import { useProductsContext } from "../../contexts";

const CategoriesButtons: React.FC = () => {
  const {
    categories,
    filters: { category: selectedCategory },
    updateFilters,
  } = useProductsContext();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    let name = target.name;
    let value = target.value;
    updateFilters({ name, value });
  };
  return (
    <div>
      <div className='grid grid-cols-2 gap-2'>
        {categories.map((category) => {
          return (
            <button
              key={category}
              className={`category-buttons ${category.toLowerCase()} bg-green-200 h-11 w-full ${
                category === selectedCategory &&
                "!bg-transparent border-current border"
              }`}
              onClick={handleClick}
              name='category'
              value={category}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesButtons;
