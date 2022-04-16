/** Runs the script. **/
function main() {
	for (script in ["Clean", "Version"]) Sys.command('lix $script');
	Sys.command("haxe --dce full build.hxml");

	final file = "bin/mc2it_card.js";
	Sys.command('npx terser --comments=false --config-file=etc/terser.json --output=$file $file');
	Sys.command('git update-index --chmod=+x $file');
	if (Sys.systemName() != "Windows") Sys.command('chmod +x $file');
}
