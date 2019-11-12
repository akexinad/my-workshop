import React, { Fragment } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

import { Header, Loading } from "../components";
import { CartItem, BookTrips } from "../containers";

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default function Cart() {
  const {data, loading, error} = useQuery(GET_CART_ITEMS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>THERE WAS ERROR: { error.message }</p>
  }
  
  return (
    <Fragment>
      <Header>My Cart</Header>
      { !data.cartItems || !data.cartItems.length ? (
        <p data-test-id="empty-message">No Items In Your Cart</p>
      ) : (
        <Fragment>
          { data.cartItems.map(launchId => (
            <CartItem
              key={ launchId }
              launchId={ launchId }
            />
          )) }
          <BookTrips cartItems={ data.cartItems } />
        </Fragment>
      ) }
    </Fragment>
  );
}
