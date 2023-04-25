import { useMutation, useQuery } from '../utils';

export async function runQuery(query, variables) {
    const { data } = await useQuery({
        query,
        variables,
    }).execute()
        return data;
}

export async function runMutation(query, variables) {
    const { data } = await useMutation(query).execute(variables)
        return data;
}