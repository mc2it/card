package card;

import tink.Cli;
import tink.cli.Rest;

using StringTools;
using tink.CoreApi;

/** Print the business card of Cédric Belin, full stack developer. **/
class Program {

	/** The string corresponding to a line break. **/
	public static final newLine = Sys.systemName() == "Windows" ? "\r\n" : "\n";

	/** Output usage information. **/
	public var help = false;

	/** Output the version number. **/
	public var version = false;

	/** Creates a new program. **/
	public function new() {}

	/** Application entry point. **/
	public static function main()
		Cli.process(Sys.args(), new Program()).handle(Cli.exit);

	// Runs this command.
	@:defaultCommand
	public function run(rest: Rest<String>): Promise<Noise> {
		if (help || version) {
			Sys.println(version ? Version.packageVersion : Cli.getDoc(this));
			return Noise;
		}

		final builder = new CardBuilder()
			.header()
				.line()
					.center("<light_white>MC2IT</>")
					.center("<white>Distribution & Services</>")
				.line()
					.label("GitHub", "<gray>https://github.com/</><cyan>mc2it</>")
				.line()
					.label("Card", "<yellow>npx</> <white>@mc2it/card</>")
					.label("Email", "<white>dev@mc2it.com</>")
					.label("Website", "<white>https://mc2it.com</>")
				.line()
			.footer();

		Console.formatMode = AsciiTerminal;
		Console.logPrefix = "";
		Console.log('$newLine$builder');
		return Noise;
	}
}
