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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AddFolderEntryInput = {
  entityId: Scalars['ID'];
  folderId: Scalars['ID'];
};

export type AddFolderEntryPayload = {
  __typename?: 'AddFolderEntryPayload';
  addedEntry: FolderEntry;
};

export type AddTagToSparkInput = {
  sparkId: Scalars['ID'];
  tagId: Scalars['ID'];
};

export type AddTagToSparkPayload = {
  __typename?: 'AddTagToSparkPayload';
  addedTag: Tag;
};

export type CreateFolderInput = {
  name: Scalars['String'];
  parentFolderId: Scalars['ID'];
};

export type CreateFolderPayload = {
  __typename?: 'CreateFolderPayload';
  folderEntry: FolderEntry;
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

export type DeleteTagFromSparkInput = {
  sparkId: Scalars['ID'];
  tagId: Scalars['ID'];
};

export type DeleteTagFromSparkPayload = {
  __typename?: 'DeleteTagFromSparkPayload';
  deleteTagId: Scalars['ID'];
  relatedSparkId: Scalars['ID'];
};

export type Folder = Node & {
  __typename?: 'Folder';
  createdAt: Scalars['DateTime'];
  entries: Array<FolderEntry>;
  id: Scalars['ID'];
  isRoot: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FolderEntry = {
  __typename?: 'FolderEntry';
  createdAt: Scalars['DateTime'];
  entity: FolderEntryEntityUnion;
  entityType: Scalars['String'];
  folder: Folder;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type FolderEntryEntityUnion = Folder | Spark;

export type Mutation = {
  __typename?: 'Mutation';
  addFolderEntry: AddFolderEntryPayload;
  addTagToSpark: AddTagToSparkPayload;
  createFolder: CreateFolderPayload;
  createSpark: Spark;
  createTag: CreateTagPayload;
  deleteSpark: DeleteSparkPayload;
  deleteTagFromSpark: DeleteTagFromSparkPayload;
  removeFolderEntry: RemoveFolderEntryPayload;
  updateSpark: UpdateSparkPayload;
};


export type MutationAddFolderEntryArgs = {
  input: AddFolderEntryInput;
};


export type MutationAddTagToSparkArgs = {
  input: AddTagToSparkInput;
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
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


export type MutationDeleteTagFromSparkArgs = {
  input: DeleteTagFromSparkInput;
};


export type MutationRemoveFolderEntryArgs = {
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
  folderTree: Folder;
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


export type QuerySparksArgs = {
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryTagsArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type RemoveFolderEntryPayload = {
  __typename?: 'RemoveFolderEntryPayload';
  removedFolderEntryId: Scalars['ID'];
};

export type Spark = Node & {
  __typename?: 'Spark';
  createdAt: Scalars['DateTime'];
  doc?: Maybe<Scalars['JSONObject']>;
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
  lastUsedAt: Scalars['DateTime'];
  name: Scalars['String'];
  sparks: Array<Spark>;
  updatedAt: Scalars['DateTime'];
};

export type UpdateSparkPayload = {
  __typename?: 'UpdateSparkPayload';
  spark: Spark;
};

export type GenericFolderFragment = { __typename?: 'Folder', id: string, name: string, isRoot: boolean };

export type GenericSparkFragment = { __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> };

export type GenericTagFragment = { __typename?: 'Tag', id: string, name: string, lastUsedAt: any };

export type AddFolderEntryMutationVariables = Exact<{
  input: AddFolderEntryInput;
}>;


export type AddFolderEntryMutation = { __typename?: 'Mutation', addFolderEntry: { __typename?: 'AddFolderEntryPayload', addedEntry: { __typename?: 'FolderEntry', id: string, entity: { __typename?: 'Folder', id: string, name: string } | { __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> } } } };

export type AddTagToSparkMutationVariables = Exact<{
  input: AddTagToSparkInput;
}>;


export type AddTagToSparkMutation = { __typename?: 'Mutation', addTagToSpark: { __typename?: 'AddTagToSparkPayload', addedTag: { __typename?: 'Tag', id: string, name: string, lastUsedAt: any } } };

export type CreateFolderMutationVariables = Exact<{
  input: CreateFolderInput;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'CreateFolderPayload', folderEntry: { __typename?: 'FolderEntry', id: string, entity: { __typename?: 'Folder', id: string, name: string } | { __typename?: 'Spark' } } } };

export type CreateSparkMutationVariables = Exact<{
  input: SparkCreateInput;
}>;


export type CreateSparkMutation = { __typename?: 'Mutation', createSpark: { __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> } };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'CreateTagPayload', createdTag: { __typename?: 'Tag', id: string, name: string, lastUsedAt: any } } };

export type DeleteSparkMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSparkMutation = { __typename?: 'Mutation', deleteSpark: { __typename?: 'DeleteSparkPayload', id: string } };

export type DeleteTagFromSparkMutationVariables = Exact<{
  input: DeleteTagFromSparkInput;
}>;


export type DeleteTagFromSparkMutation = { __typename?: 'Mutation', deleteTagFromSpark: { __typename?: 'DeleteTagFromSparkPayload', deleteTagId: string, relatedSparkId: string } };

export type UpdateSparkMutationVariables = Exact<{
  id: Scalars['ID'];
  doc: Scalars['String'];
}>;


export type UpdateSparkMutation = { __typename?: 'Mutation', updateSpark: { __typename?: 'UpdateSparkPayload', spark: { __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> } } };

export type GetFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFoldersQuery = { __typename?: 'Query', folderTree: { __typename?: 'Folder', id: string, name: string, isRoot: boolean, entries: Array<{ __typename?: 'FolderEntry', id: string, entity: { __typename?: 'Folder', id: string, name: string, isRoot: boolean, entries: Array<{ __typename?: 'FolderEntry', id: string, entity: { __typename?: 'Folder', id: string, name: string, isRoot: boolean, entries: Array<{ __typename?: 'FolderEntry', id: string }> } | { __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> } }> } | { __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> } }> } };

export type GetSparkNodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSparkNodeQuery = { __typename?: 'Query', node?: { __typename?: 'Folder' } | { __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> } | { __typename?: 'Tag' } | null | undefined };

export type GetSparksQueryVariables = Exact<{
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetSparksQuery = { __typename?: 'Query', sparks: Array<{ __typename?: 'Spark', id: string, doc?: any | null | undefined, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> }> };

export type GetTagsQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, lastUsedAt: any }> };

export const GenericFolderFragmentDoc = gql`
    fragment GenericFolder on Folder {
  id
  name
  isRoot
}
    `;
export const GenericTagFragmentDoc = gql`
    fragment GenericTag on Tag {
  id
  name
  lastUsedAt
}
    `;
export const GenericSparkFragmentDoc = gql`
    fragment GenericSpark on Spark {
  id
  doc
  tags {
    ...GenericTag
  }
  createdAt
  updatedAt
}
    ${GenericTagFragmentDoc}`;
export const AddFolderEntryDocument = gql`
    mutation addFolderEntry($input: AddFolderEntryInput!) {
  addFolderEntry(input: $input) {
    addedEntry {
      id
      entity {
        ... on Folder {
          id
          name
        }
        ... on Spark {
          ...GenericSpark
        }
      }
    }
  }
}
    ${GenericSparkFragmentDoc}`;
export type AddFolderEntryMutationFn = Apollo.MutationFunction<AddFolderEntryMutation, AddFolderEntryMutationVariables>;

/**
 * __useAddFolderEntryMutation__
 *
 * To run a mutation, you first call `useAddFolderEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFolderEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFolderEntryMutation, { data, loading, error }] = useAddFolderEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFolderEntryMutation(baseOptions?: Apollo.MutationHookOptions<AddFolderEntryMutation, AddFolderEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFolderEntryMutation, AddFolderEntryMutationVariables>(AddFolderEntryDocument, options);
      }
export type AddFolderEntryMutationHookResult = ReturnType<typeof useAddFolderEntryMutation>;
export type AddFolderEntryMutationResult = Apollo.MutationResult<AddFolderEntryMutation>;
export type AddFolderEntryMutationOptions = Apollo.BaseMutationOptions<AddFolderEntryMutation, AddFolderEntryMutationVariables>;
export const AddTagToSparkDocument = gql`
    mutation addTagToSpark($input: AddTagToSparkInput!) {
  addTagToSpark(input: $input) {
    addedTag {
      ...GenericTag
    }
  }
}
    ${GenericTagFragmentDoc}`;
export type AddTagToSparkMutationFn = Apollo.MutationFunction<AddTagToSparkMutation, AddTagToSparkMutationVariables>;

/**
 * __useAddTagToSparkMutation__
 *
 * To run a mutation, you first call `useAddTagToSparkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagToSparkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagToSparkMutation, { data, loading, error }] = useAddTagToSparkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTagToSparkMutation(baseOptions?: Apollo.MutationHookOptions<AddTagToSparkMutation, AddTagToSparkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTagToSparkMutation, AddTagToSparkMutationVariables>(AddTagToSparkDocument, options);
      }
export type AddTagToSparkMutationHookResult = ReturnType<typeof useAddTagToSparkMutation>;
export type AddTagToSparkMutationResult = Apollo.MutationResult<AddTagToSparkMutation>;
export type AddTagToSparkMutationOptions = Apollo.BaseMutationOptions<AddTagToSparkMutation, AddTagToSparkMutationVariables>;
export const CreateFolderDocument = gql`
    mutation createFolder($input: CreateFolderInput!) {
  createFolder(input: $input) {
    folderEntry {
      id
      entity {
        ... on Folder {
          id
          name
        }
      }
    }
  }
}
    `;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
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
export const DeleteTagFromSparkDocument = gql`
    mutation deleteTagFromSpark($input: DeleteTagFromSparkInput!) {
  deleteTagFromSpark(input: $input) {
    deleteTagId
    relatedSparkId
  }
}
    `;
export type DeleteTagFromSparkMutationFn = Apollo.MutationFunction<DeleteTagFromSparkMutation, DeleteTagFromSparkMutationVariables>;

/**
 * __useDeleteTagFromSparkMutation__
 *
 * To run a mutation, you first call `useDeleteTagFromSparkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagFromSparkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagFromSparkMutation, { data, loading, error }] = useDeleteTagFromSparkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTagFromSparkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagFromSparkMutation, DeleteTagFromSparkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagFromSparkMutation, DeleteTagFromSparkMutationVariables>(DeleteTagFromSparkDocument, options);
      }
export type DeleteTagFromSparkMutationHookResult = ReturnType<typeof useDeleteTagFromSparkMutation>;
export type DeleteTagFromSparkMutationResult = Apollo.MutationResult<DeleteTagFromSparkMutation>;
export type DeleteTagFromSparkMutationOptions = Apollo.BaseMutationOptions<DeleteTagFromSparkMutation, DeleteTagFromSparkMutationVariables>;
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
export const GetFoldersDocument = gql`
    query getFolders {
  folderTree {
    ...GenericFolder
    entries {
      id
      entity {
        ... on Spark {
          ...GenericSpark
        }
        ... on Folder {
          ...GenericFolder
          entries {
            id
            entity {
              ... on Spark {
                ...GenericSpark
              }
              ... on Folder {
                ...GenericFolder
                entries {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
}
    ${GenericFolderFragmentDoc}
${GenericSparkFragmentDoc}`;

/**
 * __useGetFoldersQuery__
 *
 * To run a query within a React component, call `useGetFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFoldersQuery(baseOptions?: Apollo.QueryHookOptions<GetFoldersQuery, GetFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, options);
      }
export function useGetFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoldersQuery, GetFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, options);
        }
export type GetFoldersQueryHookResult = ReturnType<typeof useGetFoldersQuery>;
export type GetFoldersLazyQueryHookResult = ReturnType<typeof useGetFoldersLazyQuery>;
export type GetFoldersQueryResult = Apollo.QueryResult<GetFoldersQuery, GetFoldersQueryVariables>;
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
    query getSparks($tags: [String!]) {
  sparks(tags: $tags) {
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
 *      tags: // value for 'tags'
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
export const GetTagsDocument = gql`
    query getTags($query: String) {
  tags(query: $query) {
    ...GenericTag
  }
}
    ${GenericTagFragmentDoc}`;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;