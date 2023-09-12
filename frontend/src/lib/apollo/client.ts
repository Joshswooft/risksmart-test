import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? "http://localhost:3000/graphql";
console.log("uri: ", uri)

const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
});

export default client;
