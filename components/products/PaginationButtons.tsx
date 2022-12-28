import { useProductsContext } from "../../contexts";

interface Props {
  paginationFunction: (newPageNum: number) => void;
}

const PaginationButtons: React.FC<Props> = ({ paginationFunction }) => {
  const { numberOfPages, products, currentPage } = useProductsContext();

  const handleClick = (action: string) => {
    let newPageNum = action === "prev" ? currentPage - 1 : currentPage + 1;
    paginationFunction(newPageNum);
  };

  const pages = Array.from({ length: numberOfPages }, (_, idx) => {
    return idx + 1;
  });
  return (
    <div className='w-full flex justify-center gap-11 my-16'>
      <button
        className={`${currentPage == 1 && "opacity-50"}`}
        disabled={currentPage == 1}
        onClick={() => handleClick("prev")}
      >
        Prev
      </button>
      <div>
        {pages.map((pageNum) => {
          return (
            <button
              key={pageNum}
              className={`${
                pageNum == currentPage && "text-green-500 border-green-500"
              }  px-2 text-[17px] border-t-2 font-bold`}
              onClick={() => paginationFunction(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        className={`${currentPage == numberOfPages && "opacity-50"}`}
        disabled={currentPage == numberOfPages}
        onClick={() => handleClick("next")}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
