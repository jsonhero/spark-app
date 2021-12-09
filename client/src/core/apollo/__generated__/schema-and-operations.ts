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

export type AddTagToSparkInput = {
  sparkId: Scalars['ID'];
  tagId: Scalars['ID'];
};

export type AddTagToSparkPayload = {
  __typename?: 'AddTagToSparkPayload';
  addedTag: Tag;
};

export type CreateTagInput = {
  name: Scalars['String'];
  sparkId?: InputMaybe<Scalars['ID']>;
};

export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  createdTag: Tag;
};

export type DeleteSparkPayload = {
  __typename?: 'DeleteSparkPayload';
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTagToSpark: AddTagToSparkPayload;
  createSpark: Spark;
  createTag: CreateTagPayload;
  deleteSpark: DeleteSparkPayload;
  updateSpark: UpdateSparkPayload;
};


export type MutationAddTagToSparkArgs = {
  input: AddTagToSparkInput;
};


export type MutationCreateSparkArgs = {
  input: SparkCreateInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationDeleteSparkArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateSparkArgs = {
  doc: Scalars['String'];
  id: Scalars['ID'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodes: Array<Node>;
  sparks: Array<Spark>;
  tags: Array<Tag>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type Spark = Node & {
  __typename?: 'Spark';
  createdAt: Scalars['DateTime'];
  doc?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
};

export type SparkCreateInput = {
  doc: Scalars['String'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  sparks: Array<Spark>;
  updatedAt: Scalars['DateTime'];
};

export type UpdateSparkPayload = {
  __typename?: 'UpdateSparkPayload';
  spark: Spark;
};

export type GenericSparkFragment = { __typename?: 'Spark', id: string, doc?: string | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type GenericTagFragment = { __typename?: 'Tag', id: string, name: string };

export type CreateSparkMutationVariables = Exact<{
  input: SparkCreateInput;
}>;


export type CreateSparkMutation = { __typename?: 'Mutation', createSpark: { __typename?: 'Spark', id: string, doc?: string | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'CreateTagPayload', createdTag: { __typename?: 'Tag', id: string, name: string } } };

export type DeleteSparkMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSparkMutation = { __typename?: 'Mutation', deleteSpark: { __typename?: 'DeleteSparkPayload', id: string } };

export type UpdateSparkMutationVariables = Exact<{
  id: Scalars['ID'];
  doc: Scalars['String'];
}>;


export type UpdateSparkMutation = { __typename?: 'Mutation', updateSpark: { __typename?: 'UpdateSparkPayload', spark: { __typename?: 'Spark', id: string, doc?: string | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } } };

export type GetSparkNodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSparkNodeQuery = { __typename?: 'Query', node?: { __typename?: 'Spark', id: string, doc?: string | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } | { __typename?: 'Tag' } | null | undefined };

export type GetSparksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSparksQuery = { __typename?: 'Query', sparks: Array<{ __typename?: 'Spark', id: string, doc?: string | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export const GenericSparkFragmentDoc = gql`
    fragment GenericSpark on Spark {
  id
  doc
  tags {
    id
    name
  }
  createdAt
  updatedAt
}
    `;
export const GenericTagFragmentDoc = gql`
    fragment GenericTag on Tag {
  id
  name
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
export const CreateTagDocument = gql`
    mutation createTag($input: CreateTagInput!) {
  createTag(input: $input) {
    createdTag {
      ...GenericTag
    }
  }
}
    ${GenericTagFragmentDoc}`;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
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
export const UpdateSparkDocument = gql`
    mutation updateSpark($id: ID!, $doc: String!) {
  updateSpark(id: $id, doc: $doc) {
    spark {
      ...GenericSpark
    }
  }
}
    ${GenericSparkFragmentDoc}`;
export type UpdateSparkMutationFn = Apollo.MutationFunction<UpdateSparkMutation, UpdateSparkMutationVariables>;

/**
 * __useUpdateSparkMutation__
 *
 * To run a mutation, you first call `useUpdateSparkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSparkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSparkMutation, { data, loading, error }] = useUpdateSparkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      doc: // value for 'doc'
 *   },
 * });
 */
export function useUpdateSparkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSparkMutation, UpdateSparkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSparkMutation, UpdateSparkMutationVariables>(UpdateSparkDocument, options);
      }
export type UpdateSparkMutationHookResult = ReturnType<typeof useUpdateSparkMutation>;
export type UpdateSparkMutationResult = Apollo.MutationResult<UpdateSparkMutation>;
export type UpdateSparkMutationOptions = Apollo.BaseMutationOptions<UpdateSparkMutation, UpdateSparkMutationVariables>;
export const GetSparkNodeDocument = gql`
    query getSparkNode($id: ID!) {
  node(id: $id) {
    ... on Spark {
      ...GenericSpark
    }
  }
}
    ${GenericSparkFragmentDoc}`;

/**
 * __useGetSparkNodeQuery__
 *
 * To run a query within a React component, call `useGetSparkNodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSparkNodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSparkNodeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSparkNodeQuery(baseOptions: Apollo.QueryHookOptions<GetSparkNodeQuery, GetSparkNodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSparkNodeQuery, GetSparkNodeQueryVariables>(GetSparkNodeDocument, options);
      }
export function useGetSparkNodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSparkNodeQuery, GetSparkNodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSparkNodeQuery, GetSparkNodeQueryVariables>(GetSparkNodeDocument, options);
        }
export type GetSparkNodeQueryHookResult = ReturnType<typeof useGetSparkNodeQuery>;
export type GetSparkNodeLazyQueryHookResult = ReturnType<typeof useGetSparkNodeLazyQuery>;
export type GetSparkNodeQueryResult = Apollo.QueryResult<GetSparkNodeQuery, GetSparkNodeQueryVariables>;
export const GetSparksDocument = gql`
    query getSparks {
  sparks {
    ...GenericSpark
  }
}
    ${GenericSparkFragmentDoc}`;

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