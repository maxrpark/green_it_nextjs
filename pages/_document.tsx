import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        {/* <Head /> */}
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
