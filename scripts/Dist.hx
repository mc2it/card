import sys.io.File;

/** Runs the script. **/
function main() {
	for (script in ["Clean", "Version"]) Sys.command('lix $script');
	Sys.command("haxe --dce full build.hxml");

	final file = "bin/card.js";
	Sys.command('npx terser --comments=false --config-file=etc/terser.json --output=$file $file');
	File.saveContent(file, '#!/usr/bin/env node\n${File.getContent(file)}');
	Sys.command('git update-index --chmod=+x $file');
	if (Sys.systemName() != "Windows") Sys.command('chmod +x $file');
}
