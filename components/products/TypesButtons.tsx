import { useProductsContext } from "../../contexts";

const TypesButtons: React.FC = () => {
  const {
    types,
    filters: { type: selectedType },
    updateFilters,
  } = useProductsContext();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    let name = target.name;
    let value = target.value;
    updateFilters({ name, value });
  };
  return (
    <div className='flex flex-wrap justify-center md:flex-col md:justify-start md:gap-1'>
      {types.map((type) => {
        return (
          <button
            key={type}
            className={`text-green-500 capitalize border-green-500 py-1 px-2 text-[17px] md:border ${
              type == selectedType && "bg-green-500 text-white transition-all"
            }`}
            onClick={handleClick}
            name='type'
            value={type}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
};

export default TypesButtons;
