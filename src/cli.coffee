import console from "node:console"
import process from "node:process"
import {parseArgs} from "node:util"
import {getCard} from "./card.js"

# The usage information.
usage = """
Print the business card of MC2IT, distribution and services.

Usage:
  npx @mc2it/card

Options:
  -h, --help     Display this help.
  -v, --version  Output the version number.
"""

# Start the application.
try
	process.title = "MC2IT Card"
	{values} = parseArgs options:
		help: {short: "h", type: "boolean", default: off}
		version: {short: "v", type: "boolean", default: off}

	console.log switch
		when values.help then usage
		when values.version
			pkg = await import("../package.json", with: {type: "json"})
			pkg.default.version
		else getCard 1

catch error
	console.error if error instanceof Error then error.message else error
	process.exit 500
