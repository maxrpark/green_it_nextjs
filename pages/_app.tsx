import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainLayout } from "../components/layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  ProductsProvider,
  CartProvider,
  AuthContextProvider,
  AdminProvider,
  GlobalProvider,
} from "../contexts/";
interface Props {
  children: any;
}

const AppState: React.FC<Props> = ({ children }) => {
  return (
    <AuthContextProvider>
      <GlobalProvider>
        <ProductsProvider>
          <AdminProvider>
            <CartProvider>
              <MainLayout>{children}</MainLayout>
            </CartProvider>
          </AdminProvider>
        </ProductsProvider>
      </GlobalProvider>
    </AuthContextProvider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppState>
      <Component {...pageProps} />
      <ToastContainer theme='colored' newestOnTop={true} />
    </AppState>
  );
}

export default MyApp;
