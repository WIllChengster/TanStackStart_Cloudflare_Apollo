import { HttpLink } from "@apollo/client";
import {
	routerWithApolloClient,
	ApolloClient,
	InMemoryCache,
} from "@apollo/client-integration-tanstack-start";
import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	// Configure Apollo Client
	const apolloClient = new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri:
				import.meta.env.VITE_GRAPHQL_ENDPOINT ||
				"https://countries.trevorblades.com/",
		}),
	});

	const router = createRouter({
		routeTree,
		context: {
			...routerWithApolloClient.defaultContext,
		},

		defaultPreload: "intent",
	});

	return routerWithApolloClient(router, apolloClient);
};
