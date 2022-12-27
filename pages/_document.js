import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#1F2937" />
        <meta name="msapplication-navbutton-color" content="#1F2937" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#1F2937" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
