import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import ProductList, { IProductListProps } from "../components/ProductList";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useState } from "react";

export interface IHomepageProps extends IProductListProps {
  currency: Array<string>;
}

export default function Home({ products, currency }: IHomepageProps) {
  const [currentCurrency, setCurrentCurrency] = useState(currency[0] || "USD");

  return (
    <Layout title={"Products"} description={"All products from Lumin"}>
      <ProductList products={products} currentCurrency={currentCurrency} />
    </Layout>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://pangaea-interviews.now.sh/api/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        currency
        products {
          title
          price(currency: USD)
          product_options {
            prefix
            suffix
            title
            options {
              id
              value
            }
          }
          id
          image_url
        }
      }
    `,
  });

  return {
    props: {
      products: data.products,
      currency: data.currency,
    },
  };
}
