import {
    ApolloClient,
    ApolloProvider,
    NormalizedCacheObject,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { cache } from "./cache";
import Pages from "./pages";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    uri: process.env.REACT_APP_URI,
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Pages />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
