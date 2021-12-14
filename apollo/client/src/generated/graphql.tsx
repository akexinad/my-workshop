import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Launch = {
  __typename?: 'Launch';
  id: Scalars['ID'];
  isBooked: Scalars['Boolean'];
  mission?: Maybe<Mission>;
  rocket?: Maybe<Rocket>;
  site?: Maybe<Scalars['String']>;
};

/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type LaunchConnection = {
  __typename?: 'LaunchConnection';
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  launches: Array<Maybe<Launch>>;
};

export type Mission = {
  __typename?: 'Mission';
  missionPatch?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type MissionMissionPatchArgs = {
  size?: Maybe<PatchSize>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookTrips: TripUpdateResponse;
  cancelTrip: TripUpdateResponse;
  login?: Maybe<User>;
};


export type MutationBookTripsArgs = {
  launchIds: Array<Maybe<Scalars['ID']>>;
};


export type MutationCancelTripArgs = {
  launchId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
};

export enum PatchSize {
  Large = 'LARGE',
  Small = 'SMALL'
}

export type Query = {
  __typename?: 'Query';
  launch?: Maybe<Launch>;
  launches: LaunchConnection;
  me?: Maybe<User>;
};


export type QueryLaunchArgs = {
  id: Scalars['ID'];
};


export type QueryLaunchesArgs = {
  after?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type Rocket = {
  __typename?: 'Rocket';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type TripUpdateResponse = {
  __typename?: 'TripUpdateResponse';
  launches?: Maybe<Array<Maybe<Launch>>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  token?: Maybe<Scalars['String']>;
  trips: Array<Maybe<Launch>>;
};

export type LaunchTileFragment = { __typename: 'Launch', id: string, isBooked: boolean, rocket?: Maybe<{ __typename?: 'Rocket', id: string, name?: Maybe<string> }>, mission?: Maybe<{ __typename?: 'Mission', name?: Maybe<string>, missionPatch?: Maybe<string> }> };

export type GetLaunchListQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
}>;


export type GetLaunchListQuery = { __typename?: 'Query', launches: { __typename?: 'LaunchConnection', cursor: string, hasMore: boolean, launches: Array<Maybe<{ __typename: 'Launch', id: string, isBooked: boolean, rocket?: Maybe<{ __typename?: 'Rocket', id: string, name?: Maybe<string> }>, mission?: Maybe<{ __typename?: 'Mission', name?: Maybe<string>, missionPatch?: Maybe<string> }> }>> } };

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', launch?: Maybe<{ __typename?: 'Launch', id: string, mission?: Maybe<{ __typename?: 'Mission', name?: Maybe<string> }> }> };

export const LaunchTileFragmentDoc = gql`
    fragment LaunchTile on Launch {
  __typename
  id
  isBooked
  rocket {
    id
    name
  }
  mission {
    name
    missionPatch
  }
}
    `;
export const GetLaunchListDocument = gql`
    query GetLaunchList($after: String) {
  launches(after: $after) {
    cursor
    hasMore
    launches {
      ...LaunchTile
    }
  }
}
    ${LaunchTileFragmentDoc}`;

/**
 * __useGetLaunchListQuery__
 *
 * To run a query within a React component, call `useGetLaunchListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLaunchListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLaunchListQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetLaunchListQuery(baseOptions?: Apollo.QueryHookOptions<GetLaunchListQuery, GetLaunchListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLaunchListQuery, GetLaunchListQueryVariables>(GetLaunchListDocument, options);
      }
export function useGetLaunchListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLaunchListQuery, GetLaunchListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLaunchListQuery, GetLaunchListQueryVariables>(GetLaunchListDocument, options);
        }
export type GetLaunchListQueryHookResult = ReturnType<typeof useGetLaunchListQuery>;
export type GetLaunchListLazyQueryHookResult = ReturnType<typeof useGetLaunchListLazyQuery>;
export type GetLaunchListQueryResult = Apollo.QueryResult<GetLaunchListQuery, GetLaunchListQueryVariables>;
export const TestDocument = gql`
    query Test {
  launch(id: 56) {
    id
    mission {
      name
    }
  }
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
      }
export function useTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;