/**
 * @type {Partial<import("typedoc").TypeDocOptions>}
 */
export default {
	entryPoints: ["../src/index.ts"],
	excludePrivate: true,
	gitRevision: "main",
	hideGenerator: true,
	name: "MC2IT Card",
	out: "../docs/api",
	readme: "none"
};
