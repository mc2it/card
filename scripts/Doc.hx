//! --class-path src
import Sys.*;
import card.Version.*;
import sys.FileSystem.*;
import sys.io.File.*;

/** Runs the script. **/
function main() {
	if (exists("docs")) Tools.removeDirectory("docs");

	command("haxe --define doc-gen --no-output --xml var/api.xml build.hxml");
	command("lix", [
		"run", "dox",
		"--define", "description", "Business card of MC2IT, distribution and services.",
		"--define", "source-path", "https://bitbucket.org/mc2it/card/src/main/src",
		"--define", "themeColor", "0xffc105",
		"--define", "version", packageVersion,
		"--define", "website", "https://bitbucket.org/mc2it/card",
		"--input-path", "var",
		"--output-path", "docs",
		"--title", "MC2IT Card",
		"--toplevel-package", "card"
	]);

	copy("www/favicon.ico", "docs/favicon.ico");
}
