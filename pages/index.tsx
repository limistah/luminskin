import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import PageHead from "../components/PageHead";
import ProductList, {
  IProductItem,
  IProductListProps,
} from "../components/ProductList";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useState } from "react";
import CartSidebar from "../components/CartSidebar";
import { ICartItem } from "../components/CartItem";

export interface IHomepageProps extends IProductListProps {
  currency: Array<string>;
}

export default function Home({ products, currency }: IHomepageProps) {
  const [currentCurrency, setCurrentCurrency] = useState<string>(
    currency[0] || "USD"
  );
  const [showCartSidebar, setShowCartSidebar] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<ICartItem>>([]);

  const handleAddProductToCart = (
    productDetails: IProductItem,
    selectedOptions: {}
  ) => {
    setShowCartSidebar(true);
    const existingIndex = cartItems.findIndex((item) => {
      return (
        item.product.id === productDetails.id &&
        Object.values(selectedOptions).join() === item?.options?.join()
      );
    });

    if (existingIndex > -1) {
      // Increment the cart count if the item exists
      const newCartItem = [...cartItems];
      const _cartItem = cartItems[existingIndex];
      newCartItem.splice(existingIndex, 1, {
        ..._cartItem,
        count: _cartItem.count + 1,
      });
      setCartItems(newCartItem);
    } else {
      // Push the item to the cart since the combination of the item and the product options does not exist already
      setCartItems((items) => [
        ...items,
        {
          product: productDetails,
          options: Object.values(selectedOptions),
          count: 1,
        },
      ]);
    }
  };

  const handleCloseCartSidebar = (show: boolean) => {
    setShowCartSidebar(show);
  };

  const handleUpdateItem = (item: ICartItem, index: number) => {
    const _cartItems = [...cartItems];
    _cartItems.splice(index, 1, item);
    setCartItems(_cartItems);
  };

  return (
    <Layout title={"Products"} description={"All products from Lumin"}>
      <>
        <CartSidebar
          show={showCartSidebar}
          onClose={handleCloseCartSidebar}
          cartDetails={cartItems}
          onUpdateItem={handleUpdateItem}
          currency={currentCurrency}
        />
        <PageHead />
        <ProductList
          products={products}
          currentCurrency={currentCurrency}
          onAddToCart={handleAddProductToCart}
        />
      </>
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
