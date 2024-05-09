import {styleText} from "node:util";
import boxen from "boxen";

/**
 * Returns the card content.
 * @param {number} margin The margin size.
 * @returns {string} The card content.
 */
export function getCard(margin = 0) {
	const buffer = [
		`${styleText("white", styleText("bold", " MC2IT"))} ${styleText("white", "- Distribution & Services")}`,
		"",
		`${styleText("white", styleText("bold", " GitHub:"))} ${styleText("gray", "https://github.com/")}${styleText("cyan", "mc2it")}`,
		"",
		`${styleText("white", styleText("bold", "   Card:"))} ${styleText("yellow", "npx")} ${styleText("white", "@mc2it/card")}`,
		`${styleText("white", styleText("bold", "  Email:"))} ${styleText("white", "dev@mc2it.com")}`,
		`${styleText("white", styleText("bold", "Website:"))} ${styleText("white", "https://www.mc2it.com")}`
	];

	return boxen(buffer.join("\n"), {
		borderColor: "green",
		borderStyle: "round",
		margin,
		padding: 1
	});
}
