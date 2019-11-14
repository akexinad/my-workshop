import React ,{ Fragment } from 'react';
import gql from "graphql-tag";

export const GET_LAUNCH = gql`
  query GetLaunchById($id: ID!) {
    launch(id: $id) {
      id
      mission {
        name
      }
    }
  }
`;

export default function CartItem({ launchId }) {
  return (
    <Fragment>
      { launchId }
    </Fragment>
  )
}
