//! --class-path src
import mc2it_card.Version;

/** Publishes the package. **/
function main() {
	Sys.command("npm publish");
	for (action in ["tag", "push origin"]) Sys.command('git $action v${Version.packageVersion}');
}
