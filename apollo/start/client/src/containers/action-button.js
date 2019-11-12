/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';
import { Loading } from '../components';
/*

We need to add the @client directive to tell Apollo to resolve this mutation
from the cache instead of a remote server.

*/

const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export default function ActionButton({ isBooked, id, isInCart }) {

  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: {
        launch: id,
      },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: {
            launchId: id,
          }
        },
      ],
    }
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>THERE WAS ERROR: {error.message}</p>;
  }


  return (
    <div>
      <Button
        onClick={mutate}
        isBooked={isBooked}
        data-testid={"action-button"}
      >
        {
          isBooked
            ? 'Cancel This Trip'
            : isInCart
            ? 'Remove from Cart'
            : 'Add To Cart'
        }
      </Button>
    </div>
  )
}
