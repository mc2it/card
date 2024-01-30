import console from "node:console";
import {parseArgs} from "node:util";
import pkg from "../../package.json" with {type: "json"};
import {getCard} from "../index.js";
import usage from "./usage.js";

/**
 * Application entry point.
 */
function main(): void {
	const {values} = parseArgs({options: {
		help: {short: "h", type: "boolean", default: false},
		version: {short: "v", type: "boolean", default: false}
	}});

	console.log(values.help ? usage.trim() : (values.version ? pkg.version : getCard(1)));
}

// Start the application.
try { main(); }
catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
