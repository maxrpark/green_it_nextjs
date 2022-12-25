import SeparatorIcon from "../icons/SeparatorIcon";
import { useRouter } from "next/router";

const steps = [
  { id: 1, name: "cart", path: "cart" },
  { id: 2, name: "checkout", path: "checkout" },
  { id: 3, name: "order completed", path: "order-completed" },
];

const Steps: React.FC = () => {
  const router = useRouter();

  let pathBaseName = router.pathname.split("/")[1];

  return (
    <div className='flex items-center justify-between max-w-[400px] m-auto my-8 gap-3 md:gap-8'>
      {steps.map((step) => {
        return (
          <div
            key={step.id}
            className={`flex items-center justify-center flex-wrap gap-2 border border-green-200 p-[5px]  rounded-[10px] ${
              pathBaseName == step.path && "bg-green-200 border-0"
            }`}
          >
            {step.name} <SeparatorIcon />
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
