import console from "node:console";
import {parseArgs} from "node:util";
import pkg from "../package.json" with {type: "json"};
import {getCard} from "./card.js";

// The usage information.
const usage = `
Print the business card of MC2IT, distribution and services.

Usage:
  npx @mc2it/card

Options:
  -h, --help     Display this help.
  -v, --version  Output the version number.
`;

// Start the application.
try {
	const {values} = parseArgs({options: {
		help: {short: "h", type: "boolean"},
		version: {short: "v", type: "boolean"}
	}});

	console.log(values.help ? usage.trim() : (values.version ? pkg.version : getCard(1)));
}
catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
