import gql from 'graphql-tag';
import { GET_CART_ITEMS } from './pages/cart';

/*

EXTENDING THE SCHEMA
====================

In our client schema, we extend the types of our server schema and wrap it with gql function.
Using the extend keyword allows us to combine both schemas inside devloper tooling.

*/

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

/*

VIRTUAL FIELDS
==============

One of the unique advantages of managing your local data with Apollo Client is that you can add 
VIRTUAL FIELDS you recieve back from your graph API. These fields only exist on the client 
and are useful for decorating server data with local state.

*/

// EXAMPLE OF VIRTUAL FIELDS
export const schema = gql`
  extend type Launch {
    isInCart: Boolean!
  }
`;

/*

Local resolvers have the same function as remote resolvers. The only difference is that the Apollo cache
 is already added to the context for you. Inside your resolverm you'll use the cache to read and write the
 data.

*/

export const resolvers = {
  Launch: {
    isInCart: (launch, _, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      return cartItems.includes(launch.id);
    },
  },

  Mutation: {
    addOrRemoveFromCart: (_, { id }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const data = {
        cartItems: cartItems.includes(id)
          ? cartItems.filter(i => i !== id)
          : [...cartItems, id],
      };

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data,
      });

      return data.cartItems;
    },
  },
};
