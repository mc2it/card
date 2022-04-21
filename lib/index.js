import console from "node:console";
import {readFile} from "node:fs/promises";
import boxen from "boxen";
import chalk from "chalk";
import {program} from "commander";

/**
 * Application entry point.
 * @returns {Promise<void>} Resolves when the program is terminated.
 */
export async function main() {
	const {version} = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
	program.name("npx @mc2it/card")
		.description("Print the business card of MC2IT, distribution and services.")
		.version(version, "-v, --version")
		.parse(process.argv);

	const buffer = [
		`${chalk.white.bold("MC2IT")} - ${chalk.white("Distribution & Services")}`,
		"",
		`${chalk.white.bold("   Card:")} ${chalk.yellow("npx")} ${chalk.gray("@mc2it/card")}`,
		`${chalk.white.bold("  Email:")} ${chalk.gray("dev@mc2it.com")}`,
		`${chalk.white.bold(" GitHub:")} ${chalk.gray("https://github.com/")}${chalk.cyan("mc2it")}`,
		`${chalk.white.bold("Website:")} ${chalk.gray("https://mc2it.com")}`
	];

	console.log(boxen(buffer.join("\n"), {
		borderColor: "green",
		borderStyle: "round",
		margin: 1,
		padding: 1
	}));
}
