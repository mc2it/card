import boxen from "boxen";
import chalk from "chalk";

/**
 * Returns the card content.
 * @param {number} [margin=0] The margin size.
 * @returns {string} The card content.
 */
export function getCard(margin = 0) {
	const buffer = [
		`${chalk.white.bold("MC2IT")} - ${chalk.white("Distribution & Services")}`,
		"",
		`${chalk.white.bold("   Card:")} ${chalk.yellow("npx")} ${chalk.gray("@mc2it/card")}`,
		`${chalk.white.bold("  Email:")} ${chalk.gray("dev@mc2it.com")}`,
		`${chalk.white.bold(" GitHub:")} ${chalk.gray("https://github.com/")}${chalk.cyan("mc2it")}`,
		`${chalk.white.bold("Website:")} ${chalk.gray("https://mc2it.com")}`
	];

	return boxen(buffer.join("\n"), {
		borderColor: "green",
		borderStyle: "round",
		margin,
		padding: 1
	});
}
