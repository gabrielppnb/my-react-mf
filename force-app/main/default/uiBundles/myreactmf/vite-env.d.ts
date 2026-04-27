/// <reference types="vite/client" />

declare module "*.graphql?raw" {
	const query: string;
	export default query;
}
