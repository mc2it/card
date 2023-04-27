//! --class-path src --define hxnodejs --library hxnodejs
import haxe.Timer;
import js.glob_watcher.GlobWatcher;

/** Watches for file changes. **/
function main() GlobWatcher.watch("src/mc2it_card/**/*.hx", {ignoreInitial: false}, done -> {
	final timestamp = Timer.stamp();
	Sys.command("lix Build --debug");
	Sys.command("node bin/mc2it_card.js");
	Sys.println('> ${Tools.formatDuration(Timer.stamp() - timestamp)}');
	done();
});
