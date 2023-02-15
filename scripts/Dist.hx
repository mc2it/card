/** Runs the script. **/
function main() {
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');

	final file = "bin/mc2it_card.js";
	Sys.command('npx esbuild --allow-overwrite --log-level=warning --minify --outfile=$file --platform=node $file');
	Sys.command('git update-index --chmod=+x $file');
	if (Sys.systemName() != "Windows") Sys.command('chmod +x $file');
}
