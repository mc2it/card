//! --class-path src
import mc2it_card.Platform;

/** Publishes the package. **/
function main() {
	Sys.command("npm publish");
	for (action in ["tag", "push origin"]) Sys.command('git $action v${Platform.packageVersion}');
}
