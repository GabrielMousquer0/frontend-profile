import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
const URL = import.meta.env.VITE_URL_SERVER;

const httpLink = createHttpLink({
    uri: URL
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export { apolloClient }