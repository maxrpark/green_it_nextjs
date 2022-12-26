import Head from "next/head";

interface Props {
  dsc: string;
  img: string;
  name: string;
}

const ProductHead: React.FC<Props> = ({ dsc, img, name }) => {
  return (
    <Head>
      <title>{name}</title>
      <meta name='description' content={dsc} />

      {/*<!-- Google / Search Engine Tags -->*/}
      <meta itemProp='name' content={name} />
      <meta itemProp='description' content={dsc} />
      <meta itemProp='image' content={img} />

      {/* facebook */}
      <meta property='og:title' content={name} />
      <meta property='og:description' content={`Take a look at ${name}`} />
      <meta property='og:image' content={img} />
      <meta name='description' content={dsc} />

      {/*<!-- Twitter Meta Tags -->*/}
      <meta name='twitter:title' content={name} />
      <meta name='twitter:description' content={`Take a look at ${name}`} />
      <meta name='twitter:image' content={img} />
      <meta name='twitter:card' content={dsc} />
    </Head>
  );
};

export default ProductHead;
