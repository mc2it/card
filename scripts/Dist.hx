import sys.io.File;

/** Runs the script. **/
function main() {
	for (script in ["Clean", "Version"]) Sys.command('lix $script');
	Sys.command("haxe --dce full build.hxml");

	final file = "bin/mc2it_card.js";
	Sys.command('npx esbuild --allow-overwrite --log-level=warning --minify --outfile=$file --platform=node $file');
	File.saveContent(file, '#!/usr/bin/env node\n${File.getContent(file)}');
	Sys.command('git update-index --chmod=+x $file');
	if (Sys.systemName() != "Windows") Sys.command('chmod +x $file');
}
