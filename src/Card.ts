import {styleText} from "node:util";
import boxen from "boxen";

/**
 * Returns the card content.
 * @param margin The margin size.
 * @returns The card content.
 */
export function getCard(margin = 0): string {
	const buffer = [
		`${styleText("white", styleText("bold", "  MC2IT"))} ${styleText("white", "- Distribution & Services")}`,
		"  29 Rue Gine - 34690 Fabrègues",
		"",
		`${styleText("white", styleText("bold", "  GitHub:"))} ${styleText("gray", "https://github.com/")}${styleText("cyan", "mc2it")}`,
		`${styleText("white", styleText("bold", "LinkedIn:"))} ${styleText("gray", "https://linkedin.com/company/")}${styleText("cyan", "mc2it-sas")}`,
		"",
		`${styleText("white", styleText("bold", "    Card:"))} ${styleText("yellow", "npx")} ${styleText("white", "@mc2it/card")}`,
		`${styleText("white", styleText("bold", "   Email:"))} ${styleText("white", "contact@mc2it.com")}`,
		`${styleText("white", styleText("bold", "   Phone:"))} ${styleText("white", "+33 4 99 52 89 28")}`,
		`${styleText("white", styleText("bold", " Website:"))} ${styleText("white", "https://www.mc2it.com")}`
	];

	return boxen(buffer.join("\n"), {
		borderColor: "green",
		borderStyle: "round",
		margin,
		padding: 1
	});
}
