//! --class-path src
import Sys.*;
import card.Version.*;

/** Runs the script. **/
function main() {
	command("lix Dist");
	command("npm publish");
	for (action in ["tag", "push origin"]) command('git $action v$packageVersion');
}
