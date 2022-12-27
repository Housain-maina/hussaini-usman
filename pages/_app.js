import { DefaultSeo } from "next-seo";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import SEO from "../next-seo.config";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <NextNProgress
        color="#0096C7"
        height={3}
        options={{ showSpinner: false }}
      />
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}
