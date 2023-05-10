import { useMutation, useQuery } from '@vue/apollo-composable';

export function runQuery(query, variables, fetchPolicy) {
  const { result, refetch } = useQuery(query, variables, {fetchPolicy});
  return { data: result, refetch };
}
export async function runMutation(query, variables, Queryname) {
  const { data } =  await useMutation(query, { refetchQueries: [Queryname] }).mutate(variables);
  return data;
}