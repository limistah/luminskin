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

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://pangaea-interviews.now.sh/api/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} gqlClient={client} />{" "}
    </ApolloProvider>
  );
}
export default MyApp;
