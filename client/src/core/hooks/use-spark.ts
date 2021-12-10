import { useMemo } from 'react'
import { useGetSparkNodeQuery, GetSparkNodeQuery, GenericSparkFragment } from '@operations';
import { QueryHookOptions, OperationVariables } from '@apollo/client';


export function useSpark(sparkId: string | undefined): GenericSparkFragment | null {
  const variables = useMemo(() => {
    if (!sparkId) return undefined
    return {
      id: sparkId,
    }
  }, [sparkId])

  const queryResult = useGetSparkNodeQuery({
    variables,
    skip: !sparkId,
  })

  if (queryResult.data?.node?.__typename === 'Spark') {
    return queryResult.data.node;
  }
  return null;
}