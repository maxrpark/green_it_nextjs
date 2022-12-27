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
import Head from "next/head";
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
    <>
      <Head>
        <title>Green it</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <meta property='og:title' content='Green it' />
        <meta
          property='og:description'
          content={`The middle point between you and your dream garden`}
        />
        <meta property='og:image' content='/static/img/hero/hero_one.jpg' />
        <meta
          name='description'
          content={`The middle point between you and your dream garden`}
        />
      </Head>
      <AppState>
        <Component {...pageProps} />
        <ToastContainer theme='colored' newestOnTop={true} />
      </AppState>
    </>
  );
}

export default MyApp;
