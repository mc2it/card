//! --class-path src
import mc2it_card.Version;
import sys.FileSystem;
import sys.io.File;
using Lambda;

/** Builds the documentation. **/
function main() {
	["CHANGELOG.md", "LICENSE.md"].iter(file -> File.copy(file, 'docs/${file.toLowerCase()}'));
	if (FileSystem.exists("docs/api")) Tools.removeDirectory("docs/api");

	Sys.command("haxe --define doc-gen --no-output --xml var/api.xml build.hxml");
	Sys.command("lix", ["run", "dox",
		"--define", "description", "Business card of MC2IT, distribution and services.",
		"--define", "source-path", "https://github.com/mc2it/card/blob/main/src",
		"--define", "themeColor", "0x165898",
		"--define", "version", Version.packageVersion,
		"--define", "website", "https://mc2it.github.io/card",
		"--input-path", "var",
		"--output-path", "docs/api",
		"--title", "MC2IT Card",
		"--toplevel-package", "mc2it_card"
	]);

	File.copy("docs/favicon.ico", "docs/api/favicon.ico");
}
