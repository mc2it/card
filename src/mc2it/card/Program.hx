package mc2it.card;

import tink.Cli;
using StringTools;
using tink.CoreApi;

/**
	Print the business card of MC2IT, distribution and services.

	> npx @mc2it/card [flags]
**/
final class Program {

	/** Diplay this help. **/
	public var help = false;

	/** Output the version number. **/
	public var version = false;

	/** Creates a new program. **/
	public function new() {}

	/** Application entry point. **/
	public static function main() {
		#if nodejs js.Node.process.title = "MC2IT Card"; #end
		Cli.process(Sys.args(), new Program()).handle(Cli.exit);
	}

	// Runs this command.
	@:defaultCommand
	public function run(): Promise<Noise> {
		if (help || version) {
			Sys.println(version ? Platform.packageVersion : Cli.getDoc(this));
			return Noise;
		}

		final builder = new CardBuilder()
			.header()
				.line()
					.center("<light_white>MC2IT</> <white>- Distribution & Services</>")
				.line()
					.label("GitHub", "<gray>https://github.com/</><cyan>mc2it</>")
				.line()
					.label("Card", "<yellow>npx</> <white>@mc2it/card</>")
					.label("Email", "<white>dev@mc2it.com</>")
					.label("Website", "<white>https://www.mc2it.com</>")
				.line()
			.footer();

		Console.printlnFormatted('${CardBuilder.newLine}$builder');
		return Noise;
	}
}
