import {styleText} from "node:util"
import boxen from "boxen"

# Returns the card content.
export getCard = (margin = 0) ->
	buffer = [
		"#{styleText "white", styleText("bold", " MC2IT")} #{styleText "white", "- Distribution & Services"}"
		""
		"#{styleText "white", styleText("bold", " GitHub:")} #{styleText "gray", "https://github.com/"}#{styleText "cyan", "mc2it"}"
		""
		"#{styleText "white", styleText("bold", "   Card:")} #{styleText "yellow", "npx"} #{styleText "white", "@mc2it/card"}"
		"#{styleText "white", styleText("bold", "  Email:")} #{styleText "white", "dev@mc2it.com"}"
		"#{styleText "white", styleText("bold", "Website:")} #{styleText "white", "https://www.mc2it.com"}"
	]

	boxen buffer.join("\n"),
		borderColor: "green"
		borderStyle: "round"
		margin: margin
		padding: 1
