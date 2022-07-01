#!/usr/bin/env node
import console from "node:console";
import {program} from "commander";
import pkg from "../package.json" assert {type: "json"};
import {getCard} from "../lib/index.js";

// Start the application.
program.name("npx @mc2it/card")
	.description("Print the business card of MC2IT, distribution and services.")
	.version(pkg.version, "-v, --version")
	.action(() => console.log(getCard(1)))
	.parse();
