import * as Types from '../../__generated__/global-graph-types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetSparkQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSparkQuery = { __typename?: 'Query', sparks: Array<{ __typename?: 'Spark', id: string, doc: string, tags: string, createdAt: any, updatedAt: any }> };


export const GetSparkDocument = gql`
    query getSpark {
  sparks {
    id
    doc
    tags
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetSparkQuery__
 *
 * To run a query within a React component, call `useGetSparkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSparkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSparkQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSparkQuery(baseOptions?: Apollo.QueryHookOptions<GetSparkQuery, GetSparkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSparkQuery, GetSparkQueryVariables>(GetSparkDocument, options);
      }
export function useGetSparkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSparkQuery, GetSparkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSparkQuery, GetSparkQueryVariables>(GetSparkDocument, options);
        }
export type GetSparkQueryHookResult = ReturnType<typeof useGetSparkQuery>;
export type GetSparkLazyQueryHookResult = ReturnType<typeof useGetSparkLazyQuery>;
export type GetSparkQueryResult = Apollo.QueryResult<GetSparkQuery, GetSparkQueryVariables>;