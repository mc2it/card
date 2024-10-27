/** Packages the project. **/
function main() {
	final file = "bin/mc2it_card.js";
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');
	Sys.command('npx terser --comments=false --compress --mangle --output=$file $file');
	Sys.command('git update-index --chmod=+x $file');
}
