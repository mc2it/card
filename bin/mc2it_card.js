#!/usr/bin/env node
import console from "node:console";
import process from "node:process";
import {parseArgs} from "node:util";
import pkg from "../package.json" with {type: "json"};
import {getCard} from "../lib/index.js";

// Give the process a friendly name.
process.title = "MC2IT Card";

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
		help: {short: "h", type: "boolean", default: false},
		version: {short: "v", type: "boolean", default: false}
	}});

	console.log(values.help ? usage.trim() : values.version ? pkg.version : getCard(1));
}
catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
}
