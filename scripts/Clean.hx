import sys.FileSystem;
using Lambda;

/** Runs the script. **/
function main() {
	["js", "js.map"].map(ext -> 'bin/mc2it_card.$ext').filter(FileSystem.exists).iter(FileSystem.deleteFile);
	Tools.cleanDirectory("var");
}
