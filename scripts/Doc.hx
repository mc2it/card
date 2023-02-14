//! --class-path src
import mc2it_card.Version;
import sys.FileSystem;
import sys.io.File;

/** Runs the script. **/
function main() {
	if (FileSystem.exists("docs")) Tools.removeDirectory("docs");

	Sys.command("haxe", ["--define", "doc-gen", "--no-output", "--xml", "var/api.xml", "build.hxml"]);
	Sys.command("lix", [
		"run", "dox",
		"--define", "description", "Business card of MC2IT, distribution and services.",
		"--define", "source-path", "https://github.com/mc2it/card/blob/main/src",
		"--define", "themeColor", "0x165898",
		"--define", "version", Version.packageVersion,
		"--define", "website", "https://github.com/mc2it/card",
		"--input-path", "var",
		"--output-path", "docs",
		"--title", "MC2IT Card",
		"--toplevel-package", "mc2it_card"
	]);

	File.copy("www/favicon.ico", "docs/favicon.ico");
}
