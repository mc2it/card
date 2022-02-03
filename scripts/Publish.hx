//! --class-path src
import card.Version;

/** Runs the script. **/
function main() {
	Sys.command("lix Dist");
	Sys.command("npm publish");
	for (action in ["tag", "push origin"]) Sys.command('git $action v${Version.packageVersion}');
}
