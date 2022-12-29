import { useRef, useEffect } from "react";
import { ProductCard } from "..";
import { ProductInterface } from "../../ts/";
const { gsap } = require("gsap/dist/gsap");
const { Draggable } = require("gsap/dist/Draggable");
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface Props {
  products: ProductInterface[];
}

const ProductsCarrousel: React.FC<Props> = ({ products }) => {
  const mainContainer = useRef<HTMLDivElement[]>([]);
  const carrouselWrapper = useRef<HTMLDivElement[]>([]);
  const dragIndicators = useRef<HTMLDivElement[]>([]);

  const addToRef = (el: HTMLDivElement) => {
    if (el && !carrouselWrapper.current.includes(el)) {
      carrouselWrapper.current.push(el);
    }
  };
  const addMainContainerToRef = (el: HTMLDivElement) => {
    if (el && !mainContainer.current.includes(el)) {
      mainContainer.current.push(el);
    }
  };
  const addCirclesToRef = (el: HTMLDivElement) => {
    if (el && !dragIndicators.current.includes(el)) {
      dragIndicators.current.push(el);
    }
  };

  const draggableCarrousel = () => {
    carrouselWrapper.current.forEach((section, idx) => {
      let containerWidth = mainContainer.current![idx].offsetWidth;
      let sectionWidth = section.offsetWidth;
      let min = sectionWidth - containerWidth;
      Draggable.create(section, {
        type: "x",
        bounds: { minX: -min, maxX: 0 },
        onDragStart: () => {
          dragIndicators.current.forEach((el, index) => {
            el.style.visibility = "visible";
            if (idx === index) {
              console.log(dragIndicators.current[idx]);

              el.style.visibility = "hidden";
            }
          });
        },
      });
    });
  };

  useEffect(() => {
    window.addEventListener("resize", draggableCarrousel);
    return () => window.removeEventListener("resize", draggableCarrousel);
  });

  useEffect(() => {
    draggableCarrousel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainContainer.current]);
  return (
    <div ref={addMainContainerToRef} className='container relative lg:w-fit'>
      <div ref={addCirclesToRef} className='drag-indicator'>
        <p className=''>Drag</p>
      </div>
      <div ref={addToRef} className={`flex gap-6 w-max   `}>
        {products.map((product: ProductInterface) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductsCarrousel;
