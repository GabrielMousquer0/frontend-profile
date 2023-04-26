import { useMutation, useQuery } from '@vue/apollo-composable';

export function runQuery(query, variables) {
    const { result } = useQuery(query, variables)
        return result.value;
}

export async function runMutation(query, variables) {
    const { data } =  await useMutation(query).mutate(variables)
        return data;
}