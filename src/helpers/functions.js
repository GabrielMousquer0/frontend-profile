import { useMutation, useQuery } from '@vue/apollo-composable';

export function runQuery(query, variables, fetchPolicy) {
  const { result } = useQuery(query, variables, {fetchPolicy});
  return result;
}

export async function runMutation(query, variables) {
  const { data } =  await useMutation(query).mutate(variables);
  return data;
}