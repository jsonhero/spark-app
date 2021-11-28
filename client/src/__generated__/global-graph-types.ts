export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Mutation = {
  __typename?: 'Mutation';
  createSpark: Spark;
};


export type MutationCreateSparkArgs = {
  input: SparkCreateInput;
};

export type Query = {
  __typename?: 'Query';
  sparks: Array<Spark>;
};

export type Spark = {
  __typename?: 'Spark';
  createdAt: Scalars['DateTime'];
  doc: Scalars['String'];
  id: Scalars['String'];
  tags: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SparkCreateInput = {
  doc: Scalars['String'];
};
