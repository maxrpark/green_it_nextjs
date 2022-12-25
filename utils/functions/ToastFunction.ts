import { toast } from "react-toastify";

type ToastType = "info" | "success" | "warning" | "error" | "default";
type PositionOptions =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

interface Params {
  id: string;
  message: string;
  position?: PositionOptions;
  type?: ToastType;
}
export const toastFunc = ({
  id,
  message,
  type = "success",
  position = "top-right",
}: Params) => {
  let r = (Math.random() + 1).toString(36).substring(7);

  return toast(message, {
    hideProgressBar: false,
    autoClose: 2000,
    type,
    toastId: id + r,
    position,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
