import sys.FileSystem;

/** Runs the script. **/
function main() {
	if (FileSystem.exists("bin/card.js")) FileSystem.deleteFile("bin/card.js");
	Tools.cleanDirectory("var");
}
