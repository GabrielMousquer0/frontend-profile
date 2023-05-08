import { useMutation, useQuery } from '@vue/apollo-composable';

export function runQuery(query, variables) {
  const { result, refetch } = useQuery(query, variables);
  return { data: result, refetch };
}
export async function runMutation(query, variables, Queryname) {
  const { data } =  await useMutation(query, { refetchQueries: [Queryname] }).mutate(variables);
  return data;
}