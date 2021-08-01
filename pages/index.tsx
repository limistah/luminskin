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
  currencyList: Array<string>;
  gqlClient: {};
  // gqlClient: Object<ApolloClient>;
}

export default function Home({
  products,
  currencyList,
  gqlClient,
}: IHomepageProps) {
  const [currentCurrency, setCurrentCurrency] = useState<string>(
    currencyList[0] || "USD"
  );
  const [storeProducts, setStoreProducts] =
    useState<Array<IProductItem>>(products);
  const [showCartSidebar, setShowCartSidebar] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<ICartItem>>([]);
  const [loadingState, setLoadingState] = useState<string>("");

  // Add new product to the cart or update an existing one
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

  /**
   * Close the cart sidebar, using the `show` state
   * @param show boolean
   */
  const handleCloseCartSidebar = (show: boolean) => {
    setShowCartSidebar(show);
  };

  /**
   * Change the value in a cart item
   * @param item A ICartItem for the update
   * @param index The index of the cart item to use for the update
   */
  const handleUpdateItem = (item: ICartItem, index: number) => {
    const _cartItems = [...cartItems];
    _cartItems.splice(index, 1, item);
    setCartItems(_cartItems);
  };

  /**
   * Remove an item from the cart
   * @param index The index of the item to remove
   */
  const handleRemoveItem = (index: number) => {
    const _cartItems = [...cartItems];
    _cartItems.splice(index, 1);

    // There is no need to keep the sidebar, remove it when there is no more item in the cart
    if (!_cartItems.length) {
      setShowCartSidebar(false);
    }
    setCartItems(_cartItems);
  };

  /**
   * Loads new pricelist for the new currency
   * @param currency A currency unit to use to query for new price
   */
  const handleCurrencyUpdatd = (currency: string) => {
    setLoadingState("Loading...");
    gqlClient
      // @ts-ignore
      .query({
        query: gql`
          query Products($currency: Currency!) {
            products {
              id
              price(currency: $currency)
            }
          }
        `,
        variables: { currency },
      })
      .then(
        ({
          data,
          error,
        }: {
          data: { products: Array<IProductItem> };
          error: string;
        }) => {
          updateProductList(data.products);
          updateCartItems(data.products);
          setCurrentCurrency(currency);
          setLoadingState("");
          if (error) {
            setLoadingState("An error occurred");
          }
        }
      )
      .catch((_: any) => {
        setLoadingState(`Error: ${_.message}`);
      });
  };

  const updateProductList = (productList: Array<IProductItem>) => {
    const updatedProductList = products.map((product) => {
      const updatedProduct = productList.find((p) => product.id === p.id);
      return {
        ...product,
        ...updatedProduct,
      };
    });
    setStoreProducts(updatedProductList);
  };

  const updateCartItems = (productList: Array<IProductItem>) => {
    const updatedCartItems = cartItems.map((cartItem: ICartItem) => {
      const updatedCartItemProduct = productList.find(
        (p) => cartItem.product.id === p.id
      );
      return {
        ...cartItem,
        product: {
          ...cartItem.product,
          ...updatedCartItemProduct,
        },
      };
    });
    setCartItems(updatedCartItems);
  };

  return (
    <Layout title={"Products"} description={"All products from Lumin"}>
      <>
        <CartSidebar
          show={showCartSidebar}
          onClose={handleCloseCartSidebar}
          cartDetails={cartItems}
          onUpdateItem={handleUpdateItem}
          onRemoveItem={handleRemoveItem}
          onCurrencyUpdated={handleCurrencyUpdatd}
          currency={currentCurrency}
          currencyList={currencyList}
          loadingState={loadingState}
        />
        <PageHead />
        <ProductList
          products={storeProducts}
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
      currencyList: data.currency,
    },
  };
}
