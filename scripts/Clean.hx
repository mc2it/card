import Tools.cleanDirectory;
import sys.FileSystem.*;

/** Runs the script. **/
function main() {
	if (exists("bin/card.js")) deleteFile("bin/card.js");
	cleanDirectory("var");
}
