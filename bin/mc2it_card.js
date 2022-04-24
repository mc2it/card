#!/usr/bin/env node
import process from "node:process";
import {main} from "../lib/index.js";

// Start the application.
try { await main(); }
catch (error) {
	process.exitCode = 1;
	console.error(error);
}
