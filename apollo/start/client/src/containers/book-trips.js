import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Button from '../components/button';
import { GET_LAUNCH } from './cart-item';
import { Loading } from '../components';

const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

/*

We can also perform direct writes within the update function of the useMutation hook.
The update function allows us to manually update the cache after a mutation 
occurs without refetching data. 

*/

export default function BookTrips({ cartItems }) {
  const [bookTrips, { data, loading, error }] = useMutation(BOOK_TRIPS, {
    refetchQueries: cartItems.map(launchId => ({
      query: GET_LAUNCH,
      variables: { launchId },
    })),
    update(cache) {
      cache.writeData({
        data: {
          cartItems: [],
        },
      });
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>THERE WAS ERROR: {error.message}</p>;
  }

  return data && data.bookTrips && !data.bookTrips.success ? (
    <p data-testid="message">{data.bookTrips.message}</p>
  ) : (
    <Button onClick={bookTrips} data-testid="book-button">
      Book All
    </Button>
  );
}
