import { DefaultSeo } from "next-seo";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import SEO from "../next-seo.config";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || []; 
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID});
        `}
      </Script>
      <Layout>
        <NextNProgress
          color="#0096C7"
          height={3}
          options={{ showSpinner: false }}
        />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
