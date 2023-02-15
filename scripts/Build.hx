/** Runs the script. **/
function main() {
	final debug = Sys.args().contains("--debug");
	Sys.command('haxe ${debug ? "--debug" : ""} build.hxml');
}
