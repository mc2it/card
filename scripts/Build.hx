import Sys.*;

/** Runs the script. **/
function main()
	for (target in ["js", "neko", "php"]) command('haxe build_$target.hxml');
