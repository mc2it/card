import Tools.cleanDirectory;
import Tools.removeDirectory;
import sys.FileSystem.*;

using Lambda;

/** Runs the script. **/
function main() {
	["run.n", "bin/card.js", "bin.card.php"].filter(exists).iter(deleteFile);
	["lib", "res"].filter(exists).iter(removeDirectory);
	cleanDirectory("var");
}
