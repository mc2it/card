import sys.FileSystem;

/** Runs the script. **/
function main() {
	if (FileSystem.exists("bin/mc2it_card.js")) FileSystem.deleteFile("bin/mc2it_card.js");
	Tools.cleanDirectory("var");
}
