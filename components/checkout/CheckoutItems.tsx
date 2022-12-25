import { SingleItemOrderInf } from "../../ts/";
interface Props {
  orderItems: SingleItemOrderInf[];
}

const CheckoutItems: React.FC<Props> = ({ orderItems }) => {
  return (
    <section className='flex flex-col gap-2'>
      {orderItems.map((item) => {
        return (
          <div key={item.name}>
            <div className='flex my-2 gap-2'>
              <img
                className='w-[59px] h-[59px] object-cover'
                src={item.image}
                alt=''
              />
              <div className='flex flex-col justify-between'>
                <p className='text-[12px]'>{item.name}</p>
                <div>
                  <p className='text-[10px] text-light-gray leading-3'>
                    Price: ${item.price}
                  </p>
                  <p className='text-[10px] text-light-gray leading-3'>
                    Amount {item.amount}
                  </p>
                  <p className='text-[10px] text-light-gray leading-3'>
                    Subtotal: ${item.amount * item.price}
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full h-[1px] bg-light-gray'></div>
          </div>
        );
      })}
    </section>
  );
};

export default CheckoutItems;
