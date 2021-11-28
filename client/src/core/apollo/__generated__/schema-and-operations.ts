import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type DeleteSparkPayload = {
  __typename?: 'DeleteSparkPayload';
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSpark: Spark;
  deleteSpark: DeleteSparkPayload;
};


export type MutationCreateSparkArgs = {
  input: SparkCreateInput;
};


export type MutationDeleteSparkArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  sparks: Array<Spark>;
};

export type Spark = {
  __typename?: 'Spark';
  createdAt: Scalars['DateTime'];
  doc?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type SparkCreateInput = {
  doc: Scalars['String'];
};

export type GenericSparkFragment = { __typename?: 'Spark', id: string, doc?: string | null | undefined, tags?: string | null | undefined, createdAt: any, updatedAt: any };

export type CreateSparkMutationVariables = Exact<{
  input: SparkCreateInput;
}>;


export type CreateSparkMutation = { __typename?: 'Mutation', createSpark: { __typename?: 'Spark', id: string, doc?: string | null | undefined, tags?: string | null | undefined, createdAt: any, updatedAt: any } };

export type DeleteSparkMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSparkMutation = { __typename?: 'Mutation', deleteSpark: { __typename?: 'DeleteSparkPayload', id: string } };

export type GetSparksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSparksQuery = { __typename?: 'Query', sparks: Array<{ __typename?: 'Spark', id: string, doc?: string | null | undefined, tags?: string | null | undefined, createdAt: any, updatedAt: any }> };

export const GenericSparkFragmentDoc = gql`
    fragment GenericSpark on Spark {
  id
  doc
  tags
  createdAt
  updatedAt
}
    `;
export const CreateSparkDocument = gql`
    mutation createSpark($input: SparkCreateInput!) {
  createSpark(input: $input) {
    ...GenericSpark
  }
}
    ${GenericSparkFragmentDoc}`;
export type CreateSparkMutationFn = Apollo.MutationFunction<CreateSparkMutation, CreateSparkMutationVariables>;

/**
 * __useCreateSparkMutation__
 *
 * To run a mutation, you first call `useCreateSparkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSparkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSparkMutation, { data, loading, error }] = useCreateSparkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSparkMutation(baseOptions?: Apollo.MutationHookOptions<CreateSparkMutation, CreateSparkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSparkMutation, CreateSparkMutationVariables>(CreateSparkDocument, options);
      }
export type CreateSparkMutationHookResult = ReturnType<typeof useCreateSparkMutation>;
export type CreateSparkMutationResult = Apollo.MutationResult<CreateSparkMutation>;
export type CreateSparkMutationOptions = Apollo.BaseMutationOptions<CreateSparkMutation, CreateSparkMutationVariables>;
export const DeleteSparkDocument = gql`
    mutation deleteSpark($id: ID!) {
  deleteSpark(id: $id) {
    id
  }
}
    `;
export type DeleteSparkMutationFn = Apollo.MutationFunction<DeleteSparkMutation, DeleteSparkMutationVariables>;

/**
 * __useDeleteSparkMutation__
 *
 * To run a mutation, you first call `useDeleteSparkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSparkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSparkMutation, { data, loading, error }] = useDeleteSparkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSparkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSparkMutation, DeleteSparkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSparkMutation, DeleteSparkMutationVariables>(DeleteSparkDocument, options);
      }
export type DeleteSparkMutationHookResult = ReturnType<typeof useDeleteSparkMutation>;
export type DeleteSparkMutationResult = Apollo.MutationResult<DeleteSparkMutation>;
export type DeleteSparkMutationOptions = Apollo.BaseMutationOptions<DeleteSparkMutation, DeleteSparkMutationVariables>;
export const GetSparksDocument = gql`
    query getSparks {
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
 * __useGetSparksQuery__
 *
 * To run a query within a React component, call `useGetSparksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSparksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSparksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSparksQuery(baseOptions?: Apollo.QueryHookOptions<GetSparksQuery, GetSparksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSparksQuery, GetSparksQueryVariables>(GetSparksDocument, options);
      }
export function useGetSparksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSparksQuery, GetSparksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSparksQuery, GetSparksQueryVariables>(GetSparksDocument, options);
        }
export type GetSparksQueryHookResult = ReturnType<typeof useGetSparksQuery>;
export type GetSparksLazyQueryHookResult = ReturnType<typeof useGetSparksLazyQuery>;
export type GetSparksQueryResult = Apollo.QueryResult<GetSparksQuery, GetSparksQueryVariables>;