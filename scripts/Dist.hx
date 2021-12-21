import Sys.*;
import sys.io.File.*;

/** Runs the script. **/
function main() {
	for (script in ["Clean", "Version"]) command('lix $script');
	command("haxe --dce full build.hxml");

	final file = "bin/card.js";
	command('npx terser --comments=false --config-file=etc/terser.json --output=$file $file');
	saveContent(file, '#!/usr/bin/env node\n${getContent(file)}');
	command('git update-index --chmod=+x $file');
	if (systemName() != "Windows") command('chmod +x $file');
}
