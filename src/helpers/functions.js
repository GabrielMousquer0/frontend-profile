import { useMutation, useQuery } from '@vue/apollo-composable';
import { Notify } from 'quasar';

export function runQuery(query, variables, fetchPolicy) {
  const { result, refetch } = useQuery(query, variables, {fetchPolicy});
  return { data: result, refetch };
}
export async function runMutation(query, variables, Queryname) {
  const { data } =  await useMutation(query, { refetchQueries: [Queryname] }).mutate(variables);
  return data;
}

export function negativeNotify(message) {
  return Notify.create({ message, color: 'negative', icon: 'warning' });
}
export function positiveNotify(message) {
  return Notify.create({ message, color: 'positive', icon: 'check' });
}