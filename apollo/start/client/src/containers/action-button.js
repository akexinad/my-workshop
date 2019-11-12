import React from 'react';
import gql from "graph-ql";

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $$launchId) @client
  }
`;

export default function ActionButton() {
  return <div />;
}

