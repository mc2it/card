#!/usr/bin/env node
import console from "node:console";
import {readFileSync} from "node:fs";
import {program} from "commander";
import {getCard} from "../lib/index.js";

// Start the application.
const {version} = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
program.name("npx @mc2it/card")
	.description("Print the business card of MC2IT, distribution and services.")
	.version(version, "-v, --version")
	.action(() => console.log(getCard(1)))
	.parse();
