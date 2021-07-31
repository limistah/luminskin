import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/300-italic.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/400-italic.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/500-italic.css";
import "@fontsource/work-sans/700.css";
import "@fontsource/work-sans/700-italic.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
