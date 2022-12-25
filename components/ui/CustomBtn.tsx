import Link from "next/link";
interface Props {
  path: string;
  text?: string;
}
const CustomBtn: React.FC<Props> = ({ path, text = "Go Back" }) => {
  return (
    <Link href={path}>
      <button className='btn-primary mb-4 capitalize !block'>{text}</button>
    </Link>
  );
};

export default CustomBtn;
