import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import App from './App';

import './index.css';

/* apollo client config start */
const uploadLink = createUploadLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT });

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            Accept: 'application/json',
            // Authorization: `Bearer ${getItem('access_token')}` || null,
        },
    }));

    return forward(operation);
});
const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        authMiddleware,
        uploadLink,
    ]),
    cache: new InMemoryCache(),
});
/* apollo client config end */

const root = (
    <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.render(root, document.getElementById('root'));
