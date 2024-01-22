import boxen from "boxen";
import chalk from "chalk";

/**
 * Returns the card content.
 * @param margin The margin size.
 * @returns The card content.
 */
export function getCard(margin = 0): string {
	const buffer = [
		`${chalk.white.bold(" MC2IT")} ${chalk.white("- Distribution & Services")}`,
		"",
		`${chalk.white.bold(" GitHub:")} ${chalk.gray("https://github.com/")}${chalk.cyan("mc2it")}`,
		"",
		`${chalk.white.bold("   Card:")} ${chalk.yellow("npx")} ${chalk.white("@mc2it/card")}`,
		`${chalk.white.bold("  Email:")} ${chalk.white("dev@mc2it.com")}`,
		`${chalk.white.bold("Website:")} ${chalk.white("https://www.mc2it.com")}`
	];

	return boxen(buffer.join("\n"), {
		borderColor: "green",
		borderStyle: "round",
		margin,
		padding: 1
	});
}
