/** Packages the project. **/
function main() {
	final file = "bin/mc2it_card.js";
	for (script in ["Clean", "Build", "Version"]) Sys.command('lix $script');
	Sys.command('npx esbuild --allow-overwrite --legal-comments=none --log-level=warning --minify --outfile=$file --platform=node $file');
	Sys.command('git update-index --chmod=+x $file');
}
